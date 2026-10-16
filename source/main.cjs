const { app, BrowserWindow, clipboard, dialog, ipcMain, nativeImage, shell } = require("electron");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const fsp = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const {
  initializeSupportLicense,
  maybeShowSupportReminder,
} = require("./commercial-license.cjs");
const { getMessages, normalizeLanguage } = require("./native-i18n.cjs");
const { fitPdfToPaper, normalizePaperSize } = require("./print-paper.cjs");

app.setName("PDF Ignova Pro");
app.setAppUserModelId("com.ignova.pdf-ignova-pro");

const supportedLaunchExtensions = new Set([
  ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
  ".odt", ".ods", ".odp", ".dwg", ".dxf", ".jpg", ".jpeg",
  ".png", ".bmp", ".webp", ".tif", ".tiff",
]);
let mainWindow = null;
let pendingLaunchFiles = [];
const activePrintWindows = new Set();
let commercialLicense = null;
let supportLicenseState = null;
let uiLanguage = "es";

function localizedWindowTitle() {
  return commercialLicense?.customer
    ? `PDF Ignova Pro — ${getMessages(uiLanguage).licensedTo} ${commercialLicense.customer}`
    : "PDF Ignova Pro";
}

function updateMainWindowTitle() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.setTitle(localizedWindowTitle());
  }
}

ipcMain.handle("set-ui-language", (_event, requestedLanguage) => {
  uiLanguage = normalizeLanguage(requestedLanguage);
  updateMainWindowTitle();
  return uiLanguage;
});

const allowedExternalProtocols = new Set(["http:", "https:", "mailto:"]);

function normalizeExternalLink(value) {
  const source = String(value || "").trim();
  if (!source || source.length > 4096 || /[\u0000-\u001f\u007f]/u.test(source)) {
    throw new Error("El enlace no es válido");
  }
  try {
    if (/[\u0000-\u001f\u007f]/u.test(decodeURIComponent(source))) {
      throw new Error("El enlace no es válido");
    }
  } catch {
    throw new Error("El enlace no es válido");
  }
  let target;
  try {
    target = new URL(source);
  } catch {
    throw new Error("El enlace no es válido");
  }
  if (!allowedExternalProtocols.has(target.protocol)) {
    throw new Error("El tipo de enlace no está permitido");
  }
  return target.href;
}

ipcMain.handle("open-external-link", async (_event, value) => {
  const target = normalizeExternalLink(value);
  await shell.openExternal(target);
  return { ok: true };
});

function removeTempDirectoryLater(tempDir, delayMs = 90000) {
  const timer = setTimeout(() => {
    fsp.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }, delayMs);
  if (typeof timer.unref === "function") timer.unref();
}

function closeActivePrintWindows() {
  for (const printWindow of [...activePrintWindows]) {
    if (!printWindow.isDestroyed()) printWindow.destroy();
  }
}

function launchFilesFromArgs(args) {
  return [...new Set(args
    .filter(value => typeof value === "string" && !value.startsWith("--"))
    .map(value => path.resolve(value))
    .filter(value => supportedLaunchExtensions.has(path.extname(value).toLowerCase()) && fs.existsSync(value)))];
}

function queueLaunchFiles(filePaths) {
  if (!filePaths.length) return;
  pendingLaunchFiles.push(...filePaths.filter(file => !pendingLaunchFiles.includes(file)));
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.show();
    mainWindow.focus();
    if (!mainWindow.webContents.isLoading()) {
      const files = pendingLaunchFiles.splice(0);
      mainWindow.webContents.send("open-document-paths", files);
    }
  }
}

const singleInstanceLock = app.requestSingleInstanceLock();
if (!singleInstanceLock) app.quit();
else {
  pendingLaunchFiles = launchFilesFromArgs(process.argv.slice(1));
  app.on("second-instance", (_event, argv) => queueLaunchFiles(launchFilesFromArgs(argv.slice(1))));
  app.on("open-file", (event, filePath) => {
    event.preventDefault();
    queueLaunchFiles(launchFilesFromArgs([filePath]));
  });
}

ipcMain.handle("read-clipboard-image", () => {
  const image = clipboard.readImage();
  return image.isEmpty() ? null : image.toDataURL();
});

function runProcess(command, args, timeoutMs = 180000) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { windowsHide: true });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => {
      child.kill();
      reject(new Error("La conversión superó el tiempo máximo permitido"));
    }, timeoutMs);
    child.stdout.on("data", chunk => { stdout += chunk.toString(); });
    child.stderr.on("data", chunk => { stderr += chunk.toString(); });
    child.on("error", error => {
      clearTimeout(timer);
      reject(error);
    });
    child.on("close", code => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout.trim());
      else reject(new Error(stderr.trim() || stdout.trim() || `El conversor terminó con código ${code}`));
    });
  });
}

