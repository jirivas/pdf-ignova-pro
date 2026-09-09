"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");
const packageJson = JSON.parse(read("package.json"));
const main = read("main.cjs");
const editor = read("app/editor-assets/editor-entry.js");
const html = read("app/editor.html");
const ocr = read("scripts/ocr-windows.ps1");
const installer = read("installer/PDF-Ignova-Pro.iss");

assert.equal(packageJson.version, "1.9.8");
assert.match(packageJson.scripts["package:windows"], /--asar\.unpackDir=scripts/);
assert.match(packageJson.scripts["package:windows"], /release-installer/);
assert.match(packageJson.scripts["package:mac"], /--arch=universal/);
assert.match(main, /app\.asar\.unpacked/);
assert.match(main, /runtime-scripts/);
assert.match(main, /open-external-link/);
assert.match(editor, /ocr-region/);
assert.match(editor, /window\.pdfEstudio\.ocrPage/);
assert.match(editor, /ocr-top-button/);
assert.doesNotMatch(
  editor.slice(editor.indexOf('className: "toolbar"'), editor.indexOf('className: "stage"')),
  /children: "OCR ventana"/,
);
assert.match(editor, /Nuevo PDF en blanco/);
assert.match(editor, /595\.28, 841\.89/);
assert.match(editor, /link-choice-modal/);
assert.match(editor, /Copiar texto seleccionado/);
assert.match(html, /i18n-extra\.js/);
assert.match(html, /link-utils\.js/);
assert.match(html, /text-selection-utils\.js/);
assert.match(
  ocr,
  /OpenAsync\(\[Windows\.Storage\.FileAccessMode\]::Read\)\) \(\[Windows\.Storage\.Streams\.IRandomAccessStream\]\)/,
);
assert.match(installer, /Uninstallable=yes/);
assert.match(installer, /PDF-Ignova-Pro-1\.9\.8-Setup-Windows-x64-unsigned/);
assert.match(installer, /\{uninstallexe\}/);
assert.ok(fs.existsSync(path.join(root, "app", "flags", "zh.svg")));
assert.ok(fs.existsSync(path.join(root, "app", "flags", "ms.svg")));
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.8.txt")));
assert.ok(fs.existsSync(path.join(root, "CAMBIOS_v1.9.8_MAC.txt")));
assert.ok(fs.existsSync(path.join(root, "scripts", "ocr-macos.swift")));
assert.ok(fs.existsSync(path.join(root, "scripts", "convert-tiff-macos.swift")));
assert.ok(fs.existsSync(path.join(root, "macos", "Info.plist")));

console.log("version 1.9.8 smoke test passed");
