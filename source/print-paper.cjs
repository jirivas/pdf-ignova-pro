"use strict";

const { PDFArray, PDFDict, PDFDocument, PDFName, PDFNumber } = require("pdf-lib");

const MILLIMETRES_TO_POINTS = 72 / 25.4;
const PAPER_SIZES_MM = Object.freeze({
  A4: Object.freeze([210, 297]),
  A3: Object.freeze([297, 420]),
  A2: Object.freeze([420, 594]),
  A1: Object.freeze([594, 841]),
});

function normalizePaperSize(value) {
  const normalized = String(value || "original").trim().toUpperCase();
  return Object.prototype.hasOwnProperty.call(PAPER_SIZES_MM, normalized)
    ? normalized
    : "original";
}

function paperSizePoints(value, landscape = false) {
  const paper = normalizePaperSize(value);
  if (paper === "original") return null;
  const [widthMm, heightMm] = PAPER_SIZES_MM[paper];
  const portrait = [
    widthMm * MILLIMETRES_TO_POINTS,
    heightMm * MILLIMETRES_TO_POINTS,
  ];
  return landscape ? [portrait[1], portrait[0]] : portrait;
}

function pdfBuffer(value) {
  if (Buffer.isBuffer(value)) return value;
  if (value instanceof ArrayBuffer) return Buffer.from(new Uint8Array(value));
  if (ArrayBuffer.isView(value)) {
    return Buffer.from(value.buffer, value.byteOffset, value.byteLength);
  }
  throw new TypeError("Invalid PDF data");
}

function copyMetadata(source, output) {
  const metadata = [
    ["getTitle", "setTitle"],
    ["getAuthor", "setAuthor"],
    ["getSubject", "setSubject"],
    ["getCreator", "setCreator"],
  ];
  for (const [getter, setter] of metadata) {
    try {
      const value = source[getter]?.();
      if (Array.isArray(value) ? value.length : value) output[setter]?.(value);
    } catch {
      // Malformed optional metadata must not prevent printing.
    }
  }
  try {
    const keywords = source.getKeywords?.();
    if (keywords) {
      output.setKeywords(
        keywords.split(/[;,]/).map((value) => value.trim()).filter(Boolean),
      );
    }
  } catch {
    // Keywords are optional.
  }
  output.setProducer("PDF Ignova Pro 1.9.3");
  output.setModificationDate(new Date());
}

function translateAnnotations(page, offsetX, offsetY) {
  const annotations = page.node?.Annots?.();
  if (!(annotations instanceof PDFArray)) return;
  for (const annotationReference of annotations.asArray()) {
    let annotation;
    try {
      annotation = page.doc.context.lookup(annotationReference, PDFDict);
    } catch {
      continue;
    }
    const rectangle = annotation.lookup(PDFName.of("Rect"), PDFArray);
    if (!(rectangle instanceof PDFArray) || rectangle.size() < 4) continue;
    for (let index = 0; index < 4; index += 1) {
      const coordinate = rectangle.lookup(index, PDFNumber).asNumber();
      rectangle.set(
        index,
        PDFNumber.of(coordinate + (index % 2 === 0 ? offsetX : offsetY)),
      );
    }
  }
}

async function fitPdfToPaper(pdfBytes, requestedPaper) {
  const input = pdfBuffer(pdfBytes);
  const paper = normalizePaperSize(requestedPaper);
  if (paper === "original") return Buffer.from(input);

  const source = await PDFDocument.load(input);
  const output = await PDFDocument.create();
  copyMetadata(source, output);
  const sourcePages = source.getPages();
  const copiedPages = await output.copyPages(
    source,
    sourcePages.map((_page, index) => index),
  );

  for (let index = 0; index < sourcePages.length; index += 1) {
    const sourcePage = sourcePages[index];
    const page = copiedPages[index];
    const sourceWidth = sourcePage.getWidth();
    const sourceHeight = sourcePage.getHeight();
    const rotation = ((sourcePage.getRotation().angle % 360) + 360) % 360;
    const swapsAxes = rotation === 90 || rotation === 270;
    const displayedWidth = swapsAxes ? sourceHeight : sourceWidth;
    const displayedHeight = swapsAxes ? sourceWidth : sourceHeight;
    const displayedTarget = paperSizePoints(paper, displayedWidth > displayedHeight);
    const targetSize = swapsAxes
      ? [displayedTarget[1], displayedTarget[0]]
      : displayedTarget;
    const [targetWidth, targetHeight] = targetSize;
    const scale = Math.min(targetWidth / sourceWidth, targetHeight / sourceHeight);
    const drawnWidth = sourceWidth * scale;
    const drawnHeight = sourceHeight * scale;
    const offsetX = (targetWidth - drawnWidth) / 2;
    const offsetY = (targetHeight - drawnHeight) / 2;
    page.scale(scale, scale);
    page.setSize(targetWidth, targetHeight);
    if (offsetX || offsetY) {
      page.translateContent(offsetX, offsetY);
      translateAnnotations(page, offsetX, offsetY);
    }
    output.addPage(page);
  }

  const result = await output.save({ useObjectStreams: true });
  return Buffer.from(result.buffer, result.byteOffset, result.byteLength);
}

module.exports = {
  PAPER_SIZES_MM,
  fitPdfToPaper,
  normalizePaperSize,
  paperSizePoints,
};
