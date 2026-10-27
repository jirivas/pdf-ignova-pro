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

const fakeCanvas = {
  width: 12,
  height: 8,
  clientWidth: 12,
  clientHeight: 8,
  getContext() {
    return {
      getImageData() {
        return {
          data: makePixels(12, 8, [255, 255, 255], [15, 15, 15]),
        };
      },
    };
  },
};
appearance = helpers.captureTextAppearance(fakeCanvas, {
  left: 0,
  top: 0,
  width: 12,
  height: 8,
  pageWidth: 12,
  pageHeight: 8,
});
assert.equal(appearance.backgroundColor, "#ffffff");
assert.equal(appearance.backgroundPatchData, null);

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
assert.match(editor, /backgroundPatchData: null/);
assert.doesNotMatch(editor, /backgroundImage: n\.backgroundPatchData/);
assert.match(editor, /sourceFontKey/);
assert.match(editor, /No se pudo reutilizar la fuente incrustada del PDF/);
assert.match(editor, /visibility: n\.replaceOriginal/);
assert.match(editor, /\[newTextDialog, setNewTextDialog\]/);
assert.match(editor, /className: "smallmodal new-text-modal"/);
assert.match(editor, /children: "Crear texto nuevo"/);
assert.match(editor, /if \(W === "text"\) \{/);
assert.match(editor, /setNewTextDialog\(\{/);
assert.match(editor, /editingText: W === "modify-text"/);
assert.match(editor, /contentEditable: n\.replaceOriginal \? W === "modify-text"/);
assert.match(editor, /pdf-text-replacement/);
assert.match(editor, /removeOriginalText/);
assert.match(editor, /Modificar texto existente/);
assert.match(editor, /Editar texto nuevo/);
assert.match(editor, /screenSelectionDrag/);
assert.match(editor, /screen-region-selection/);
assert.match(editor, /Texto creado en la posición elegida/);
assert.doesNotMatch(editor, /mark\.x = Ee\(mark\.x, 0, 1 - mark\.w\)/);
assert.match(editor, /!n\.replaceOriginal &&\s*\(0, d\.jsx\)\("span", \{\s*className: "text-drag"/);
assert.match(editor, /zl === n\.id &&\s*!n\.replaceOriginal &&\s*\(0, d\.jsx\)\("span", \{\s*className: "resize-handle"/);
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
assert.match(css, /\.mark\.text\.pdf-text-edit\.chosen\s*\{\s*outline:\s*0/);
assert.match(css, /\.mark\.text\.pdf-text-edit \.text-editor:focus/);
assert.match(css, /\.new-text-modal textarea/);
assert.match(css, /\.pdf-original-cover\s*\{[^}]*z-index:\s*1/s);
assert.match(css, /\.mark\.text\.pdf-text-edit \.pdf-text-replacement/);
assert.match(css, /\.screen-region-selection/);
assert.match(css, /\.marklayer > \.mark,[^}]*z-index:\s*2/s);
assert.match(css, /\.merge-pdf-button/);
assert.match(css, /\.single-page-organizer/);
assert.match(css, /\.merge-workspace/);
assert.match(css, /\.dual-page-card\.selected/);

console.log("text editing fidelity and paragraph selection smoke test passed");
