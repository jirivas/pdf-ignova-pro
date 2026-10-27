// Remove original glyph operands, keeping their text advance. No painted cover
// and no invisible copy of the old text is left in the saved content stream.
const path = require('node:path');
const { pathToFileURL } = require('node:url');
async function removeOriginalText(bytes, pageIndex, edits) {
  const base = path.join(__dirname,'node_modules/ts-pdf-edit/dist');
  const entry = path.join(base,'index.js');
  const [{ PdfDocument }, { scan }, { spliceLogical, hexString }] = await Promise.all([
    import(pathToFileURL(entry).href),
    import(pathToFileURL(path.join(base,'content/scanner.js')).href),
    import(pathToFileURL(path.join(base,'content/splicer.js')).href),
  ]);
  const doc = await PdfDocument.open(new Uint8Array(bytes));
  try {
    const editor = doc.getPage(pageIndex).editor();
    const { runs, logical } = editor.interpret();
    const ops = scan(logical.bytes), changes=[];
    const hits = edits.map(()=>0);
    for (const run of runs) {
      const selected = new Set();
      let advance=0;
      run.glyphs.forEach((glyph,index)=>{
        const center=run.trm.apply({x:(advance+glyph.advanceText/2)/(run.fontSize*run.hScale),y:0});
        edits.forEach((edit,k)=>{
          const { start, end } = edit.sourcePdfBaseline || {};
          if (!start || !end) throw new Error('Faltan las coordenadas del texto original. Vuelve a abrir el PDF.');
          const dx=end[0]-start[0],dy=end[1]-start[1],length=Math.hypot(dx,dy);
          const along=((center.x-start[0])*dx+(center.y-start[1])*dy)/Math.max(length,0.001);
          const across=Math.abs((center.x-start[0])*dy-(center.y-start[1])*dx)/Math.max(length,0.001);
          if (along>=-0.1 && along<=length+0.1 && across<Math.max(0.5,run.fontSize*0.2)) { selected.add(index);hits[k]++; }
        });
        advance+=glyph.advanceText;
      });
      if (!selected.size) continue;
      const op=ops.find(o=>o.index===run.opIndex);
      const strings=[];
      const collect=o=>{if(o.t==='str')strings.push(o);if(o.t==='arr')o.items.forEach(collect);};
      op?.operands.forEach(collect);
      const token=strings.find(s=>s.start===run.stringStart&&s.end===run.stringEnd);
      if (!token || !['Tj','TJ'].includes(op.op)) throw new Error('Este fragmento usa una estructura de texto que todavía no admite modificación segura.');
      const bpg=run.composite?2:1,parts=[];
      let index=0;
      while(index<run.glyphs.length){
        const removed=selected.has(index),start=index;
        let displacement=0;
        while(index<run.glyphs.length&&selected.has(index)===removed){displacement+=run.glyphs[index].advanceText;index++;}
        parts.push(removed?String(-1000*displacement/(run.fontSize*run.hScale)):hexString(token.bytes.subarray(start*bpg,index*bpg)));
      }
      changes.push({start:op.op==='Tj'?op.start:token.start,end:op.op==='Tj'?op.end:token.end,text:op.op==='Tj'?`[ ${parts.join(' ')} ] TJ`:parts.join(' ')});
    }
    if(hits.some(n=>n===0)) throw new Error('No se pudo localizar el texto original para sustituirlo con seguridad.');
    // Apply right-to-left so byte addresses remain valid within every stream.
    for(const change of changes.sort((a,b)=>b.start-a.start)) {
      spliceLogical(logical,change.start,change.end,new TextEncoder().encode(change.text));
      // Each splice needs the rebuilt logical bytes for subsequent replacements.
      editor.runs=null;editor.logical=null;
      Object.assign(logical,editor.interpret().logical);
    }
    doc.onContentChanged();
    return (await doc.save()).bytes;
  } finally {await doc.close();}
}
module.exports={removeOriginalText};
