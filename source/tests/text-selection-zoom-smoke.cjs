const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const helpers = require(path.join(
  root,
  "app/editor-assets/text-selection-utils.js",
));

assert.equal(
  helpers.normalizeSelectedText("  Texto\u00a0grande\r\n\r\n\r\nseleccionado  "),
  "Texto grande\n\nseleccionado",
);
assert.equal(helpers.nextZoom(82, 1), 100);
assert.equal(helpers.nextZoom(240, 1), 250);
assert.equal(helpers.nextZoom(400, 1), 500);
assert.equal(helpers.nextZoom(500, 1), 500);
assert.equal(helpers.nextZoom(20, -1), 20);
assert.equal(helpers.clampZoom(900), 500);
assert.equal(helpers.nextViewZoom(20, 1, 64, 112), 64);
assert.equal(helpers.nextViewZoom(64, 1, 64, 112), 112);
assert.equal(helpers.nextViewZoom(112, 1, 64, 112), 125);
assert.equal(helpers.nextViewZoom(112, -1, 64, 112), 64);

const layer = {
  nodeType: 1,
  matches: selector => selector === ".pdf-text-layer",
  contains: node => node === layer || node === textSpan || node === textNode,
};
const textSpan = {
  nodeType: 1,
  parentElement: layer,
  matches: () => false,
};
const textNode = { nodeType: 3, parentElement: textSpan };
const fakeDocument = {
  getSelection: () => ({
    anchorNode: textNode,
    focusNode: textNode,
    isCollapsed: false,
    rangeCount: 1,
    toString: () => "Primer párrafo\u00a0seleccionado",
  }),
};
assert.equal(
  helpers.readPdfSelection(fakeDocument),
  "Primer párrafo seleccionado",
);

const editor = fs.readFileSync(
  path.join(root, "app/editor-assets/editor-entry.js"),
  "utf8",
);
const html = fs.readFileSync(path.join(root, "app/editor.html"), "utf8");
const css = fs.readFileSync(
  path.join(root, "app/editor-assets/editor-ui-v16.css"),
  "utf8",
);

assert.match(html, /text-selection-utils\.js/);
assert.match(editor, /Copiar texto seleccionado/);
assert.match(editor, /Seleccionar texto/);
assert.match(editor, /onClick: activateNativeTextSelection/);
assert.match(editor, /W === "select" \|\| W === "modify-text"/);
assert.match(editor, /if \(editingText\) \{/);
assert.match(editor, /setSelectedKeys\(new Set\(\[i\.key\]\)\), onSelection\?\.\(i\.text\)\)/);
assert.match(editor, /Arrastra sobre texto o marca una zona de la página/);
assert.match(editor, /readPdfSelection/);
assert.match(editor, /max: "500"/);
assert.match(editor, /min: "20"/);
assert.match(editor, /page-overview-strip/);
assert.match(css, /\.pdf-text-hit::selection/);

console.log("native text selection and extended zoom smoke test passed");
