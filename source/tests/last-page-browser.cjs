"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const os = require("node:os");
const path = require("node:path");
const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");

const root = path.resolve(__dirname, "..");

async function createFixture() {
  const tempDirectory = fs.mkdtempSync(path.join(os.tmpdir(), "ignova-last-page-"));
  const fixture = path.join(tempDirectory, "15-a4-plus-1-a3.pdf");
  const document = await PDFDocument.create();
  const font = await document.embedFont(StandardFonts.Helvetica);

  for (let pageNumber = 1; pageNumber <= 16; pageNumber += 1) {
    const isLastPage = pageNumber === 16;
    const page = document.addPage(isLastPage ? [841.89, 1190.55] : [595.28, 841.89]);
    page.drawText(`Pagina ${pageNumber}${isLastPage ? " - A3" : " - A4"}`, {
      x: 48,
      y: page.getHeight() - 72,
      size: 24,
      font,
      color: rgb(0.12, 0.12, 0.12),
    });
  }

  fs.writeFileSync(fixture, await document.save());
  return { fixture, tempDirectory };
}

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
  const generated = process.env.IGNOVA_LAST_PAGE_FIXTURE ? null : await createFixture();
  const fixture = process.env.IGNOVA_LAST_PAGE_FIXTURE || generated.fixture;
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

    await page.goto("http://127.0.0.1:37070/app/editor.html");
    await page.locator("input[type=file]").first().setInputFiles(fixture);
    await page.waitForFunction(() => document.querySelectorAll(".thumb").length === 16);
    assert.equal(await page.locator(".thumb").count(), 16, "all thumbnails must load");

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
    if (generated) fs.rmSync(generated.tempDirectory, { recursive: true, force: true });
  }
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
