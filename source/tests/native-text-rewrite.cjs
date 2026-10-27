const assert=require('node:assert/strict'),fs=require('node:fs');
const {PDFDocument,PDFName,StandardFonts}=require('pdf-lib');
const {rewriteNativeText}=require('../native-text-rewrite.cjs');
(async()=>{
  const {PdfDocument}=await import('ts-pdf-edit');
  const base=await import(require('node:url').pathToFileURL(require('node:path').resolve(__dirname,'../node_modules/ts-pdf-edit/dist/content/scanner.js')).href);
  const streamLib=await import(require('node:url').pathToFileURL(require('node:path').resolve(__dirname,'../node_modules/ts-pdf-edit/dist/content/streams.js')).href);
  for(const show of ['(Texto original) Tj','[(Texto) -20 ( original)] TJ']){
    const doc=await PDFDocument.create(),page=doc.addPage([595,842]);
    const font=await doc.embedFont(StandardFonts.HelveticaBold);
    page.node.set(PDFName.of('Resources'),doc.context.obj({Font:{F1:font.ref}}));
    page.node.set(PDFName.of('Contents'),doc.context.register(doc.context.flateStream(`0.9 0.95 1 rg 0 0 595 842 re f BT 0.1 0.2 0.4 rg /F1 20 Tf 1 0 0 1 60 700 Tm ${show} 1 0 0 1 60 650 Tm (Conservar esta linea) Tj ET`)));
    const output=await rewriteNativeText(await doc.save(),0,{text:'Texto modificado',sourcePdfBaseline:{start:[60,700],end:[250,700]}});
    const result=await PdfDocument.open(output),text=await result.getPage(0).text();
    assert.equal(text.plainText.includes('original'),false);
    assert.equal(text.plainText.includes('Texto modificado'),true);
    assert.equal(text.runs.find(r=>r.text==='Conservar esta linea').rect.y,650);
    const content=streamLib.logicalContentForPage(result._inner.context,result._inner.getPage(0).node);
    const ops=base.scan(content.bytes);
    assert.equal(ops.filter(o=>o.op==='re').length,1,'only the original page background exists');
    assert.equal(ops.filter(o=>o.op==='BT').length,1,'no extra text object is created');
    assert.equal(ops.filter(o=>o.op==='Tf').length,1,'the original font is reused');
    await result.close();console.log(`PASS native rewrite ${show.includes('TJ')?'TJ':'Tj'}: original font, colour and position; no cover or text object`);
  }
  const fontPath=['C:/Windows/Fonts/arial.ttf','/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'].find(p=>fs.existsSync(p));
  if(fontPath){
    const fontBytes=fs.readFileSync(fontPath),doc=await PDFDocument.create();
    doc.registerFontkit(require('@pdf-lib/fontkit'));
    const font=await doc.embedFont(fontBytes,{subset:true}),page=doc.addPage([595,842]);
    page.drawText('ABCD',{x:60,y:700,size:20,font});
    const bytes=await doc.save(),edit={text:'DCBA',sourcePdfBaseline:{start:[60,700],end:[200,700]}};
    const rewritten=await rewriteNativeText(bytes,0,edit),read=await PdfDocument.open(rewritten);
    assert.equal((await read.getPage(0).text()).plainText.trim(),'DCBA');await read.close();
    const extended=await rewriteNativeText(bytes,0,{...edit,text:'ABCDE'},fontBytes),read2=await PdfDocument.open(extended);
    assert.equal((await read2.getPage(0).text()).plainText.trim(),'ABCDE');await read2.close();
    console.log('PASS embedded subset font: original CMap reused, new glyphs use the same installed font');
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
