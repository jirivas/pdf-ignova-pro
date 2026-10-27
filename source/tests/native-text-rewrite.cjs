const assert=require('node:assert/strict');
const {PDFDocument,PDFName,StandardFonts}=require('pdf-lib');
const {removeOriginalText}=require('../native-text-rewrite.cjs');
(async()=>{
  const {PdfDocument}=await import('ts-pdf-edit');
  for(const show of ['(Texto original) Tj','[(Texto) -20 ( original)] TJ']){
    const doc=await PDFDocument.create(),page=doc.addPage([595,842]);
    const font=await doc.embedFont(StandardFonts.Helvetica);
    page.node.set(PDFName.of('Resources'),doc.context.obj({Font:{F1:font.ref}}));
    page.node.set(PDFName.of('Contents'),doc.context.register(doc.context.flateStream(`BT /F1 20 Tf 1 0 0 1 60 700 Tm ${show} 1 0 0 1 60 650 Tm (Conservar esta linea) Tj ET`)));
    const output=await removeOriginalText(await doc.save(),0,[{sourcePdfBaseline:{start:[60,700],end:[250,700]}}]);
    const result=await PdfDocument.open(output);
    const text=await result.getPage(0).text();
    assert.equal(text.plainText.includes('original'),false);
    assert.equal(text.runs.find(r=>r.text==='Conservar esta linea').rect.y,650);
    await result.close();
    console.log(`PASS native removal ${show.includes('TJ')?'TJ array':'Tj string'}, adjacent text position preserved`);
  }
})().catch(e=>{console.error(e);process.exitCode=1;});
