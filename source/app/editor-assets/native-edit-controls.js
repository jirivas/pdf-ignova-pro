(function expose(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PDF_IGNOVA_NATIVE_EDITOR = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  // A PDF text run is one editable line, never a document-wide contenteditable.
  function attach(element, item, onInput, onLimit) {
    const doc = element.ownerDocument, win = doc.defaultView;
    const listeners = [], maximum = Math.max(item.width, item.editWidth || item.width);
    let accepted = element.textContent || "", pointer = null, composing = false;
    let selection = { start: accepted.length, end: accepted.length }, lastNotice = 0;
    const canvas = doc.createElement("canvas"), context = canvas.getContext("2d");
    const style = win.getComputedStyle(element);
    context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const originalWidth = context.measureText(item.text || "").width;
    const metricScale = originalWidth > 0 ? item.width / originalWidth : 1;
    const fits = text => context.measureText(text).width * metricScale <= maximum + 0.25;
    const notice = () => {
      if (Date.now() - lastNotice < 1600) return;
      lastNotice = Date.now();
      onLimit?.("La edición está limitada a esta línea y a su margen derecho");
    };
    const listen = (target, type, handler, options) => {
      target.addEventListener(type, handler, options);
      listeners.push(() => target.removeEventListener(type, handler, options));
    };
    const setSelection = (start, end = start) => {
      if (!element.firstChild) element.append(doc.createTextNode(""));
      const text = element.textContent || "";
      start = Math.max(0, Math.min(start, text.length));
      end = Math.max(0, Math.min(end, text.length));
      const s = win.getSelection();
      s.setBaseAndExtent(element.firstChild, start, element.firstChild, end);
      selection = { start: Math.min(start, end), end: Math.max(start, end) };
    };
    const offset = (node, position) => {
      const range = doc.createRange();
      range.selectNodeContents(element);range.setEnd(node, position);
      return range.toString().length;
    };
    const readSelection = () => {
      const s = win.getSelection();
      if (!s?.rangeCount || !element.contains(s.anchorNode) || !element.contains(s.focusNode)) return null;
      const start = offset(s.anchorNode, s.anchorOffset), end = offset(s.focusNode, s.focusOffset);
      return { start: Math.min(start, end), end: Math.max(start, end) };
    };
    const clampSelection = () => {
      if (doc.activeElement !== element) return;
      const s = win.getSelection();
      if (!s?.rangeCount) return;
      const inside = readSelection();
      if (inside) { selection = inside;return; }
      if (element.contains(s.anchorNode)) {
        const start = offset(s.anchorNode, s.anchorOffset);
        const before = !!(element.compareDocumentPosition(s.focusNode) & 2);
        setSelection(start, before ? 0 : (element.textContent || "").length);
      } else setSelection(selection.start, selection.end);
    };
    const candidate = text => {
      clampSelection();
      const selected = readSelection() || selection;
      const current = element.textContent || "";
      return current.slice(0, selected.start) + text + current.slice(selected.end);
    };
    const allowed = text => !/[\r\n\u2028\u2029]/.test(text) && fits(text);
    const insert = text => {
      if (!allowed(candidate(text))) { notice();return; }
      doc.execCommand("insertText", false, text);
    };
    const pointOffset = event => {
      // Work in the line's local coordinates, also for rotated text.
      const rect = element.getBoundingClientRect(), angle = item.angle || 0;
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const originX = rect.left - Math.min(0, maximum*cos) - Math.min(0, -element.offsetHeight*sin);
      const originY = rect.top - Math.min(0, maximum*sin) - Math.min(0, element.offsetHeight*cos);
      const along = (event.clientX-originX)*cos + (event.clientY-originY)*sin;
      const text = element.textContent || "";
      let best = 0, distance = Infinity;
      // Keep grapheme boundaries (surrogate pairs/combined accents) intact.
      const segments = typeof Intl.Segmenter === "function"
        ? [...new Intl.Segmenter(undefined, {granularity:"grapheme"}).segment(text)].map(s=>s.index).concat(text.length)
        : Array.from(text).reduce((a,c)=>a.concat(a[a.length-1]+c.length),[0]);
      for (const index of segments) {
        const x = context.measureText(text.slice(0,index)).width * metricScale;
        if (Math.abs(x-along)<distance) {best=index;distance=Math.abs(x-along);}
      }
      return best;
    };
    listen(doc, "selectionchange", clampSelection);
    listen(element, "beforeinput", event => {
      clampSelection();
      if (/^(insertParagraph|insertLineBreak|insertFromDrop)$/.test(event.inputType)) {
        event.preventDefault();notice();return;
      }
      if (!composing && event.inputType.startsWith("insert") && event.data != null && !allowed(candidate(event.data))) {
        event.preventDefault();notice();
      }
    });
    listen(element, "input", () => {
      if (composing) return;
      const text = element.textContent || "";
      if (!allowed(text)) {
        element.textContent = accepted;setSelection(selection.start, selection.end);notice();return;
      }
      accepted = text;selection = readSelection() || selection;onInput?.(text);
    });
    listen(element, "compositionstart", () => {composing=true;});
    listen(element, "compositionend", () => {composing=false;element.dispatchEvent(new win.Event("input",{bubbles:true}));});
    listen(element, "paste", event => {event.preventDefault();insert(event.clipboardData.getData("text/plain"));});
    listen(element, "drop", event => {event.preventDefault();notice();});
    listen(element, "keydown", event => {
      clampSelection();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a") {
        event.preventDefault();event.stopPropagation();setSelection(0,(element.textContent || "").length);
      } else if (["Enter","ArrowUp","ArrowDown","PageUp","PageDown"].includes(event.key)) {
        event.preventDefault();event.stopPropagation();
        if (event.key === "Enter") notice();
      }
    });
    listen(element, "pointerdown", event => {
      if (event.button !== 0) return;
      event.preventDefault();event.stopPropagation();
      element.focus({preventScroll:true});
      const start = pointOffset(event);
      pointer = {id:event.pointerId,start};setSelection(start);
      element.setPointerCapture(event.pointerId);
    });
    listen(element, "pointermove", event => {
      if (pointer?.id !== event.pointerId) return;
      event.preventDefault();event.stopPropagation();setSelection(pointer.start,pointOffset(event));
    });
    const release = event => {
      if (pointer?.id !== event.pointerId) return;
      event.preventDefault();event.stopPropagation();
      if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
      pointer=null;
    };
    listen(element,"pointerup",release);listen(element,"pointercancel",release);
    // Backend failures restore the last successfully rendered text, without
    // leaving an invalid draft that blocks tool changes and subsequent saves.
    listen(element,"ignova-native-restore",event=>{
      accepted=String(event.detail || "");element.textContent=accepted;
      setSelection(Math.min(selection.start,accepted.length));
    });
    return () => { for (const remove of listeners) remove(); };
  }
  return Object.freeze({attach});
});
