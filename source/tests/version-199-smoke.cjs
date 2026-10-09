"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");
const packageJson = JSON.parse(read("package.json"));
const main = read("main.cjs");
const preload = read("preload.cjs");
const editor = read("app/editor-assets/editor-entry.js");
const css = read("app/editor-assets/editor-ui-v16.css");
const i18nExtra = read("app/editor-assets/i18n-extra.js");
const installer = read("installer/PDF-Ignova-Pro.iss");

assert.equal(packageJson.version, "1.9.9");
assert.match(editor, /page-overview-strip/);
assert.match(editor, /nextViewZoom/);
assert.match(editor, /pageNumberDraft/);
assert.match(editor, /panel-mode-switch/);
assert.match(editor, /dual-organizer/);
assert.match(editor, /application\/x-pdf-ignova-pages/);
assert.match(editor, /children: "Tapado"/);
assert.doesNotMatch(
  editor.slice(editor.indexOf('className: "toolbar"'), editor.indexOf('className: `stage')),
  /Tapado blanco|Tapado negro/,
);
assert.match(editor, /blendMode:\s*Y\.type === "highlight"/);
assert.match(editor, /innerText \|\| ""/);
assert.match(editor, /fontFamily: n\.font/);
assert.match(preload, /savePdfAs/);
assert.match(main, /ipcMain\.handle\("save-pdf-as"/);
assert.match(main, /writeFileSafely/);
assert.match(css, /\.mark\.highlight[\s\S]*mix-blend-mode: multiply/);
assert.match(css, /\.mark\.text \.text-editor/);
assert.match(i18nExtra, /\["2 paneles", "2 panes"/);
assert.match(i18nExtra, /\["Tapado", "Cover"/);
assert.match(installer, /PDF-Ignova-Pro-1\.9\.9-Setup-Windows-x64-unsigned/);
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.9.txt")));
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.9_MAC.txt")));

console.log("version 1.9.9 smoke test passed");
