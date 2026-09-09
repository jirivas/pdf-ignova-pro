"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relativePath => fs.readFileSync(path.join(root, relativePath), "utf8");
const packageJson = JSON.parse(read("package.json"));
const main = read("main.cjs");
const license = read("commercial-license.cjs");
const preload = read("preload.cjs");
const editor = read("app/editor-assets/editor-entry.js");
const infoPlist = read("macos/Info.plist");
const ocrHelper = read("scripts/ocr-macos.swift");
const tiffHelper = read("scripts/convert-tiff-macos.swift");
const buildHelpers = read("scripts/build-macos-helpers.sh");

assert.match(packageJson.description, /Windows y macOS/);
assert.match(packageJson.scripts["package:mac"], /--platform=darwin/);
assert.match(packageJson.scripts["package:mac"], /--arch=universal/);
assert.match(packageJson.scripts["package:mac"], /--asar\.unpackDir=scripts/);
assert.match(packageJson.scripts["package:mac"], /--extend-info=macos\/Info\.plist/);
assert.match(main, /process\.platform === "darwin"/);
assert.match(main, /bundledScript\("ocr-macos"\)/);
assert.match(main, /bundledScript\("convert-tiff-macos"\)/);
assert.match(main, /macOS Vision/);
assert.match(license, /IOPlatformUUID/);
assert.match(license, /process\.platform === "darwin"/);
assert.match(preload, /platform: process\.platform/);
assert.match(editor, /window\.pdfEstudio\?\.platform === "darwin"/);
assert.match(editor, /⌘ C/);
assert.match(infoPlist, /com\.adobe\.pdf/);
assert.match(infoPlist, /LSMinimumSystemVersion/);
assert.match(ocrHelper, /VNRecognizeTextRequest/);
assert.match(ocrHelper, /automaticallyDetectsLanguage/);
assert.match(tiffHelper, /CGImageSourceGetCount/);
assert.match(buildHelpers, /x86_64-apple-macos12\.0/);
assert.match(buildHelpers, /arm64-apple-macos12\.0/);
assert.match(buildHelpers, /lipo -create/);

console.log("macOS platform smoke test passed");
