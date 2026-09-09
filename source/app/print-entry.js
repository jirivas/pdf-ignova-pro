import {
  getDocument,
  GlobalWorkerOptions,
} from "./editor-assets/chunks/pdf-V76QT5PL.js";

GlobalWorkerOptions.workerSrc = new URL("./pdf.worker.mjs", import.meta.url).href;

const params = new URLSearchParams(location.search);
const source = params.get("source") || "";
const documentName = params.get("name") || "documento.pdf";
const requestedLanguage = (params.get("lang") || "es").toLowerCase().split(/[-_]/)[0];
const language = ["es", "en", "pt", "de", "fr"].includes(requestedLanguage)
  ? requestedLanguage
  : "es";
const messages = {
  es: {
    preparing: "Preparando impresión",
    reading: "Leyendo el documento…",
    failed: "No se pudo preparar la impresión",
    retry: "Cierra esta ventana y vuelve a intentarlo.",
    close: "Cerrar",
    invalidPath: "La ruta temporal de impresión no es válida",
    empty: "El documento no contiene páginas",
    page: (current, total) => `Preparando página ${current} de ${total}…`,
    renderPage: (page) => `No se pudo representar la página ${page}`,
    preparePage: "No se pudo preparar una página",
    pageAlt: (page) => `Página ${page}`,
    opening: "Abriendo el cuadro de impresoras…",
    title: (name) => `Imprimir — ${name}`,
  },
  en: {
    preparing: "Preparing to print",
    reading: "Reading the document…",
    failed: "The print job could not be prepared",
    retry: "Close this window and try again.",
    close: "Close",
    invalidPath: "The temporary print path is invalid",
    empty: "The document contains no pages",
    page: (current, total) => `Preparing page ${current} of ${total}…`,
    renderPage: (page) => `Page ${page} could not be rendered`,
    preparePage: "A page could not be prepared",
    pageAlt: (page) => `Page ${page}`,
    opening: "Opening the printer dialogue…",
    title: (name) => `Print — ${name}`,
  },
  pt: {
    preparing: "A preparar a impressão",
    reading: "A ler o documento…",
    failed: "Não foi possível preparar a impressão",
    retry: "Feche esta janela e tente novamente.",
    close: "Fechar",
    invalidPath: "O caminho temporário de impressão não é válido",
    empty: "O documento não contém páginas",
    page: (current, total) => `A preparar a página ${current} de ${total}…`,
    renderPage: (page) => `Não foi possível representar a página ${page}`,
    preparePage: "Não foi possível preparar uma página",
    pageAlt: (page) => `Página ${page}`,
    opening: "A abrir a janela de impressoras…",
    title: (name) => `Imprimir — ${name}`,
  },
  de: {
    preparing: "Druck wird vorbereitet",
    reading: "Dokument wird gelesen…",
    failed: "Der Druckauftrag konnte nicht vorbereitet werden",
    retry: "Schließen Sie dieses Fenster und versuchen Sie es erneut.",
    close: "Schließen",
    invalidPath: "Der temporäre Druckpfad ist ungültig",
    empty: "Das Dokument enthält keine Seiten",
    page: (current, total) => `Seite ${current} von ${total} wird vorbereitet…`,
    renderPage: (page) => `Seite ${page} konnte nicht gerendert werden`,
    preparePage: "Eine Seite konnte nicht vorbereitet werden",
    pageAlt: (page) => `Seite ${page}`,
    opening: "Druckerdialog wird geöffnet…",
    title: (name) => `Drucken — ${name}`,
  },
  fr: {
    preparing: "Préparation de l’impression",
    reading: "Lecture du document…",
    failed: "Impossible de préparer l’impression",
    retry: "Fermez cette fenêtre et réessayez.",
    close: "Fermer",
    invalidPath: "Le chemin temporaire d’impression n’est pas valide",
    empty: "Le document ne contient aucune page",
    page: (current, total) => `Préparation de la page ${current} sur ${total}…`,
    renderPage: (page) => `Impossible de restituer la page ${page}`,
    preparePage: "Impossible de préparer une page",
    pageAlt: (page) => `Page ${page}`,
    opening: "Ouverture de la boîte de dialogue des imprimantes…",
    title: (name) => `Imprimer — ${name}`,
  },
}[language];
const statusTitle = document.getElementById("status-title");
const progress = document.getElementById("progress");
const printRoot = document.getElementById("print-root");
const closeButton = document.getElementById("close-button");
const generatedUrls = [];
document.documentElement.lang = language === "pt" ? "pt-PT" : language;
statusTitle.textContent = messages.preparing;
progress.textContent = messages.reading;
closeButton.textContent = messages.close;