function powershellPath() {
  return process.env.SystemRoot
    ? path.join(process.env.SystemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe")
    : "powershell.exe";
}

function bundledScript(name) {
  const unpacked = path.join(process.resourcesPath, "app.asar.unpacked", "scripts", name);
  if (fs.existsSync(unpacked)) return unpacked;

  const bundled = path.join(__dirname, "scripts", name);
  if (!fs.existsSync(bundled)) {
    throw new Error(`Falta el componente auxiliar ${name}. Reinstala PDF Ignova Pro.`);
  }

  // Los procesos auxiliares no pueden ejecutarse dentro de app.asar. Si una
  // distribución omite app.asar.unpacked, Node materializa el recurso en una
  // ruta normal antes de utilizarlo.
  if (bundled.toLowerCase().includes("app.asar")) {
    const runtimeScripts = path.join(app.getPath("userData"), "runtime-scripts");
    fs.mkdirSync(runtimeScripts, { recursive: true });
    const materialized = path.join(runtimeScripts, name);
    const bundledBytes = fs.readFileSync(bundled);
    if (
      !fs.existsSync(materialized) ||
      !fs.readFileSync(materialized).equals(bundledBytes)
    ) {
      fs.writeFileSync(materialized, bundledBytes);
    }
    if (process.platform === "darwin" && !name.endsWith(".swift")) {
      fs.chmodSync(materialized, 0o755);
    }
    return materialized;
  }

  return bundled;
}

const windowsFontFiles = Object.freeze({
  "Aptos": {
    regular: ["Aptos.ttf", "aptos.ttf"],
    bold: ["Aptos-Bold.ttf", "aptos-bold.ttf"],
    italic: ["Aptos-Italic.ttf", "aptos-italic.ttf"],
    boldItalic: ["Aptos-BoldItalic.ttf", "aptos-bolditalic.ttf"],
  },
  "Arial": {
    regular: ["arial.ttf"], bold: ["arialbd.ttf"],
    italic: ["ariali.ttf"], boldItalic: ["arialbi.ttf"],
  },
  "Book Antiqua": {
    regular: ["bkant.ttf"], bold: ["antquab.ttf"],
    italic: ["antquai.ttf"], boldItalic: ["antquabi.ttf"],
  },
  "Calibri": {
    regular: ["calibri.ttf"], bold: ["calibrib.ttf"],
    italic: ["calibrii.ttf"], boldItalic: ["calibriz.ttf"],
  },
  "Cambria": {
    regular: ["cambria.ttf", "cambria.ttc"], bold: ["cambriab.ttf"],
    italic: ["cambriai.ttf"], boldItalic: ["cambriaz.ttf"],
  },
  "Candara": {
    regular: ["candara.ttf"], bold: ["candarab.ttf"],
    italic: ["candarai.ttf"], boldItalic: ["candaraz.ttf"],
  },
  "Century Gothic": {
    regular: ["gothic.ttf"], bold: ["gothicb.ttf"],
    italic: ["gothici.ttf"], boldItalic: ["gothicz.ttf"],
  },
  "Comic Sans MS": {
    regular: ["comic.ttf"], bold: ["comicbd.ttf"],
    italic: ["comici.ttf"], boldItalic: ["comicz.ttf"],
  },
  "Consolas": {
    regular: ["consola.ttf"], bold: ["consolab.ttf"],
    italic: ["consolai.ttf"], boldItalic: ["consolaz.ttf"],
  },
  "Constantia": {
    regular: ["constan.ttf"], bold: ["constanb.ttf"],
    italic: ["constani.ttf"], boldItalic: ["constanz.ttf"],
  },
  "Corbel": {
    regular: ["corbel.ttf"], bold: ["corbelb.ttf"],
    italic: ["corbeli.ttf"], boldItalic: ["corbelz.ttf"],
  },
  "Courier New": {
    regular: ["cour.ttf"], bold: ["courbd.ttf"],
    italic: ["couri.ttf"], boldItalic: ["courbi.ttf"],
  },
  "Franklin Gothic Medium": {
    regular: ["framdr.ttf", "framdit.ttf", "framd.ttf"],
    bold: ["framdb.ttf", "framd.ttf"], italic: ["framdit.ttf"],
    boldItalic: ["framdit.ttf"],
  },
  "Garamond": {
    regular: ["gara.ttf"], bold: ["garabd.ttf"],
    italic: ["garait.ttf"], boldItalic: ["garait.ttf"],
  },
  "Georgia": {
    regular: ["georgia.ttf"], bold: ["georgiab.ttf"],
    italic: ["georgiai.ttf"], boldItalic: ["georgiaz.ttf"],
  },
  "Impact": { regular: ["impact.ttf"] },
  "Lucida Console": { regular: ["lucon.ttf"] },
  "Palatino Linotype": {
    regular: ["pala.ttf"], bold: ["palab.ttf"],
    italic: ["palai.ttf"], boldItalic: ["palabi.ttf"],
  },
  "Segoe UI": {
    regular: ["segoeui.ttf"], bold: ["segoeuib.ttf"],
    italic: ["segoeuii.ttf"], boldItalic: ["segoeuiz.ttf"],
  },
  "Tahoma": { regular: ["tahoma.ttf"], bold: ["tahomabd.ttf"] },
  "Times New Roman": {
    regular: ["times.ttf"], bold: ["timesbd.ttf"],
    italic: ["timesi.ttf"], boldItalic: ["timesbi.ttf"],
  },
  "Trebuchet MS": {
    regular: ["trebuc.ttf"], bold: ["trebucbd.ttf"],
    italic: ["trebucit.ttf"], boldItalic: ["trebucbi.ttf"],
  },
  "Verdana": {
    regular: ["verdana.ttf"], bold: ["verdanab.ttf"],
    italic: ["verdanai.ttf"], boldItalic: ["verdanaz.ttf"],
  },
});

const macFontFiles = Object.freeze({
  "Aptos": {
    regular: ["Aptos.ttf", "Aptos Display.ttf"],
    bold: ["Aptos Bold.ttf", "Aptos-Bold.ttf"],
    italic: ["Aptos Italic.ttf", "Aptos-Italic.ttf"],
    boldItalic: ["Aptos Bold Italic.ttf", "Aptos-BoldItalic.ttf"],
  },
  "Arial": {
    regular: ["Arial.ttf"], bold: ["Arial Bold.ttf"],
    italic: ["Arial Italic.ttf"], boldItalic: ["Arial Bold Italic.ttf"],
  },
  "Book Antiqua": {
    regular: ["Book Antiqua.ttf"], bold: ["Book Antiqua Bold.ttf"],
    italic: ["Book Antiqua Italic.ttf"], boldItalic: ["Book Antiqua Bold Italic.ttf"],
  },
  "Calibri": {
    regular: ["Calibri.ttf"], bold: ["Calibri Bold.ttf"],
    italic: ["Calibri Italic.ttf"], boldItalic: ["Calibri Bold Italic.ttf"],
  },
  "Cambria": {
    regular: ["Cambria.ttf", "Cambria.ttc"], bold: ["Cambria Bold.ttf"],
    italic: ["Cambria Italic.ttf"], boldItalic: ["Cambria Bold Italic.ttf"],
  },
  "Comic Sans MS": {
    regular: ["Comic Sans MS.ttf"], bold: ["Comic Sans MS Bold.ttf"],
  },
  "Courier New": {
    regular: ["Courier New.ttf"], bold: ["Courier New Bold.ttf"],
    italic: ["Courier New Italic.ttf"], boldItalic: ["Courier New Bold Italic.ttf"],
  },
  "Georgia": {
    regular: ["Georgia.ttf"], bold: ["Georgia Bold.ttf"],
    italic: ["Georgia Italic.ttf"], boldItalic: ["Georgia Bold Italic.ttf"],
  },
  "Palatino Linotype": {
    regular: ["Palatino.ttc", "Palatino Linotype.ttf"],
  },
  "Times New Roman": {
    regular: ["Times New Roman.ttf"], bold: ["Times New Roman Bold.ttf"],
    italic: ["Times New Roman Italic.ttf"], boldItalic: ["Times New Roman Bold Italic.ttf"],
  },
  "Trebuchet MS": {
    regular: ["Trebuchet MS.ttf"], bold: ["Trebuchet MS Bold.ttf"],
    italic: ["Trebuchet MS Italic.ttf"], boldItalic: ["Trebuchet MS Bold Italic.ttf"],
  },
  "Verdana": {
    regular: ["Verdana.ttf"], bold: ["Verdana Bold.ttf"],
    italic: ["Verdana Italic.ttf"], boldItalic: ["Verdana Bold Italic.ttf"],
  },
});

function windowsFontDirectories() {
  return [...new Set([
    path.join(process.env.WINDIR || "C:\\Windows", "Fonts"),
    process.env.LOCALAPPDATA
      ? path.join(process.env.LOCALAPPDATA, "Microsoft", "Windows", "Fonts")
      : "",
  ].filter(Boolean))];
}

function macFontDirectories() {
  return [...new Set([
    "/System/Library/Fonts",
    "/System/Library/Fonts/Supplemental",
    "/Library/Fonts",
    "/Library/Fonts/Microsoft",
    path.join(os.homedir(), "Library", "Fonts"),
    path.join(os.homedir(), "Library", "Fonts", "Microsoft"),
  ])];
}

function findSystemFontFile(family, bold, italic) {
  const styles = process.platform === "darwin"
    ? (macFontFiles[family] || windowsFontFiles[family])
    : windowsFontFiles[family];
  if (!styles) return null;
  const directories = process.platform === "darwin"
    ? macFontDirectories()
    : windowsFontDirectories();
  const requested = bold && italic ? "boldItalic" : bold ? "bold" : italic ? "italic" : "regular";
  const fallbacks = [requested, bold ? "bold" : null, italic ? "italic" : null, "regular"]
    .filter((value, index, values) => value && values.indexOf(value) === index);
  for (const style of fallbacks) {
    for (const fileName of styles[style] || []) {
      for (const directory of directories) {
        const candidate = path.join(directory, fileName);
        if (fs.existsSync(candidate)) return candidate;
      }
    }
  }
  return null;
}

ipcMain.handle("get-system-font", async (_event, request) => {
  const family = typeof request?.family === "string" ? request.family : "";
  const fontPath = findSystemFontFile(family, !!request?.bold, !!request?.italic);
  if (!fontPath) return null;
  const bytes = await fsp.readFile(fontPath);
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
});

async function findLibreOffice() {
  const candidates = process.platform === "darwin"
    ? [
        "/Applications/LibreOffice.app/Contents/MacOS/soffice",
        path.join(os.homedir(), "Applications", "LibreOffice.app", "Contents", "MacOS", "soffice"),
        "soffice",
      ]
    : [
        "soffice.exe",
        path.join(process.env.ProgramFiles || "C:\\Program Files", "LibreOffice", "program", "soffice.exe"),
        path.join(process.env["ProgramFiles(x86)"] || "C:\\Program Files (x86)", "LibreOffice", "program", "soffice.exe"),
      ];
  for (const candidate of candidates) {
    if (candidate === "soffice.exe" || candidate === "soffice" || fs.existsSync(candidate)) return candidate;
  }
  return null;
}

async function convertOffice(inputPath, outputDir) {
  const libreOffice = await findLibreOffice();
  if (libreOffice) {
    try {
      await runProcess(libreOffice, [
        "--headless", "--convert-to", "pdf", "--outdir", outputDir, inputPath,
      ]);
      const expected = path.join(outputDir, `${path.parse(inputPath).name}.pdf`);
      if (fs.existsSync(expected)) return expected;
    } catch {
      // En Windows se intenta Microsoft Office. En macOS se informa de que
      // LibreOffice es necesario para esta conversión.
    }
  }
  if (process.platform !== "win32") {
    throw new Error("Para convertir documentos de Office en macOS, instala LibreOffice");
  }
  const script = bundledScript("convert-office.ps1");
  const outputPath = path.join(outputDir, `${path.parse(inputPath).name}.pdf`);
  await runProcess(powershellPath(), [
    "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script,
    "-InputPath", inputPath, "-OutputPath", outputPath,
  ]);
  if (!fs.existsSync(outputPath)) throw new Error("Microsoft Office no produjo el archivo PDF");
  return outputPath;
}

async function convertDwg(inputPath, outputDir) {
  if (process.platform !== "win32") {
    throw new Error("La conversión directa de DWG/DXF requiere AutoCAD para Windows");
  }
  const script = bundledScript("convert-dwg.ps1");
  const outputPath = path.join(outputDir, `${path.parse(inputPath).name}.pdf`);
  await runProcess(powershellPath(), [
    "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script,
    "-InputPath", inputPath, "-OutputPath", outputPath,
  ], 240000);
  if (!fs.existsSync(outputPath)) throw new Error("AutoCAD no produjo el archivo PDF");
  return outputPath;
}

async function convertRasterImage(inputPath) {
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  const extension = path.extname(inputPath).toLowerCase();
  let pngBuffers = [];

  if (extension === ".tif" || extension === ".tiff") {
    const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "pdf-estudio-tiff-"));
    try {
      let stdout;
      if (process.platform === "darwin") {
        const helper = bundledScript("convert-tiff-macos");
        stdout = await runProcess(helper, [inputPath, tempDir]);
      } else {
        const script = bundledScript("convert-tiff.ps1");
        stdout = await runProcess(powershellPath(), [
          "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script,
          "-InputPath", inputPath, "-OutputDir", tempDir,
        ]);
      }
      const files = JSON.parse(stdout);
      pngBuffers = await Promise.all(files.map(file => fsp.readFile(file)));
    } finally {
      await fsp.rm(tempDir, { recursive: true, force: true });
    }
  } else {
    const image = nativeImage.createFromPath(inputPath);
    if (image.isEmpty()) throw new Error("El sistema no pudo interpretar la imagen");
    pngBuffers = [image.toPNG()];
  }

  for (const pngBytes of pngBuffers) {
    const embedded = await pdf.embedPng(pngBytes);
    const sourceWidth = embedded.width;
    const sourceHeight = embedded.height;
    const maxWidth = 841.89;
    const maxHeight = 1190.55;
    const initialScale = 72 / 96;
    const fitScale = Math.min(initialScale, maxWidth / sourceWidth, maxHeight / sourceHeight);
    const width = Math.max(1, sourceWidth * fitScale);
    const height = Math.max(1, sourceHeight * fitScale);
    const page = pdf.addPage([width, height]);
    page.drawImage(embedded, { x: 0, y: 0, width, height });
  }
  return Buffer.from(await pdf.save());
}

