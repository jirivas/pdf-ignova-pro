"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {
  detectTextLink,
  normalizeLinkTarget,
  trimDetectedLink,
} = require("../app/editor-assets/link-utils.js");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");

assert.equal(trimDetectedLink("(https://example.com/docs)."), "https://example.com/docs");
assert.equal(
  trimDetectedLink("(https://example.com/wiki/Función_(matemática))."),
  "https://example.com/wiki/Función_(matemática)",
);
assert.equal(normalizeLinkTarget("https://example.com/docs"), "https://example.com/docs");
assert.equal(normalizeLinkTarget("www.example.com"), "https://www.example.com/");
assert.equal(normalizeLinkTarget("ignova.example/contacto"), "https://ignova.example/contacto");
assert.equal(normalizeLinkTarget("persona@example.com"), "mailto:persona@example.com");
assert.equal(
  normalizeLinkTarget("mailto:persona@example.com?subject=Consulta"),
  "mailto:persona@example.com?subject=Consulta",
);
assert.equal(normalizeLinkTarget("javascript:alert(1)"), null);
assert.equal(normalizeLinkTarget("file:///C:/secreto.txt"), null);
assert.equal(normalizeLinkTarget("data:text/html,test"), null);
assert.equal(normalizeLinkTarget("presupuesto.pdf"), null);
assert.equal(normalizeLinkTarget("https://example.com/%0Afallo"), null);

assert.deepEqual(detectTextLink("Visita https://example.com/ayuda."), {
  kind: "web",
  label: "https://example.com/ayuda",
  target: "https://example.com/ayuda",
});
assert.deepEqual(detectTextLink("Escribe a soporte@example.com"), {
  kind: "email",
  label: "soporte@example.com",
  target: "mailto:soporte@example.com",
});
assert.equal(detectTextLink("Edita el documento presupuesto.pdf"), null);

const main = read("main.cjs");
const preload = read("preload.cjs");
const editor = read("app/editor-assets/editor-entry.js");
const html = read("app/editor.html");
const css = read("app/editor-assets/editor-ui-v16.css");

assert.match(main, /allowedExternalProtocols/);
assert.match(main, /"http:", "https:", "mailto:"/);
assert.match(main, /ipcMain\.handle\("open-external-link"/);
assert.match(preload, /openExternalLink: url => ipcRenderer\.invoke\("open-external-link", url\)/);
assert.match(editor, /getAnnotations\(\{ intent: "display" \}\)/);
assert.match(editor, /PDF_IGNOVA_LINKS\?\.detectTextLink/);
assert.match(editor, /children: "Enlace detectado"/);
assert.match(editor, /"Abrir enlace"/);
assert.match(editor, /children: "Editar texto"/);
assert.match(html, /editor-assets\/link-utils\.js/);
assert.match(css, /\.pdf-native-link-hit/);
assert.match(css, /\.link-choice-modal/);

console.log("link actions smoke test passed");
