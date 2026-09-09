"use strict";

const assert = require("node:assert/strict");
const browserI18n = require("../app/editor-assets/i18n-data.js");
const { getMessages, normalizeLanguage } = require("../native-i18n.cjs");

assert.deepEqual(Object.keys(browserI18n.languages), ["es", "en", "pt", "de", "fr", "zh", "ms"]);
assert.equal(browserI18n.normalizeLanguage("pt-BR"), "pt");
assert.equal(normalizeLanguage("fr-FR"), "fr");
assert.equal(browserI18n.normalizeLanguage("zh-CN"), "zh");
assert.equal(normalizeLanguage("ms-MY"), "ms");
assert.equal(browserI18n.translate("Archivo", "en"), "File");
assert.equal(browserI18n.translate("Guardar", "de"), "Speichern");
assert.equal(browserI18n.translate("Imprimir", "fr"), "Imprimer");
assert.equal(browserI18n.translate("Archivo", "zh"), "文件");
assert.equal(browserI18n.translate("Archivo", "ms"), "Fail");
assert.equal(browserI18n.translate("OCR de ventana", "zh"), "区域 OCR");
assert.equal(browserI18n.translate("Nuevo PDF en blanco", "ms"), "PDF kosong baharu");
assert.equal(browserI18n.translate("Página 12", "en"), "Page 12");
assert.equal(browserI18n.translate("7 coincidencias", "de"), "7 Treffer");

const sourceKeys = browserI18n.rows.map((row) => row[0]);
assert.equal(new Set(sourceKeys).size, sourceKeys.length, "Duplicate Spanish translation key");
for (const row of browserI18n.rows) {
  assert.equal(row.length, 7, `Incomplete translation row: ${row[0]}`);
  row.forEach((value) => assert.ok(String(value).trim(), `Empty translation: ${row[0]}`));
  if (!["Microsoft Word", "Microsoft Excel"].includes(row[0])) {
    assert.notEqual(row[5], row[0], `Missing Simplified Chinese translation: ${row[0]}`);
    assert.notEqual(row[6], row[0], `Missing Malay translation: ${row[0]}`);
  }
}

const requiredMenuLabels = [
  "Archivo", "Editar", "Páginas", "Visualización", "Abrir o convertir",
  "Guardar", "Guardar como", "Imprimir", "Marca de agua", "Firma digital",
  "Buscar en todas las páginas", "Propiedades", "Personalizar barra de herramientas",
  "Nuevo PDF en blanco", "OCR de ventana", "Enlace detectado", "Abrir enlace",
  "Escribir correo", "Seleccionar texto", "Copiar texto seleccionado",
  "Aumento máximo",
];
for (const label of requiredMenuLabels) {
  assert.ok(browserI18n.canTranslate(label), `Missing interface label: ${label}`);
}

for (const language of ["es", "en", "pt", "de", "fr", "zh", "ms"]) {
  const native = getMessages(language);
  assert.match(native.print.paperDetail, /A2/);
  assert.match(native.print.paperDetail, /A1/);
  assert.ok(native.license.purchase.length > 30);
  assert.ok(native.license.thanks("Test User").includes("Test User"));
}

console.log("i18n smoke test passed");