async function convertOneToPdf(inputPath, outputDir) {
  const extension = path.extname(inputPath).toLowerCase();
  if (extension === ".pdf") return fsp.readFile(inputPath);
  if ([".jpg", ".jpeg", ".png", ".bmp", ".webp", ".tif", ".tiff"].includes(extension)) {
    return convertRasterImage(inputPath);
  }
  if ([".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".odt", ".ods", ".odp"].includes(extension)) {
    return fsp.readFile(await convertOffice(inputPath, outputDir));
  }
  if (extension === ".dwg" || extension === ".dxf") {
    return fsp.readFile(await convertDwg(inputPath, outputDir));
  }
  throw new Error(`Formato no compatible: ${extension || "sin extensión"}`);
}

async function convertPaths(filePaths) {
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "pdf-estudio-import-"));
  try {
    const converted = [];
    for (const requestedPath of filePaths) {
      const inputPath = path.resolve(requestedPath);
      try {
        const stat = await fsp.stat(inputPath);
        if (!stat.isFile()) throw new Error("La ruta seleccionada no es un archivo");
        const bytes = await convertOneToPdf(inputPath, tempDir);
        converted.push({
          name: `${path.parse(inputPath).name}.pdf`,
          originalName: path.basename(inputPath),
          bytes: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
        });
      } catch (error) {
        converted.push({
          name: path.basename(inputPath),
          error: error?.message || String(error),
        });
      }
    }
    return converted;
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
}

