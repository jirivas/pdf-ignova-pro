"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const helpers = require(path.join(
  root,
  "app/editor-assets/text-edit-utils.js",
));

const items = [
  { key: "c", text: "segunda", left: 0, top: 16, width: 42, height: 10 },
  { key: "a", text: "Primer", left: 0, top: 0, width: 34, height: 10 },
  { key: "d", text: "Tercero", left: 0, top: 46, width: 38, height: 10 },
  { key: "b", text: "párrafo", left: 39, top: 1, width: 43, height: 10, hasEOL: true },
];

const range = helpers.createTextRange(items, "a", "d");
assert.deepEqual(range.keys, ["a", "b", "c", "d"]);
assert.equal(range.text, "Primer párrafo\nsegunda\n\nTercero");

function makePixels(width, height, background, foreground) {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const color = x >= 4 && x <= 7 && y >= 2 && y <= 5
        ? foreground
        : background;
      data[offset] = color[0];
      data[offset + 1] = color[1];
      data[offset + 2] = color[2];
      data[offset + 3] = 255;
    }
  }
  return data;
}

let appearance = helpers.estimateAppearance(
  makePixels(12, 8, [240, 220, 200], [18, 35, 70]),
  12,
  8,
);
assert.equal(appearance.backgroundColor, "#f0dcc8");
assert.equal(appearance.textColor, "#122346");
assert.equal(appearance.uniformBackground, true);

appearance = helpers.estimateAppearance(
  makePixels(12, 8, [20, 45, 100], [250, 250, 250]),
  12,
  8,
);
assert.equal(appearance.backgroundColor, "#142d64");
assert.equal(appearance.textColor, "#fafafa");

const editor = fs.readFileSync(
  path.join(root, "app/editor-assets/editor-entry.js"),
  "utf8",
);
const html = fs.readFileSync(path.join(root, "app/editor.html"), "utf8");
const css = fs.readFileSync(
  path.join(root, "app/editor-assets/editor-ui-v16.css"),
  "utf8",
);

assert.match(html, /text-edit-utils\.js/);
assert.match(editor, /createTextRange/);
assert.match(editor, /captureTextAppearance/);
assert.match(editor, /backgroundPatchData/);
assert.match(editor, /sourceFontKey/);
assert.match(editor, /No se pudo reutilizar la fuente incrustada del PDF/);
assert.match(editor, /n\.textDirty \|\| n\.styleDirty \|\| zl === n\.id/);
assert.match(editor, /className: `merge-pdf-button/);
assert.match(editor, /children: "Unir archivos"/);
assert.match(editor, /pagePanelOpen/);
assert.match(editor, /mergePanelOpen/);
assert.match(editor, /className: "single-page-organizer"/);
assert.match(editor, /className: "merge-file-dropzone"/);
assert.match(editor, /n === "combine"/);
assert.match(editor, /PDF combinado\.pdf/);
assert.match(editor, /zoomWheelAnchor/);
assert.match(editor, /contentX: s\.scrollLeft \+ offsetX/);
assert.match(editor, /addEventListener\("wheel", handleWheel, \{ passive: !1 \}\)/);
assert.doesNotMatch(editor, /onWheel: mx/);
assert.match(editor, /selectOrganizerPage/);
assert.match(editor, /event\.ctrlKey \|\| event\.metaKey/);
assert.match(editor, /\$\{isSelected \? "selected" : ""\}/);
assert.match(css, /\.pdf-text-hit\.pdf-text-selected/);
assert.match(
  css,
  /\.mark\.text\.pdf-text-edit\.pdf-text-pristine\.chosen \.text-editor\s*\{\s*color:\s*inherit/,
);
assert.match(css, /\.merge-pdf-button/);
assert.match(css, /\.single-page-organizer/);
assert.match(css, /\.merge-workspace/);
assert.match(css, /\.dual-page-card\.selected/);

console.log("text editing fidelity and paragraph selection smoke test passed");
