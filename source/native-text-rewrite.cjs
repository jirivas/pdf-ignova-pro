// Rewrite the existing text-showing operators, retaining their graphics state.
// No rectangles, annotations or separately positioned text objects are added.
const path=require('node:path');
const {pathToFileURL}=require('node:url');
async function rewriteNativeText(bytes,pageIndex,edit,fontBytes){
  const base=path.join(__dirname,'node_modules/ts-pdf-edit/dist');
  const load=name=>import(pathToFileURL(path.join(base,name)).href);
  const [{PdfDocument},{scan},{spliceLogical,hexString},{PDFName},{decodeStream}]=await Promise.all([
    load('index.js'),load('content/scanner.js'),load('content/splicer.js'),load('cos/adapters.js'),load('cos/streams.js'),
  ]);
  const doc=await PdfDocument.open(new Uint8Array(bytes));
  try{
    const editor=doc.getPage(pageIndex).editor(),{runs,logical}=editor.interpret();
    const ops=scan(logical.bytes),groups=new Map();
    const {start,end}=edit.sourcePdfBaseline||{};
    if(!start||!end)throw Error('No se han encontrado las coordenadas nativas del texto.');
    const dx=end[0]-start[0],dy=end[1]-start[1],length=Math.hypot(dx,dy);
    for(const run of runs){
      const selected=new Set();let offset=0;
      run.glyphs.forEach((glyph,index)=>{
        const p=run.trm.apply({x:(offset+glyph.advanceText/2)/(run.fontSize*run.hScale),y:0});
        const along=((p.x-start[0])*dx+(p.y-start[1])*dy)/Math.max(length,0.001);
        const across=Math.abs((p.x-start[0])*dy-(p.y-start[1])*dx)/Math.max(length,0.001);
        if(along>=-0.1&&along<=length+0.1&&across<Math.max(0.35,run.fontSize*0.12))selected.add(index);
        offset+=glyph.advanceText;
      });
      if(!selected.size)continue;
      const op=ops.find(o=>o.index===run.opIndex),tokens=[];
      const collect=o=>{if(o.t==='str')tokens.push(o);if(o.t==='arr')o.items.forEach(collect);};
      op?.operands.forEach(collect);
      if(!op||!['Tj','TJ',"'",'"'].includes(op.op)||!tokens.some(s=>s.start===run.stringStart&&s.end===run.stringEnd))
        throw Error('Este texto está dentro de una estructura PDF que todavía no permite edición nativa segura.');
      if(run.isType3||run.renderMode===3)throw Error('Este fragmento no es texto visible editable con una fuente normal.');
      if(!groups.has(op.index))groups.set(op.index,{op,runs:[]});
      groups.get(op.index).runs.push({...run,selected});
    }
    if(!groups.size)throw Error('No se ha localizado el texto nativo seleccionado.');
    let inserted=false,substitute=null;
    const encodeWithOriginalMap=(run,font,text)=>{
      const dictionary=editor.resolver.subDict('Font',run.fontName);
      const cmap=dictionary?.lookup(PDFName.of('ToUnicode'));
      if(cmap?.dict){
        const source=new TextDecoder('latin1').decode(decodeStream(cmap)),map=new Map();
        const unicode=hex=>{let s='';for(let i=0;i<hex.length;i+=4)s+=String.fromCharCode(parseInt(hex.slice(i,i+4),16));return s;};
        const add=(code,dest)=>map.set(unicode(dest),Uint8Array.from(code.match(/../g).map(h=>parseInt(h,16))));
        for(const block of source.matchAll(/beginbfchar([\s\S]*?)endbfchar/g))
          for(const m of block[1].matchAll(/<([\da-f]+)>\s*<([\da-f]+)>/gi))add(m[1],m[2]);
        for(const block of source.matchAll(/beginbfrange([\s\S]*?)endbfrange/g)){
          for(const m of block[1].matchAll(/<([\da-f]+)>\s*<([\da-f]+)>\s*(<([\da-f]+)>|\[([^\]]*)\])/gi)){
            const first=parseInt(m[1],16),last=parseInt(m[2],16),destinations=m[5]?.match(/<([\da-f]+)>/gi);
            for(let code=first;code<=last&&code-first<65536;code++){
              const dest=destinations?destinations[code-first]?.slice(1,-1):(parseInt(m[4],16)+code-first).toString(16).padStart(m[4].length,'0');
              if(dest)add(code.toString(16).padStart(m[1].length,'0'),dest);
            }
          }
        }
        const bytes=[],keys=[...map.keys()].sort((a,b)=>b.length-a.length);
        for(let i=0;i<text.length;){const key=keys.find(k=>text.startsWith(k,i));if(!key)return null;bytes.push(...map.get(key));i+=key.length;}
        return {bytes:Uint8Array.from(bytes),missing:[]};
      }
      return font.encode(text);
    };
    const changes=[];
    for(const {op,runs:chosen} of groups.values()){
      const segments=[];
      const values=op.op==='TJ'?op.operands.find(o=>o.t==='arr').items:op.operands.filter(o=>o.t==='str');
      for(const value of values){
        if(value.t==='num'){segments.push(`[ ${value.v} ] TJ`);continue;}
        if(value.t!=='str')continue;
        const run=chosen.find(r=>r.stringStart===value.start&&r.stringEnd===value.end);
        if(!run){segments.push(`${hexString(value.bytes)} Tj`);continue;}
        const font=editor.resolver.font(run.fontName),bpg=run.composite?2:1;
        let i=0;
        while(i<run.glyphs.length){
          const removed=run.selected.has(i),first=i;let oldAdvance=0;
          while(i<run.glyphs.length&&run.selected.has(i)===removed){oldAdvance+=run.glyphs[i].advanceText;i++;}
          if(!removed){segments.push(`${hexString(value.bytes.subarray(first*bpg,i*bpg))} Tj`);continue;}
          let newAdvance=0;
          if(!inserted){
            const text=String(edit.text||'');
            if(/[\r\n]/.test(text))throw Error('Modifica una línea cada vez. Para crear párrafos utiliza Crear texto.');
            const encoded=encodeWithOriginalMap(run,font,text);
            if(encoded&&!encoded.missing.length){
              segments.push(`${hexString(encoded.bytes)} Tj`);
              const sourceGlyphs=font.decode(value.bytes);
              const ordinary=sourceGlyphs.findIndex(g=>!g.isSingleByteSpace);
              const charSpacing=ordinary<0?0:run.glyphs[ordinary].advanceText/run.hScale-sourceGlyphs[ordinary].width1000/1000*run.fontSize;
              const space=sourceGlyphs.findIndex(g=>g.isSingleByteSpace);
              const wordSpacing=space<0?0:run.glyphs[space].advanceText/run.hScale-sourceGlyphs[space].width1000/1000*run.fontSize-charSpacing;
              newAdvance=font.decode(encoded.bytes).reduce((sum,g)=>sum+(g.width1000/1000*run.fontSize+charSpacing+(g.isSingleByteSpace?wordSpacing:0))*run.hScale,0);
            }else{
              if(!fontBytes)throw Error(`La fuente original no contiene estos caracteres y no está instalada: ${edit.font||'fuente del PDF'}`);
              if(!substitute){
                const fontkit=(await import('@pdf-lib/fontkit')).default;
                doc._inner.registerFontkit(fontkit);
                const embedded=await doc._inner.embedFont(new Uint8Array(fontBytes),{subset:true});
                const name=doc._inner.getPage(pageIndex).node.newFontDictionary('IgnovaNative',embedded.ref);
                substitute={embedded,name:name.toString()};
              }
              segments.push(`${substitute.name} ${run.fontSize} Tf ${substitute.embedded.encodeText(text).toString()} Tj /${run.fontName} ${run.fontSize} Tf`);
              newAdvance=substitute.embedded.widthOfTextAtSize(text,run.fontSize)*run.hScale;
            }
            if (Number.isFinite(edit.maxWidthPdf) && edit.maxWidthPdf > 0) {
              const before=run.trm.apply({x:0,y:0});
              const after=run.trm.apply({x:newAdvance/(run.fontSize*run.hScale),y:0});
              const advancePdf=Math.hypot(after.x-before.x,after.y-before.y);
              if (advancePdf > edit.maxWidthPdf + 0.25)
                throw Error('El texto supera el margen de esta línea. Acórtalo para continuar.');
            }
            inserted=true;
          }
          segments.push(`[ ${(-1000*(oldAdvance-newAdvance)/(run.fontSize*run.hScale)).toFixed(5)} ] TJ`);
        }
      }
      if(op.op==="'")segments.unshift('T*');
      if(op.op==='"'){const nums=op.operands.filter(o=>o.t==='num');segments.unshift(`${nums[0].v} Tw ${nums[1].v} Tc T*`);}
      changes.push({start:op.start,end:op.end,text:segments.join('\n')});
    }
    for(const change of changes.sort((a,b)=>b.start-a.start)){
      spliceLogical(logical,change.start,change.end,new TextEncoder().encode(change.text));
      editor.runs=null;editor.logical=null;Object.assign(logical,editor.interpret().logical);
    }
    doc.onContentChanged();
    // The application keeps the remaining pages in their original sources.
    // Return only this page so each text edit does not clone a whole large PDF.
    const editedPage=await doc.extractRange(pageIndex,pageIndex);
    try{return(await editedPage.save()).bytes;}finally{await editedPage.close();}
  }finally{await doc.close();}
}
module.exports={rewriteNativeText};