ipcMain.handle("choose-and-convert-documents", async () => {
  const owner = BrowserWindow.getFocusedWindow();
  const options = {
    title: "Abrir o convertir documentos a PDF",
    properties: ["openFile", "multiSelections"],
    filters: [
      {
        name: "Documentos compatibles",
        extensions: [
          "pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx",
          "odt", "ods", "odp", "dwg", "dxf",
          "jpg", "jpeg", "png", "bmp", "webp", "tif", "tiff",
        ],
      },
      { name: "Todos los archivos", extensions: ["*"] },
    ],
  };
  const result = owner && !owner.isDestroyed()
    ? await dialog.showOpenDialog(owner, options)
    : await dialog.showOpenDialog(options);
  if (result.canceled || !result.filePaths.length) return [];
  return convertPaths(result.filePaths);
});

ipcMain.handle("convert-document-paths", async (_event, filePaths) => {
  if (!Array.isArray(filePaths) || !filePaths.length) return [];
  return convertPaths(filePaths.filter(item => typeof item === "string" && item.length));
});

ipcMain.handle("convert-document-files", async (_event, files) => {
  if (!Array.isArray(files) || !files.length) return [];

  const inputDir = await fsp.mkdtemp(path.join(os.tmpdir(), "pdf-estudio-picker-"));
  try {
    const inputPaths = [];
    const originalNames = [];
    for (let index = 0; index < files.length; index += 1) {
      const item = files[index];
      const originalName = path.basename(String(item?.name || `documento-${index + 1}`));
      const extension = path.extname(originalName).toLowerCase();
      if (!supportedLaunchExtensions.has(extension)) {
        throw new Error(`Formato no compatible: ${extension || "sin extensión"}`);
      }

      let bytes;
      if (item?.bytes instanceof ArrayBuffer) {
        bytes = Buffer.from(new Uint8Array(item.bytes));
      } else if (ArrayBuffer.isView(item?.bytes)) {
        bytes = Buffer.from(item.bytes.buffer, item.bytes.byteOffset, item.bytes.byteLength);
      } else {
        throw new Error(`${originalName}: no se pudieron leer los datos seleccionados`);
      }

      const safeStem = path.parse(originalName).name
        .replace(/[^a-zA-Z0-9._-]+/g, "_")
        .slice(0, 80) || "documento";
      const inputPath = path.join(inputDir, `${String(index + 1).padStart(3, "0")}-${safeStem}${extension}`);
      await fsp.writeFile(inputPath, bytes);
      inputPaths.push(inputPath);
      originalNames.push(originalName);
    }
    const converted = await convertPaths(inputPaths);
    return converted.map((item, index) => item.error
      ? { ...item, name: originalNames[index] || item.name }
      : {
          ...item,
          name: `${path.parse(originalNames[index] || item.name).name}.pdf`,
          originalName: originalNames[index] || item.originalName,
        });
  } finally {
    await fsp.rm(inputDir, { recursive: true, force: true });
  }
});

