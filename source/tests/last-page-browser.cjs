"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");

function createStaticServer() {
  return http.createServer((request, response) => {
    const requestPath = decodeURIComponent(request.url.split("?")[0]);
    const file = path.join(root, requestPath);
    if (!file.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end();
      return;
    }
    try {
      const contentType = /\.m?js$/.test(file)
        ? "text/javascript"
        : file.endsWith(".css")
          ? "text/css"
          : file.endsWith(".png")
            ? "image/png"
            : "text/html";
      response.setHeader("Content-Type", contentType);
      response.end(fs.readFileSync(file));
    } catch {
      response.writeHead(404).end();
    }
  });
}

(async () => {
  const { chromium } = await import(process.env.IGNOVA_PLAYWRIGHT || "playwright");
  const server = createStaticServer();
  let browser;

  try {
    await new Promise(resolve => server.listen(37070, "127.0.0.1", resolve));
    browser = await chromium.launch({
      headless: true,
      executablePath: process.env.IGNOVA_BROWSER_PATH || undefined,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage({
      viewport: { width: 1400, height: 900 },
      locale: "es-ES",
    });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => {
      if (message.type() === "error") console.log("BROWSER", message.text());
    });

    await page.addInitScript(() => {
      const originalError = console.error.bind(console);
      console.error = (...values) => originalError(
        ...values.map(value => value instanceof Error
          ? { name: value.name, message: value.message, stack: value.stack, code: value.code }
          : value),
      );
    });
    await page.goto("http://127.0.0.1:37070/app/editor.html");
    let fixture = process.env.IGNOVA_LAST_PAGE_FIXTURE;
    if (!fixture) {
      const bytes = await page.evaluate(async () => {
        const { PDFDocument, StandardFonts, rgb } = await import(
          "./editor-assets/chunks/es-4HSNR7QU.js"
        );
        const document = await PDFDocument.create();
        const font = await document.embedFont(StandardFonts.Helvetica);
        for (let pageNumber = 1; pageNumber <= 16; pageNumber += 1) {
          const isLastPage = pageNumber === 16;
          const pdfPage = document.addPage(
            isLastPage ? [841.89, 1190.55] : [595.28, 841.89],
          );
          pdfPage.drawText(`Pagina ${pageNumber}${isLastPage ? " - A3" : " - A4"}`, {
            x: 48,
            y: pdfPage.getHeight() - 72,
            size: 24,
            font,
            color: rgb(0.12, 0.12, 0.12),
          });
        }
        return Array.from(await document.save());
      });
      fixture = {
        name: "15-a4-plus-1-a3.pdf",
        mimeType: "application/pdf",
        buffer: Buffer.from(bytes),
      };
      assert.ok(bytes.length > 1_000, "generated PDF bytes must not be empty");
      assert.equal(fixture.buffer.length, bytes.length, "fixture buffer must preserve all bytes");
      console.log("MIXED-SIZE FIXTURE", `${fixture.buffer.length} bytes`);
    }
    await page.locator("input[type=file]").first().setInputFiles(fixture);
    for (let attempt = 0; attempt < 24; attempt += 1) {
      const count = await page.locator(".thumb").count();
      if (count === 16) break;
      if (attempt % 2 === 0) {
        const state = await page.evaluate(() => ({
          thumbnails: document.querySelectorAll(".thumb").length,
          summary: document.querySelector(".summary")?.textContent || "",
          status: document.querySelector(".status")?.textContent || "",
          notice: document.querySelector(".toast,.notice")?.textContent || "",
        }));
        console.log("WAITING FOR THUMBNAILS", JSON.stringify(state));
      }
      await page.waitForTimeout(5_000);
    }
    assert.equal(await page.locator(".thumb").count(), 16, "all thumbnails must load");

    const thumbnails = page.locator(".thumb");
    const selectedIndexes = async () => thumbnails.evaluateAll(items =>
      items.flatMap((item, index) => item.classList.contains("selected") ? [index] : []),
    );
    const startBox = await thumbnails.nth(1).boundingBox();
    const middleBox = await thumbnails.nth(2).boundingBox();
    const endBox = await thumbnails.nth(3).boundingBox();
    await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(middleBox.x + middleBox.width / 2, middleBox.y + middleBox.height / 2);
    await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2);
    await page.mouse.up();
    assert.deepEqual(await selectedIndexes(), [1, 2, 3], "mouse drag selects a continuous page range");
    await thumbnails.nth(2).click({ modifiers: ["Control"] });
    assert.deepEqual(await selectedIndexes(), [1, 3], "Ctrl toggles one page without losing the group");
    await thumbnails.nth(0).click();
    await thumbnails.nth(3).click({ modifiers: ["Shift"] });
    assert.deepEqual(await selectedIndexes(), [0, 1, 2, 3], "Shift selects from the Excel-style anchor");

    const pageNumber = page.locator('.status input[type="number"]');
    await pageNumber.fill("16");
    await pageNumber.press("Enter");
    await page.waitForFunction(
      () => document.querySelector(".thumb.selected")?.dataset.pageId ===
        document.querySelectorAll(".thumb")[15]?.dataset.pageId,
    );
    await page.locator(".pagestage canvas").waitFor();
    await page.waitForFunction(() => {
      const canvas = document.querySelector(".pagestage canvas");
      return canvas?.dataset.rendered === "true" && canvas.height > canvas.width;
    });

    const lastThumbnailIsVisible = await page.locator(".thumb").nth(15).evaluate(element => {
      const thumbnail = element.getBoundingClientRect();
      const panel = element.closest(".thumbs").getBoundingClientRect();
      return thumbnail.top >= panel.top - 1 && thumbnail.bottom <= panel.bottom + 1;
    });
    assert.equal(lastThumbnailIsVisible, true, "last thumbnail must scroll into view");
    assert.equal(await pageNumber.inputValue(), "16");
    assert.deepEqual(errors, []);
    console.log("All 16 pages loaded; the mixed-size last page rendered and is visible.");
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
