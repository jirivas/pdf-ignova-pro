// Functional regression: real PDF.js canvas, browser input and PDF export.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
function fixture() {
  const stream = 'BT /F1 20 Tf 60 720 Td (3.- Costes directos) Tj 0 -45 Td (4.- Costes indirectos) Tj 0 -45 Td (5.- Porcentaje de costes indirectos) Tj ET';
  const objects = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`];
  let pdf = '%PDF-1.4\n', offsets = [0];
  objects.forEach((object, i) => { offsets.push(Buffer.byteLength(pdf)); pdf += `${i+1} 0 obj\n${object}\nendobj\n`; });
  const offset = Buffer.byteLength(pdf);
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(n => `${String(n).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${offset}\n%%EOF`;
  return Buffer.from(pdf);
}
(async () => {
  const { chromium } = await import(process.env.IGNOVA_PLAYWRIGHT || 'playwright');
  const binary = process.env.IGNOVA_CHROMIUM
    ? (await import(process.env.IGNOVA_CHROMIUM)).default
    : {executablePath:async()=>undefined,args:[]};
  const server = http.createServer(async(req,res) => {
    if(req.url==='/rewrite'){
      try {
        const chunks=[];for await(const chunk of req)chunks.push(chunk);
        const body=JSON.parse(Buffer.concat(chunks).toString());
        const {removeOriginalText}=require('../native-text-rewrite.cjs');
        const bytes=await removeOriginalText(body.bytes,body.pageIndex,body.edits);
        res.setHeader('Content-Type','application/json');res.end(JSON.stringify(Array.from(bytes)));
      }catch(e){console.error(e);res.writeHead(500).end(JSON.stringify({error:e.message}));}
      return;
    }
    const file = path.join(root, decodeURIComponent(req.url.split('?')[0]));
    if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { res.setHeader('Content-Type', file.endsWith('.js') || file.endsWith('.mjs') ? 'text/javascript' : file.endsWith('.css') ? 'text/css' : 'text/html'); res.end(fs.readFileSync(file)); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(r => server.listen(37069,'127.0.0.1',r));
  const browser = await chromium.launch({executablePath:await binary.executablePath(),args:binary.args,headless:true});
  try {
    const page = await browser.newPage({viewport:{width:1600,height:1000},locale:'es-ES'});
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error'||m.type()==='warning') console.log('BROWSER',m.text());});
    await page.addInitScript(() => { window.pdfEstudio = {
      removeOriginalText:async(bytes,pageIndex,edits)=>{
        const response=await fetch('/rewrite',{method:'POST',body:JSON.stringify({bytes:Array.from(new Uint8Array(bytes)),pageIndex,edits})});
        const result=await response.json();if(!response.ok)throw new Error(result.error);return result;
      },
      convertDocumentFiles:async files=>files,savePdfAs:async(bytes,name)=>{ window.savedPdf=Array.from(new Uint8Array(bytes)); return {ok:true,fileName:name}; }}; });
    await page.goto('http://127.0.0.1:37069/app/editor.html');
    console.log('Application loaded');
    const fixtureBytes=await page.evaluate(async()=>{
      const {PDFDocument,StandardFonts}=await import('./editor-assets/chunks/es-4HSNR7QU.js');
      const doc=await PDFDocument.create(); const p=doc.addPage([595,842]);
      const font=await doc.embedFont(StandardFonts.Helvetica);
      ['3.- Costes directos','4.- Costes indirectos','5.- Porcentaje de costes indirectos'].forEach((text,i)=>p.drawText(text,{x:60,y:720-i*45,size:20,font}));
      return Array.from(await doc.save());
    });
    await page.locator('input[type=file]').first().setInputFiles({name:'regression.pdf',mimeType:'application/pdf',buffer:Buffer.from(fixtureBytes)});
    const select=page.locator('.toolbar button').filter({hasText:/^Seleccionar$/});
    const modify=page.locator('.toolbar button').filter({hasText:/^Modificar texto$/});
    await select.click();
    console.log('PDF opened and selection enabled');
    await page.locator('.pdf-text-hit').first().waitFor();
    const line=page.locator('.pdf-text-hit').filter({hasText:'5.- Porcentaje'});
    await line.click();
    console.log('Native text selected');
    assert.equal(await page.locator('.pdf-text-edit').count(),0,'selection must not create a replacement');
    await modify.click();
    await line.click();
    const editor=page.locator('.pdf-text-edit.chosen .text-editor');
    await editor.waitFor();
    await page.waitForFunction(()=>document.activeElement?.matches('.pdf-text-replacement'));
    console.log('Inline editor focused');
    assert.equal(await editor.getAttribute('contenteditable'),'true');
    await editor.press('End');
    await editor.press('Backspace');
    await editor.pressSequentially('S EDITADOS');
    const edited=await editor.innerText();
    assert.equal(edited,'5.- Porcentaje de costes indirectoS EDITADOS');
    await select.click();
    assert.equal(await page.locator('.pdf-text-edit').count(),1);
    await page.locator('.pdf-text-hit').filter({hasText:edited}).click();
    await page.waitForFunction(()=>document.querySelector('.pdf-text-hit.pdf-text-selected')?.textContent.includes('EDITADOS'));
    await modify.click();
    await page.locator('.pdf-text-edit').click();
    await editor.press('ControlOrMeta+A');
    await editor.pressSequentially('Texto corregido');
    await select.click();
    assert.equal(await page.locator('.pdf-text-edit .text-editor').innerText(),'Texto corregido');
    // An untouched second line must disappear as an overlay on deselection.
    await modify.click();
    await page.locator('.pdf-text-hit').filter({hasText:'4.- Costes'}).click();
    await select.click();
    assert.equal(await page.locator('.pdf-text-pristine').evaluate(e=>getComputedStyle(e).visibility),'hidden');
    // Editing must work when the properties panel is hidden by responsive CSS.
    await page.setViewportSize({width:1000,height:900});
    await modify.click();
    await page.locator('.pdf-text-edit').first().click();
    await page.waitForFunction(()=>document.activeElement?.matches('.pdf-text-replacement'));
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.type('Final sin duplicados');
    await select.click();
    await page.keyboard.press('ControlOrMeta+s');
    await page.waitForFunction(()=>window.savedPdf?.length>0);
    const saved=await page.evaluate(async()=>{
      const lib=await import('./editor-assets/chunks/pdf-V76QT5PL.js');
      const doc=await lib.getDocument({data:new Uint8Array(window.savedPdf)}).promise;
      return (await (await doc.getPage(1)).getTextContent()).items.filter(i=>i.str).map(i=>i.str);
    });
    assert.equal(saved.filter(s=>s==='Final sin duplicados').length,1);
    assert.equal(saved.some(s=>s.includes('Porcentaje')),false,'original text must be removed from the PDF, not just covered');
    const cleanRightSide = await page.evaluate(async()=>{
      const lib=await import('./editor-assets/chunks/pdf-V76QT5PL.js');
      const doc=await lib.getDocument({data:new Uint8Array(window.savedPdf)}).promise;
      const p=await doc.getPage(1), canvas=document.createElement('canvas');
      canvas.width=595;canvas.height=842;
      await p.render({canvasContext:canvas.getContext('2d'),viewport:p.getViewport({scale:1})}).promise;
      const data=canvas.getContext('2d').getImageData(280,190,100,30).data;
      return Array.from(data).every((value,index)=>index%4===3 || value>245);
    });
    assert.equal(cleanRightSide,true,'old letters beyond the replacement must not remain visible in exported PDF');
    assert.equal(await page.locator('.pdf-text-edit').count(),2);
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({result:'PASS',edited,saved,checks:['selection does not edit','delete and type inline','repeated edit reuses one replacement','untouched overlay hidden','editing at 1000px','save exports latest text']},null,2));
    await page.screenshot({path:path.join(root,'text-edit-regression.png'),fullPage:true});
    const savedBytes=await page.evaluate(()=>window.savedPdf);
    await page.locator('input[type=file]').first().setInputFiles({name:'reopened.pdf',mimeType:'application/pdf',buffer:Buffer.from(savedBytes)});
    await modify.click();
    const reopened=page.locator('.pdf-text-hit').filter({hasText:'Final sin duplicados'});
    await reopened.click();
    await page.waitForFunction(()=>document.activeElement?.matches('.pdf-text-replacement'));
    assert.equal(await page.locator('.pdf-text-hit').filter({hasText:'Porcentaje'}).count(),0);
    await page.keyboard.press('ControlOrMeta+A');
    await page.keyboard.press('Backspace');
    await select.click();
    await page.evaluate(()=>{window.savedPdf=null;});
    await page.keyboard.press('ControlOrMeta+s');
    await page.waitForFunction(()=>window.savedPdf?.length>0);
    console.log('PASS reopen exported PDF, edit again, erase all letters and save');
  } finally { await browser.close(); server.close(); }
})().catch(e=>{console.error(e);process.exitCode=1;});