const printState = {
  state: "loading",
  page: 0,
  total: 0,
  error: "",
};
window.__PDF_IGNOVA_PRINT__ = printState;
window.__PDF_ESTUDIO_PRINT__ = printState;

function updateProgress(message, page = 0, total = 0) {
  progress.textContent = message;
  Object.assign(printState, { page, total });
}

function fail(error) {
  const message = error?.message || String(error || "Error desconocido");
  console.error(messages.failed, error);
  document.body.classList.add("error");
  statusTitle.textContent = messages.failed;
  progress.textContent = `${message}. ${messages.retry}`;
  Object.assign(printState, {
    state: "error",
    error: message,
  });
}

function canvasToPng(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      blob => blob ? resolve(blob) : reject(new Error(messages.preparePage)),
      "image/png",
    );
  });
}

function nextPaint() {
  return new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function renderingScale(baseViewport, totalPages) {
  const targetDpi = totalPages <= 24 ? 144 : totalPages <= 80 ? 120 : 96;
  let scale = targetDpi / 72;
  const perPagePixelLimit = totalPages <= 24 ? 14000000 : 8000000;
  const estimatedPixels = baseViewport.width * baseViewport.height * scale * scale;
  if (estimatedPixels > perPagePixelLimit) {
    scale *= Math.sqrt(perPagePixelLimit / estimatedPixels);
  }
  const maxDimension = Math.max(baseViewport.width, baseViewport.height) * scale;
  if (maxDimension > 6500) scale *= 6500 / maxDimension;
  return Math.max(1, scale);
}

async function renderDocument() {
  let sourceUrl;
  try {
    sourceUrl = new URL(source);
  } catch {
    throw new Error(messages.invalidPath);
  }
  if (sourceUrl.protocol !== "file:") {
    throw new Error(messages.invalidPath);
  }

  document.title = messages.title(documentName);
  const loadingTask = getDocument({
    url: sourceUrl.href,
    disableAutoFetch: false,
    disableStream: false,
    isEvalSupported: false,
  });
  const pdf = await loadingTask.promise;
  const totalPages = pdf.numPages;
  if (!totalPages) throw new Error(messages.empty);
  printState.total = totalPages;

  const pageRules = [];
  for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
    updateProgress(messages.page(pageNumber, totalPages), pageNumber, totalPages);

    const page = await pdf.getPage(pageNumber);
    const baseViewport = page.getViewport({ scale: 1 });
    const cssViewport = page.getViewport({ scale: 96 / 72 });
    const renderViewport = page.getViewport({
      scale: renderingScale(baseViewport, totalPages),
    });

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.ceil(renderViewport.width));
    canvas.height = Math.max(1, Math.ceil(renderViewport.height));
    const context = canvas.getContext("2d", { alpha: false });
    if (!context) throw new Error(messages.renderPage(pageNumber));

    await page.render({
      canvasContext: context,
      viewport: renderViewport,
      background: "rgb(255, 255, 255)",
      intent: "print",
    }).promise;

    const blob = await canvasToPng(canvas);
    const imageUrl = URL.createObjectURL(blob);
    generatedUrls.push(imageUrl);
    const image = new Image();
    image.alt = messages.pageAlt(pageNumber);
    image.src = imageUrl;
    await image.decode();

    const pageName = `pdf-estudio-page-${pageNumber}`;
    pageRules.push(
      `@page ${pageName} { size: ${baseViewport.width}pt ${baseViewport.height}pt; margin: 0; }`,
    );
    const sheet = document.createElement("section");
    sheet.className = "print-sheet";
    sheet.style.width = `${cssViewport.width}px`;
    sheet.style.height = `${cssViewport.height}px`;
    sheet.style.setProperty("page", pageName);
    sheet.append(image);
    printRoot.append(sheet);

    canvas.width = 1;
    canvas.height = 1;
    page.cleanup();
    await nextPaint();
  }

  const pageStyle = document.createElement("style");
  pageStyle.textContent = pageRules.join("\n");
  document.head.append(pageStyle);
  printRoot.setAttribute("aria-hidden", "false");
  updateProgress(messages.opening, totalPages, totalPages);
  printState.state = "ready";
  await nextPaint();

  let released = false;
  const releaseUrls = () => {
    if (released) return;
    released = true;
    for (const url of generatedUrls) URL.revokeObjectURL(url);
  };
  let closing = false;
  const closeAfterPrint = () => {
    if (closing) return;
    closing = true;
    releaseUrls();
    setTimeout(() => window.close(), 250);
  };
  window.addEventListener("beforeunload", releaseUrls, { once: true });
  window.addEventListener("afterprint", closeAfterPrint, { once: true });
  setTimeout(() => {
    try {
      window.print();
    } catch (error) {
      fail(error);
    }
  }, 200);
}

closeButton.addEventListener("click", () => window.close());
renderDocument().catch(fail);
