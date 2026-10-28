// Browser regression against the real native rewrite service and PDF.js canvas.
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const root=path.resolve(__dirname,'..');
(async()=>{
  const {chromium}=await import(process.env.IGNOVA_PLAYWRIGHT||'playwright');
  const binary=process.env.IGNOVA_CHROMIUM?(await import(process.env.IGNOVA_CHROMIUM)).default:{executablePath:async()=>undefined,args:[]};
  const server=http.createServer(async(req,res)=>{
    if(req.url==='/rewrite'){
      try{
        const parts=[];for await(const part of req)parts.push(part);
        const body=JSON.parse(Buffer.concat(parts));
        const {rewriteNativeText}=require('../native-text-rewrite.cjs');
        const bytes=await rewriteNativeText(body.bytes,body.pageIndex,body.edit);
        res.setHeader('Content-Type','application/json');res.end(JSON.stringify(Array.from(bytes)));
      }catch(e){console.error(e);res.writeHead(500).end(JSON.stringify({error:e.message}));}
      return;
    }
    const file=path.join(root,decodeURIComponent(req.url.split('?')[0]));
    if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
    try{res.setHeader('Content-Type',/\.m?js$/.test(file)?'text/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
  });
  const browser=await chromium.launch({executablePath:process.env.IGNOVA_BROWSER_PATH||await binary.executablePath(),args:binary.args,headless:true});
  await new Promise(resolve=>server.listen(37069,'127.0.0.1',resolve));
  try{
    const page=await browser.newPage({viewport:{width:1400,height:1000},locale:'es-ES'}),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{if(m.type()==='error')console.log('BROWSER',m.text());});
    await page.addInitScript(()=>{
      window.nativeBytes=null;
      window.failRewrite=false;window.rewriteCount=0;window.visibleClears=0;
      window.pdfEstudio={
        convertDocumentFiles:async files=>files,
        rewriteNativeText:async(bytes,pageIndex,edit)=>{
          if(window.failRewrite){window.failRewrite=false;throw Error('Prueba de error recuperable');}
          const response=await fetch('/rewrite',{method:'POST',body:JSON.stringify({bytes:Array.from(bytes),pageIndex,edit})});
          const result=await response.json();if(!response.ok)throw Error(result.error);
          window.nativeBytes=result;window.rewriteCount++;return result;
        },
        savePdfAs:async(bytes,name)=>{window.savedPdf=Array.from(new Uint8Array(bytes));return{ok:true,fileName:name};},
      };
    });
    await page.goto('http://127.0.0.1:37069/app/editor.html');
    const bytes=await page.evaluate(async()=>{
      const {PDFDocument,StandardFonts,rgb}=await import('./editor-assets/chunks/es-4HSNR7QU.js');
      const doc=await PDFDocument.create(),p=doc.addPage([595,842]),font=await doc.embedFont(StandardFonts.HelveticaBold);
      // A coloured background and a line below the edited text expose every cover.
      p.drawRectangle({x:0,y:0,width:595,height:842,color:rgb(.9,.95,1)});
      p.drawLine({start:{x:40,y:627},end:{x:550,y:627},color:rgb(.7,.1,.1),thickness:1});
      ['INDICE','5.1. Existente y arqueta nueva','5.2. Conexion a la red existente'].forEach((text,i)=>p.drawText(text,{x:60,y:720-i*45,size:20,font,color:rgb(.05,.2,.4)}));
      p.drawText('FIN',{x:500,y:540,size:20,font});
      doc.addPage([595,842]).drawText('Segunda pagina intacta',{x:60,y:700,size:20,font});
      return Array.from(await doc.save());
    });
    await page.locator('input[type=file]').first().setInputFiles({name:'native.pdf',mimeType:'application/pdf',buffer:Buffer.from(bytes)});
    const select=page.locator('.toolbar button').filter({hasText:/^Seleccionar$/}),modify=page.locator('.toolbar button').filter({hasText:/^Modificar texto$/});
    await select.click();await page.locator('.pdf-text-hit').first().waitFor();
    const cover=page.locator('.toolbar button').filter({hasText:/^Tapado$/});
    await cover.click();await page.locator('.toolbar-redact-color input').fill('#ffffff');
    await select.click();
    const source=page.locator('.pdf-text-hit').filter({hasText:'5.1. Existente'});
    await source.click();assert.equal(await page.locator('.mark.text').count(),0);
    await modify.click();await source.click();
    const input=page.locator('[data-native-editor="true"]');
    await input.waitFor();await page.waitForFunction(()=>document.activeElement?.dataset.nativeEditor==='true');
    // Drag below the active line: the browser must never select another text run.
    const box=await input.boundingBox();
    await page.mouse.move(box.x+10,box.y+box.height/2);await page.mouse.down();
    await page.mouse.move(box.x+100,box.y+box.height*4,{steps:12});await page.mouse.up();
    assert.equal(await input.evaluate(e=>{
      const s=window.getSelection();return e.contains(s.anchorNode)&&e.contains(s.focusNode);
    }),true,'editing selection must remain inside the active line');
    await input.press('ControlOrMeta+A');
    await input.pressSequentially('5.1. Existente y arqueta nueva');
    await input.press('End');
    const originalDraft=await input.innerText();
    // Enter, multiline paste, and overflow are harmless and keep the editor active.
    await input.press('Enter');await input.press('Shift+ArrowDown');
    await input.evaluate(e=>{
      const data=new DataTransfer();data.setData('text/plain','Primera\nSegunda');
      e.dispatchEvent(new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:data}));
    });
    assert.equal(await input.innerText(),originalDraft);
    await input.press('ControlOrMeta+A');
    await input.evaluate(e=>{
      const data=new DataTransfer();data.setData('text/plain','DESBORDE '.repeat(200));
      e.dispatchEvent(new ClipboardEvent('paste',{bubbles:true,cancelable:true,clipboardData:data}));
    });
    assert.equal(await input.innerText(),originalDraft,'oversized paste must not overflow or erase the valid line');
    await input.press('End');
    // Observe the real visible canvas during redraw, rather than implementation strings.
    await page.evaluate(()=>{
      const original=CanvasRenderingContext2D.prototype.clearRect;
      CanvasRenderingContext2D.prototype.clearRect=function(...args){
        if(this.canvas.closest?.('.pagestage'))window.visibleClears++;
        return original.apply(this,args);
      };
      window.stageScroll={top:document.querySelector('.stage').scrollTop,left:document.querySelector('.stage').scrollLeft};
    });
    assert.equal(await page.locator('.mark.text,.pdf-original-cover,.pdf-text-replacement').count(),0,'native editing must not create ANY text mark or cover');
    await input.press('Home');await input.press('ArrowRight');await input.press('Delete');await input.pressSequentially('X');
    await input.press('End');await input.press('Backspace');await input.pressSequentially(' CORREGIDA');
    const draft=await input.innerText();
    await page.waitForFunction(()=>window.nativeBytes?.length>0);
    // Save while caret is still active: it must flush the latest letters.
    await input.press('ControlOrMeta+s');await page.waitForFunction(()=>window.savedPdf?.length>0);
    const inspect=async(saved)=>page.evaluate(async bytes=>{
      const lib=await import('./editor-assets/chunks/pdf-V76QT5PL.js');
      const doc=await lib.getDocument({data:new Uint8Array(bytes)}).promise,p=await doc.getPage(1);
      const text=(await p.getTextContent()).items.filter(i=>i.str).map(i=>({text:i.str,x:i.transform[4],y:i.transform[5]}));
      const canvas=document.createElement('canvas');canvas.width=595;canvas.height=842;
      await p.render({canvasContext:canvas.getContext('2d'),viewport:p.getViewport({scale:1})}).promise;
      return{text,pageCount:doc.numPages,pixels:Array.from(canvas.getContext('2d').getImageData(250,205,50,15).data)};
    },saved);
    const saved=await page.evaluate(()=>window.savedPdf),result=await inspect(saved),original=await inspect(bytes);
    assert.equal(await page.evaluate(()=>window.visibleClears),0,'visible page must not be cleared during native redraw');
    assert.deepEqual(await page.evaluate(()=>({top:document.querySelector('.stage').scrollTop,left:document.querySelector('.stage').scrollLeft})),await page.evaluate(()=>window.stageScroll),'typing must not move the viewport');
    assert.deepEqual(result.pixels,original.pixels,'the coloured background and red line below must be pixel-identical: no cover');
    assert.equal(result.text.some(i=>i.text==='5.1. Existente y arqueta nueva'),false);
    assert.equal(result.text.find(i=>i.text==='5.2. Conexion a la red existente').y,630);
    assert.equal(result.pageCount,2);
    assert.equal(await page.locator('.mark.text,.pdf-original-cover').count(),0);
    // A service error must restore the accepted text and allow selecting/editing again.
    await page.locator('.pdf-text-hit').filter({hasText:'CORREGIDA'}).click();
    await input.waitFor();const accepted=await input.innerText();
    await page.evaluate(()=>{window.failRewrite=true;});
    await input.press('End');await input.pressSequentially(' X');
    await page.waitForFunction(text=>document.querySelector('[data-native-editor="true"]')?.textContent===text,accepted);
    await select.click();await modify.click();
    await page.locator('.pdf-text-hit').filter({hasText:/^FIN$/}).click();
    await input.waitFor();await input.press('ControlOrMeta+A');
    await input.pressSequentially('W'.repeat(50));
    assert.ok((await input.innerText()).length<50,'typing stops at the right margin');
    await page.evaluate(()=>{window.savedPdf=null;});
    await input.press('ControlOrMeta+s');await page.waitForFunction(()=>window.savedPdf?.length>0);
    const boundary=await page.evaluate(async()=>{
      const lib=await import('./editor-assets/chunks/pdf-V76QT5PL.js');
      const doc=await lib.getDocument({data:new Uint8Array(window.savedPdf)}).promise;
      const p=await doc.getPage(1);
      return (await p.getTextContent()).items.find(i=>i.str&&Math.abs(i.transform[4]-500)<0.1);
    });
    assert.ok(boundary&&boundary.transform[4]+boundary.width<=565.5,'saved PDF respects the content margin');
    await page.setViewportSize({width:1000,height:900});
    await select.click();await modify.click();
    await page.locator('.pdf-text-hit').filter({hasText:'CORREGIDA'}).click();
    await input.waitFor();await input.press('ControlOrMeta+A');await input.press('Backspace');
    await input.pressSequentially('Texto nativo final');
    await select.click();await page.evaluate(()=>{window.savedPdf=null;});await page.keyboard.press('ControlOrMeta+s');await page.waitForFunction(()=>window.savedPdf?.length>0);
    const final=await page.evaluate(()=>window.savedPdf);
    await page.locator('input[type=file]').first().setInputFiles({name:'reopened.pdf',mimeType:'application/pdf',buffer:Buffer.from(final)});
    await modify.click();await page.locator('.pdf-text-hit').filter({hasText:'Texto nativo final'}).click();await input.waitFor();
    assert.equal(await input.innerText(),'Texto nativo final');
    await select.click();
    const number=page.locator('.status input[type=number]');
    await number.fill('2');await number.press('Enter');
    await modify.click();await page.locator('.pdf-text-hit').filter({hasText:'Segunda pagina intacta'}).click();await input.waitFor();
    await input.press('End');await input.pressSequentially(' editada');
    await page.evaluate(()=>{window.savedPdf=null;});
    await input.press('ControlOrMeta+s');
    await page.waitForFunction(()=>window.savedPdf?.length>0);
    const both=await page.evaluate(async()=>{
      const lib=await import('./editor-assets/chunks/pdf-V76QT5PL.js'),doc=await lib.getDocument({data:new Uint8Array(window.savedPdf)}).promise;
      return Promise.all([1,2].map(async n=>(await(await doc.getPage(n)).getTextContent()).items.filter(i=>i.str).map(i=>i.str).join(' ')));
    });
    assert.ok(both[0].includes('Texto nativo final'));
    assert.ok(both[1].includes('Segunda pagina intacta editada'));
    assert.equal(await page.locator('.mark.text,.pdf-original-cover,.pdf-text-replacement').count(),0);
    assert.deepEqual(errors,[]);
    await page.screenshot({path:path.join(root,'text-edit-regression.png'),fullPage:true});
    console.log(JSON.stringify({result:'PASS',draft,text:result.text,checks:['delete and backspace individual letters','type with native font and colour','no text boxes or cover DOM nodes','no cover in saved PDF pixels','adjacent line position unchanged','save while typing','small viewport','empty and rewrite','reopen and edit native text']},null,2));
  }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