ipcMain.handle("get-launch-files", () => pendingLaunchFiles.splice(0));

function suggestedPrintedPdfName(documentName) {
  const rawName = typeof documentName === "string" && documentName.trim()
    ? path.basename(documentName.trim())
    : "documento.pdf";
  const stem = path.parse(rawName).name
    .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "_")
    .trim()
    .slice(0, 120) || "documento";
  return `${stem}_impresion.pdf`;
}

function suggestedSavedPdfName(documentName) {
  const rawName = typeof documentName === "string" && documentName.trim()
    ? path.basename(documentName.trim())
    : "documento_editado.pdf";
  const stem = path.parse(rawName).name
    .replace(/[<>:"/\\|?*\u0000-\u001f]+/g, "_")
    .trim()
    .slice(0, 120) || "documento_editado";
  return `${stem}.pdf`;
}

async function writeFileSafely(outputPath, bytes) {
  const uniqueSuffix = `${process.pid}.${Date.now()}`;
  const temporaryPath = path.join(
    path.dirname(outputPath),
    `.${path.basename(outputPath)}.${uniqueSuffix}.tmp`,
  );
  const backupPath = path.join(
    path.dirname(outputPath),
    `.${path.basename(outputPath)}.${uniqueSuffix}.bak`,
  );
  let originalMoved = false;
  try {
    await fsp.writeFile(temporaryPath, bytes, { flag: "wx" });
    try {
      await fsp.rename(temporaryPath, outputPath);
    } catch (error) {
      if (!(["EEXIST", "EPERM", "EACCES"].includes(error?.code))) throw error;
      await fsp.rename(outputPath, backupPath);
      originalMoved = true;
      try {
        await fsp.rename(temporaryPath, outputPath);
      } catch (replacementError) {
        try {
          await fsp.rename(backupPath, outputPath);
          originalMoved = false;
        } catch {
          // The outer recovery block makes one last restore attempt.
        }
        throw replacementError;
      }
      await fsp.rm(backupPath, { force: true }).catch(() => {});
      originalMoved = false;
    }
  } catch (error) {
    await fsp.rm(temporaryPath, { force: true }).catch(() => {});
    if (originalMoved) {
      await fsp.rename(backupPath, outputPath).catch(() => {});
    }
    throw error;
  }
}

ipcMain.handle("save-pdf-as", async (event, pdfArrayBuffer, documentName) => {
  const text = getMessages(uiLanguage).print;
  if (!(pdfArrayBuffer instanceof ArrayBuffer) && !ArrayBuffer.isView(pdfArrayBuffer)) {
    throw new Error(text.invalidData);
  }
  const pdfBuffer = pdfArrayBuffer instanceof ArrayBuffer
    ? Buffer.from(new Uint8Array(pdfArrayBuffer))
    : Buffer.from(pdfArrayBuffer.buffer, pdfArrayBuffer.byteOffset, pdfArrayBuffer.byteLength);
  if (!pdfBuffer.length) throw new Error(text.emptyDocument);

  const senderWindow = BrowserWindow.fromWebContents(event.sender);
  const owner = senderWindow && !senderWindow.isDestroyed()
    ? senderWindow
    : BrowserWindow.getFocusedWindow();
  const saveOptions = {
    title: text.saveTitle,
    defaultPath: path.join(app.getPath("documents"), suggestedSavedPdfName(documentName)),
    filters: [{ name: text.pdfFilter, extensions: ["pdf"] }],
    properties: ["showOverwriteConfirmation", "createDirectory"],
  };
  if (owner && !owner.isDestroyed()) {
    if (owner.isMinimized()) owner.restore();
    owner.focus();
  }
  const saveResult = owner && !owner.isDestroyed()
    ? await dialog.showSaveDialog(owner, saveOptions)
    : await dialog.showSaveDialog(saveOptions);
  if (saveResult.canceled || !saveResult.filePath) {
    if (owner && !owner.isDestroyed()) owner.focus();
    return { ok: false, canceled: true };
  }
  const outputPath = saveResult.filePath.toLowerCase().endsWith(".pdf")
    ? saveResult.filePath
    : `${saveResult.filePath}.pdf`;
  await writeFileSafely(outputPath, pdfBuffer);
  if (owner && !owner.isDestroyed()) owner.focus();
  return {
    ok: true,
    canceled: false,
    fileName: path.basename(outputPath),
    filePath: outputPath,
  };
});

async function showPrintDestination(owner, language) {
  const text = getMessages(language).print;
  const options = {
    type: "question",
    title: text.title,
    message: text.destinationMessage,
    detail: text.destinationDetail,
    buttons: [text.savePdf, text.choosePrinter, text.cancel],
    defaultId: 0,
    cancelId: 2,
    noLink: true,
  };
  return owner && !owner.isDestroyed()
    ? dialog.showMessageBox(owner, options)
    : dialog.showMessageBox(options);
}

async function showPrintPaperSize(owner, language) {
  const text = getMessages(language).print;
  const options = {
    type: "question",
    title: text.paperTitle,
    message: text.paperMessage,
    detail: text.paperDetail,
    buttons: [
      text.original,
      "A4 — 210 × 297 mm",
      "A3 — 297 × 420 mm",
      "A2 — 420 × 594 mm",
      "A1 — 594 × 841 mm",
      text.cancel,
    ],
    defaultId: 0,
    cancelId: 5,
    noLink: true,
  };
  const result = owner && !owner.isDestroyed()
    ? await dialog.showMessageBox(owner, options)
    : await dialog.showMessageBox(options);
  if (result.response === 5) return null;
  return ["original", "A4", "A3", "A2", "A1"][result.response] || "original";
}

ipcMain.handle("print-pdf", async (event, pdfArrayBuffer, documentName, printOptions = {}) => {
  const language = normalizeLanguage(printOptions?.language || uiLanguage);
  const text = getMessages(language).print;
  if (!(pdfArrayBuffer instanceof ArrayBuffer) && !ArrayBuffer.isView(pdfArrayBuffer)) {
    throw new Error(text.invalidData);
  }

  const pdfBuffer = pdfArrayBuffer instanceof ArrayBuffer
    ? Buffer.from(new Uint8Array(pdfArrayBuffer))
    : Buffer.from(pdfArrayBuffer.buffer, pdfArrayBuffer.byteOffset, pdfArrayBuffer.byteLength);
  if (!pdfBuffer.length) {
    throw new Error(text.emptyDocument);
  }

  const owner = BrowserWindow.fromWebContents(event.sender);
  const destination = await showPrintDestination(owner, language);
  if (destination.response === 2) return { ok: false, canceled: true };
  const selectedPaper = await showPrintPaperSize(owner, language);
  if (!selectedPaper) return { ok: false, canceled: true };
  const paperSize = normalizePaperSize(selectedPaper);

  if (destination.response === 0) {
    const suggestedName = suggestedPrintedPdfName(documentName);
    const options = {
      title: text.saveTitle,
      defaultPath: path.join(app.getPath("documents"), suggestedName),
      filters: [{ name: text.pdfFilter, extensions: ["pdf"] }],
      properties: ["showOverwriteConfirmation", "createDirectory"],
    };
    const saveResult = owner && !owner.isDestroyed()
      ? await dialog.showSaveDialog(owner, options)
      : await dialog.showSaveDialog(options);
    if (saveResult.canceled || !saveResult.filePath) {
      return { ok: false, canceled: true };
    }
    const outputPath = saveResult.filePath.toLowerCase().endsWith(".pdf")
      ? saveResult.filePath
      : `${saveResult.filePath}.pdf`;
    const printableBuffer = paperSize === "original"
      ? pdfBuffer
      : await fitPdfToPaper(pdfBuffer, paperSize);
    await fsp.writeFile(outputPath, printableBuffer);
    return {
      ok: true,
      savedAsPdf: true,
      fileName: path.basename(outputPath),
      paperSize,
    };
  }

  const printableBuffer = paperSize === "original"
    ? pdfBuffer
    : await fitPdfToPaper(pdfBuffer, paperSize);
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "pdf-estudio-print-"));
  const pdfPath = path.join(tempDir, "documento-para-imprimir.pdf");
  await fsp.writeFile(pdfPath, printableBuffer);

  const printWindow = new BrowserWindow({
    title: `${text.windowTitle} — ${path.basename(documentName || "documento.pdf")}`,
    width: 720,
    height: 520,
    minWidth: 520,
    minHeight: 380,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#f2f5f9",
    parent: owner && !owner.isDestroyed() ? owner : undefined,
    webPreferences: {
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: false,
    },
  });
  activePrintWindows.add(printWindow);

  let watchdog = null;
  let cleanupDelayMs = 90000;
  printWindow.once("closed", () => {
    activePrintWindows.delete(printWindow);
    if (watchdog) clearTimeout(watchdog);
    removeTempDirectoryLater(tempDir, cleanupDelayMs);
  });

  try {
    const printPageUrl = new URL(pathToFileURL(path.join(__dirname, "app", "print.html")).href);
    printPageUrl.searchParams.set("source", pathToFileURL(pdfPath).href);
    printPageUrl.searchParams.set("name", path.basename(documentName || "documento.pdf"));
    printPageUrl.searchParams.set("lang", language);
    await Promise.race([
      printWindow.loadURL(printPageUrl.href),
      new Promise((_, reject) => {
        const loadTimer = setTimeout(
          () => reject(new Error(text.loadTimeout)),
          15000,
        );
        if (typeof loadTimer.unref === "function") loadTimer.unref();
      }),
    ]);

    if (printWindow.isDestroyed()) throw new Error(text.closedView);
    printWindow.show();
    printWindow.focus();

    watchdog = setTimeout(() => {
      if (!printWindow.isDestroyed()) printWindow.destroy();
    }, 10 * 60 * 1000);
    if (typeof watchdog.unref === "function") watchdog.unref();

    // print.html rasteriza las páginas antes de llamar a window.print().
    // Así se evita imprimir directamente el visor PDF interno de Chromium,
    // una ruta que puede fallar o quedar en cola en Windows.
    return { ok: true, preparingPrinterDialog: true, paperSize };
  } catch (error) {
    cleanupDelayMs = 15 * 60 * 1000;
    if (!printWindow.isDestroyed()) printWindow.destroy();
    const fallback = await shell.openPath(pdfPath);
    if (fallback) throw error;
    return { ok: false, openedInDefaultViewer: true, message: error?.message || String(error) };
  }
});

