"use strict";

const assert = require("node:assert/strict");
const { PDFDocument, PDFName, PDFString, StandardFonts, degrees } = require("pdf-lib");
const { fitPdfToPaper, paperSizePoints } = require("../print-paper.cjs");

const tolerance = 0.02;
const near = (actual, expected) => Math.abs(actual - expected) < tolerance;

(async () => {
  const source = await PDFDocument.create();
  const font = await source.embedFont(StandardFonts.Helvetica);
  const landscapeSource = source.addPage([400, 200]);
  landscapeSource.drawText("Landscape", { x: 20, y: 20, font });
  const linkReference = source.context.register(source.context.obj({
    Type: "Annot",
    Subtype: "Link",
    Rect: [10, 10, 50, 30],
    Border: [0, 0, 0],
    A: { S: "URI", URI: PDFString.of("https://example.com") },
  }));
  landscapeSource.node.set(PDFName.of("Annots"), source.context.obj([linkReference]));
  source.addPage([200, 400]);
  const rotated = source.addPage([200, 400]);
  rotated.drawText("Rotated", { x: 20, y: 20, font });
  rotated.setRotation(degrees(90));
  const input = Buffer.from(await source.save());

  const unchanged = await fitPdfToPaper(input, "original");
  assert.ok(unchanged.equals(input), "Original paper option must preserve bytes");

  for (const format of ["A2", "A1"]) {
    const outputBytes = await fitPdfToPaper(input, format);
    const output = await PDFDocument.load(outputBytes);
    assert.equal(output.getPageCount(), 3);
    const [portraitWidth, portraitHeight] = paperSizePoints(format);
    const [landscape, portrait, rotatedLandscape] = output.getPages();
    assert.ok(near(landscape.getWidth(), portraitHeight));
    assert.ok(near(landscape.getHeight(), portraitWidth));
    assert.ok(near(portrait.getWidth(), portraitWidth));
    assert.ok(near(portrait.getHeight(), portraitHeight));
    assert.equal(rotatedLandscape.getRotation().angle, 90);
    assert.ok(near(rotatedLandscape.getWidth(), portraitWidth));
    assert.ok(near(rotatedLandscape.getHeight(), portraitHeight));
    const annotations = landscape.node.Annots();
    assert.equal(annotations?.size(), 1, "Page annotation must be preserved");
    const annotation = output.context.lookup(annotations.get(0));
    const rectangle = annotation.lookup(PDFName.of("Rect"));
    const coordinates = rectangle.asArray().map((number) => number.asNumber());
    assert.ok(coordinates[0] > 0 && coordinates[1] > 0, "Annotation must be centred with the page content");
    assert.ok(coordinates[2] <= landscape.getWidth());
    assert.ok(coordinates[3] <= landscape.getHeight());
  }

  console.log("print paper smoke test passed");
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
