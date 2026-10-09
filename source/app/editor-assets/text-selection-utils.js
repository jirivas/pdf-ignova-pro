(function exposeIgnovaTextSelection(root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.PDF_IGNOVA_TEXT_SELECTION = api;
})(typeof globalThis !== "undefined" ? globalThis : this, () => {
  "use strict";

  const PDF_TEXT_LAYER_SELECTOR = ".pdf-text-layer";
  const MIN_ZOOM = 20;
  const MAX_ZOOM = 500;
  const ZOOM_STEPS = Object.freeze([
    20, 50, 82, 100, 125, 150, 175, 200, 250, 300, 400, 500,
  ]);

  function normalizeSelectedText(value) {
    return String(value || "")
      .replace(/\u00ad/g, "")
      .replace(/\u00a0/g, " ")
      .replace(/\r\n?/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function nodeElement(node) {
    if (!node) return null;
    if (node.nodeType === 1) return node;
    return node.parentElement || node.parentNode || null;
  }

  function closestTextLayer(node) {
    let element = nodeElement(node);
    while (element) {
      if (typeof element.matches === "function" && element.matches(PDF_TEXT_LAYER_SELECTOR)) {
        return element;
      }
      element = element.parentElement || element.parentNode || null;
    }
    return null;
  }

  function readPdfSelection(documentRef) {
    const selection = documentRef?.getSelection?.();
    if (!selection || selection.isCollapsed || !selection.rangeCount) return "";

    const layer = closestTextLayer(selection.anchorNode);
    const focusElement = nodeElement(selection.focusNode);
    if (!layer || !focusElement || !layer.contains(focusElement)) return "";

    return normalizeSelectedText(selection.toString());
  }

  function clampZoom(value) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) return 100;
    return Math.max(MIN_ZOOM, Math.min(MAX_ZOOM, Math.round(numeric)));
  }

  function nextZoom(value, direction) {
    const current = clampZoom(value);
    if (direction > 0) {
      return ZOOM_STEPS.find((step) => step > current) || MAX_ZOOM;
    }
    if (direction < 0) {
      return [...ZOOM_STEPS].reverse().find((step) => step < current) || MIN_ZOOM;
    }
    return current;
  }

  function nextViewZoom(value, direction, fitPageZoom, fitWidthZoom) {
    const current = clampZoom(value);
    const pageZoom = clampZoom(fitPageZoom);
    const widthZoom = clampZoom(fitWidthZoom);
    const semanticMaximum = Math.max(pageZoom, widthZoom);
    const viewSteps = [...new Set([
      MIN_ZOOM,
      pageZoom,
      widthZoom,
      ...ZOOM_STEPS.filter((step) => step > semanticMaximum),
    ])].sort((left, right) => left - right);
    if (direction > 0) {
      return viewSteps.find((step) => step > current) || MAX_ZOOM;
    }
    if (direction < 0) {
      return [...viewSteps].reverse().find((step) => step < current) || MIN_ZOOM;
    }
    return current;
  }

  return Object.freeze({
    PDF_TEXT_LAYER_SELECTOR,
    MIN_ZOOM,
    MAX_ZOOM,
    ZOOM_STEPS,
    normalizeSelectedText,
    readPdfSelection,
    clampZoom,
    nextZoom,
    nextViewZoom,
  });
});