ipcMain.handle("ocr-page", async (_event, imageArrayBuffer) => {
  if (!(imageArrayBuffer instanceof ArrayBuffer) && !ArrayBuffer.isView(imageArrayBuffer)) {
    throw new Error("No se recibió una imagen válida para OCR");
  }
  const tempDir = await fsp.mkdtemp(path.join(os.tmpdir(), "pdf-estudio-ocr-"));
  const imagePath = path.join(tempDir, "pagina.png");
  try {
    const imageBuffer = imageArrayBuffer instanceof ArrayBuffer
      ? Buffer.from(new Uint8Array(imageArrayBuffer))
      : Buffer.from(imageArrayBuffer.buffer, imageArrayBuffer.byteOffset, imageArrayBuffer.byteLength);
    await fsp.writeFile(imagePath, imageBuffer);
    let output;
    let engineName;
    if (process.platform === "darwin") {
      const helper = bundledScript("ocr-macos");
      output = await runProcess(helper, [imagePath], 90000);
      engineName = "macOS Vision";
    } else if (process.platform === "win32") {
      const script = bundledScript("ocr-windows.ps1");
      output = await runProcess(powershellPath(), [
        "-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script,
        "-InputPath", imagePath,
      ], 90000);
      engineName = "Windows OCR";
    } else {
      throw new Error("El OCR local no está disponible en este sistema operativo");
    }
    const result = JSON.parse(output.replace(/^\uFEFF/, ""));
    if (!result || !Array.isArray(result.lines)) {
      throw new Error(`${engineName} devolvió una respuesta incompleta`);
    }
    return result;
  } finally {
    await fsp.rm(tempDir, { recursive: true, force: true });
  }
});

