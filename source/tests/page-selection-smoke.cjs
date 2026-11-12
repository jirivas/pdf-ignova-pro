"use strict";

const assert = require("node:assert/strict");
const {
  rangeIds,
  clickSelection,
  dragSelection,
} = require("../app/editor-assets/page-selection-utils.js");

const pages = ["p1", "p2", "p3", "p4", "p5", "p6"];

assert.deepEqual(rangeIds(pages, 4, 1), ["p2", "p3", "p4", "p5"]);
assert.deepEqual([...clickSelection(["p1"], pages, 3)], ["p4"]);
assert.deepEqual(
  [...clickSelection(["p1"], pages, 3, { shift: true, anchorIndex: 1 })],
  ["p2", "p3", "p4"],
);
assert.deepEqual(
  [...clickSelection(["p1", "p2"], pages, 1, { additive: true })],
  ["p1"],
);
assert.deepEqual(
  [...dragSelection(["p1"], pages, 2, 4, true)],
  ["p1", "p3", "p4", "p5"],
);
assert.deepEqual([...dragSelection([], pages, 4, 2)], ["p3", "p4", "p5"]);

console.log("Excel-style page selection smoke test passed");
