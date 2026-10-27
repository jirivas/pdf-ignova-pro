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
const i18nExtra = read("app/editor-assets/i18n-extra.js");
const installer = read("installer/PDF-Ignova-Pro.iss");

assert.equal(packageJson.version, "1.9.13");

assert.match(editorHtml, /text-edit-utils\.js/);
assert.match(editor, /PDF_IGNOVA_TEXT_EDIT/);
assert.match(editor, /captureTextAppearance/);
assert.match(editor, /backgroundPatchData/);
assert.match(editor, /sourceFontKey/);
assert.match(editor, /fontSizeRatio/);
assert.match(editor, /fontFamily: n\.cssFont \|\| n\.font/);
assert.match(css, /white-space:\s*pre-wrap/);

assert.match(editor, /merge-pdf-button/);
assert.match(editor, /onClick: \(\) => Jx\("merge"\)/);
assert.match(editor, /onChange: \(n\) => ks\(n, "merge"\)/);
assert.match(editor, /p\\xE1gina\$\{A\.length === 1 \? "" : "s"\} a\\xF1adidas/);
assert.match(i18nExtra, /\["Fusionar PDF", "Merge PDFs"/);

assert.match(editor, /dualPageSelections/);
assert.match(editor, /dualSelectionAnchors/);
assert.match(editor, /application\/x-pdf-ignova-pages/);
assert.match(editor, /event\.ctrlKey \|\| event\.metaKey/);
assert.match(editor, /zoomWheelAnchor/);
assert.match(editor, /n\.ctrlKey \|\| n\.metaKey/);

assert.match(editor, /pagePanelOpen/);
assert.match(editor, /mergePanelOpen/);
assert.match(editor, /n === "combine"/);
assert.match(editor, /combinedDocument/);

assert.match(editor, /className: "smallmodal new-text-modal"/);
assert.match(editor, /Edita directamente el texto seleccionado/);

assert.match(installer, /PDF-Ignova-Pro-1\.9\.13-Setup-Windows-x64-unsigned/);
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.13.txt")));
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.13_MAC.txt")));

console.log("version 1.9.13 smoke test passed");