ipcMain.handle("sign-pdf", async (_event, payload) => {
  const [{ SignPdf }, { pdflibAddPlaceholder }, { P12Signer }, { PDFDocument }] = await Promise.all([
    import("@signpdf/signpdf"),
    import("@signpdf/placeholder-pdf-lib"),
    import("@signpdf/signer-p12"),
    import("pdf-lib"),
  ]);

  const pdfBytes = Buffer.from(new Uint8Array(payload.pdfBytes));
  const certificateBytes = Buffer.from(new Uint8Array(payload.certificateBytes));
  const pdfDocument = await PDFDocument.load(pdfBytes);
  const pageIndex = Math.max(0, Math.min(pdfDocument.getPageCount() - 1, payload.pageIndex || 0));

  pdflibAddPlaceholder({
    pdfDoc: pdfDocument,
    pdfPage: pdfDocument.getPage(pageIndex),
    reason: payload.reason || "Aprobación del documento",
    contactInfo: payload.contactInfo || "",
    name: payload.name || "Firmante",
    location: payload.location || "",
    widgetRect: [0, 0, 0, 0],
  });

  const prepared = await pdfDocument.save({ useObjectStreams: false });
  const signer = new P12Signer(certificateBytes, { passphrase: payload.password || "" });
  const signed = await new SignPdf().sign(Buffer.from(prepared), signer);
  return signed.buffer.slice(signed.byteOffset, signed.byteOffset + signed.byteLength);
});

