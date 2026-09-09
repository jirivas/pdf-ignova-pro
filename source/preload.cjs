const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("pdfEstudio", {
  platform: process.platform,
  signPdf: payload => ipcRenderer.invoke("sign-pdf", payload),
  readClipboardImage: () => ipcRenderer.invoke("read-clipboard-image"),
  chooseAndConvertDocuments: () => ipcRenderer.invoke("choose-and-convert-documents"),
  convertDocumentPaths: paths => ipcRenderer.invoke("convert-document-paths", paths),
  convertDocumentFiles: files => ipcRenderer.invoke("convert-document-files", files),
  getLaunchFiles: () => ipcRenderer.invoke("get-launch-files"),
  onOpenDocumentPaths: callback => {
    const listener = (_event, paths) => callback(paths);
    ipcRenderer.on("open-document-paths", listener);
    return () => ipcRenderer.removeListener("open-document-paths", listener);
  },
  printPdf: (pdfBytes, documentName, options) =>
    ipcRenderer.invoke("print-pdf", pdfBytes, documentName, options),
  setUiLanguage: language => ipcRenderer.invoke("set-ui-language", language),
  openExternalLink: url => ipcRenderer.invoke("open-external-link", url),
  ocrPage: imageBytes => ipcRenderer.invoke("ocr-page", imageBytes),
  getSystemFont: request => ipcRenderer.invoke("get-system-font", request),
  getPathForFile: file => {
    try {
      if (webUtils && typeof webUtils.getPathForFile === "function") {
        return webUtils.getPathForFile(file);
      }
    } catch {
      // Se usa la ruta heredada en versiones anteriores de Electron.
    }
    return typeof file?.path === "string" ? file.path : "";
  },
});
