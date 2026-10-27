"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");
const packageJson = JSON.parse(read("package.json"));
const editorHtml = read("app/editor.html");
const editor = read("app/editor-assets/editor-entry.js");
const css = read("app/editor-assets/editor-entry.css");
const uiCss = read("app/editor-assets/editor-ui-v16.css");
const i18nExtra = read("app/editor-assets/i18n-extra.js");
const installer = read("installer/PDF-Ignova-Pro.iss");

assert.equal(packageJson.version, "1.9.15");

assert.match(editorHtml, /text-edit-utils\.js/);
assert.match(editor, /PDF_IGNOVA_TEXT_EDIT/);
assert.match(editor, /captureTextAppearance/);
assert.match(editor, /backgroundPatchData/);
assert.match(editor, /sourceFontKey/);
assert.match(editor, /fontSizeRatio/);
assert.match(editor, /fontFamily: n\.cssFont \|\| n\.font/);
assert.match(css, /white-space:\s*pre-wrap/);

assert.match(editor, /children: "Seleccionar"/);
assert.match(editor, /children: "Modificar texto"/);
assert.match(editor, /children: "Crear texto"/);
assert.match(editor, /W !== "modify-text"/);
assert.match(editor, /contentEditable: !n\.replaceOriginal/);
assert.match(editor, /Modificar texto existente/);
assert.match(editor, /screen-region-selection/);
assert.match(uiCss, /\.screen-region-selection/);
assert.match(uiCss, /\.pdf-original-cover/);

assert.match(editor, /merge-pdf-button/);
assert.match(editor, /dualPageSelections/);
assert.match(editor, /pagePanelOpen/);
assert.match(editor, /mergePanelOpen/);

assert.match(i18nExtra, /\["Modificar texto", "Modify text"/);
assert.match(i18nExtra, /\["Crear texto", "Create text"/);
assert.match(installer, /PDF-Ignova-Pro-1\.9\.15-Setup-Windows-x64-unsigned/);
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.15.txt")));
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.15_MAC.txt")));

console.log("version 1.9.15 smoke test passed");