function createWindow() {
  const window = new BrowserWindow({
    title: localizedWindowTitle(),
    width: 1440,
    height: 920,
    minWidth: 1024,
    minHeight: 680,
    show: false,
    backgroundColor: "#ececef",
    icon: path.join(__dirname, "app", "icon-512.png"),
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: false,
      preload: path.join(__dirname, "preload.cjs"),
    },
  });

  window.setMenuBarVisibility(false);
  window.webContents.on("page-title-updated", event => {
    if (!commercialLicense?.customer) return;
    event.preventDefault();
    window.setTitle(localizedWindowTitle());
  });
  window.loadFile(path.join(__dirname, "app", "editor.html")).catch(error => {
    console.error("No se pudo cargar el editor", error);
    if (!window.isVisible()) window.show();
  });
  window.once("ready-to-show", () => {
    window.show();
    setTimeout(async () => {
      try {
        supportLicenseState = await maybeShowSupportReminder(
          window,
          supportLicenseState,
          uiLanguage,
        );
        commercialLicense = supportLicenseState?.license || null;
        if (commercialLicense?.customer && !window.isDestroyed()) {
          window.setTitle(localizedWindowTitle());
        }
      } catch (error) {
        console.error("No se pudo mostrar el recordatorio de apoyo", error);
      }
    }, 900);
  });
  window.webContents.on("render-process-gone", (_event, details) =>
    console.error("El editor se cerró inesperadamente", details));
  window.webContents.on("did-fail-load", (_event, code, description) =>
    console.error("Error al cargar el editor", code, description));
  window.on("closed", () => {
    if (mainWindow === window) {
      closeActivePrintWindows();
      mainWindow = null;
    }
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    try {
      const target = normalizeExternalLink(url);
      void shell.openExternal(target).catch(error =>
        console.error("No se pudo abrir el enlace externo", error));
    } catch {
      // Se bloquean protocolos distintos de HTTP(S) y correo electrónico.
    }
    return { action: "deny" };
  });
  return window;
}

app.whenReady().then(async () => {
  if (!singleInstanceLock) return;
  uiLanguage = normalizeLanguage(app.getLocale());
  try {
    supportLicenseState = await initializeSupportLicense();
    commercialLicense = supportLicenseState.license;
  } catch (error) {
    dialog.showErrorBox(
      "No se pudo iniciar PDF Ignova Pro",
      error?.message || String(error || "Error desconocido"),
    );
    return app.quit();
  }
  mainWindow = createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow = createWindow();
  });
});

app.on("before-quit", closeActivePrintWindows);
app.on("window-all-closed", () => app.quit());
