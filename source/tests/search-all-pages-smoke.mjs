import assert from "node:assert/strict";
import { buildPageSearchMatches } from "../app/editor-assets/search-engine.mjs";

const viewport = {
  width: 600,
  height: 800,
  scale: 1,
  transform: [1, 0, 0, -1, 0, 800],
};

const makeText = (first, second) => ({
  items: [
    { str: first, transform: [12, 0, 0, 12, 40, 740], width: 90, dir: "ltr" },
    { str: second, transform: [12, 0, 0, 12, 135, 740], width: 120, dir: "ltr" },
  ],
});

const pages = [
  buildPageSearchMatches({ textContent: makeText("Ignova", "PDF"), viewport, query: "ignova pdf", pageId: "p1", pageNumber: 0 }),
  buildPageSearchMatches({ textContent: makeText("otra", "página"), viewport, query: "ignova pdf", pageId: "p2", pageNumber: 1 }),
  buildPageSearchMatches({ textContent: makeText("PDF", "Ignova"), viewport, query: "pdf ignova", pageId: "p3", pageNumber: 2 }),
];

assert.equal(pages[0].length, 1);
assert.equal(pages[1].length, 0);
assert.equal(pages[2].length, 1);
assert.equal(pages[0][0].pageId, "p1");
assert.equal(pages[2][0].pageNumber, 2);
assert.ok(pages[0][0].rects.length >= 2, "A match spanning text items must highlight both parts");

console.log("search all pages smoke test passed");
