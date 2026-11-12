"use strict";

const assert = require("node:assert/strict");
const forge = require("node-forge");
const { PDFDocument } = require("pdf-lib");
const { pdflibAddPlaceholder } = require("@signpdf/placeholder-pdf-lib");
const { P12Signer } = require("@signpdf/signer-p12");
const { SignPdf } = require("@signpdf/signpdf");
const { inspectP12Buffer } = require("../p12-utils.cjs");

const keys = forge.pki.rsa.generateKeyPair(1024);
const certificate = forge.pki.createCertificate();
certificate.publicKey = keys.publicKey;
certificate.serialNumber = "01";
certificate.validity.notBefore = new Date(Date.now() - 60_000);
certificate.validity.notAfter = new Date(Date.now() + 86_400_000);
certificate.setSubject([{ name: "commonName", value: "José Ignacio Prueba" }]);
certificate.setIssuer([{ name: "commonName", value: "IGNOVA Test CA" }]);
certificate.sign(keys.privateKey, forge.md.sha256.create());

const p12Asn1 = forge.pkcs12.toPkcs12Asn1(
  keys.privateKey,
  [certificate],
  "clave-correcta",
  { algorithm: "3des" },
);
const p12Bytes = Buffer.from(forge.asn1.toDer(p12Asn1).getBytes(), "binary");

const missingPassword = inspectP12Buffer(p12Bytes, "");
assert.equal(missingPassword.ok, false);
assert.equal(missingPassword.code, "PASSWORD_REQUIRED");

const wrongPassword = inspectP12Buffer(p12Bytes, "incorrecta");
assert.equal(wrongPassword.ok, false);
assert.equal(wrongPassword.code, "INVALID_PASSWORD");

const valid = inspectP12Buffer(p12Bytes, "clave-correcta");
assert.equal(valid.ok, true);
assert.equal(valid.commonName, "José Ignacio Prueba");
assert.equal(valid.issuer, "IGNOVA Test CA");
assert.equal(valid.expired, false);

(async () => {
  const document = await PDFDocument.create();
  const page = document.addPage([595.28, 841.89]);
  page.drawText("Documento de prueba para firma digital", { x: 50, y: 780 });
  pdflibAddPlaceholder({
    pdfDoc: document,
    pdfPage: page,
    reason: "Prueba automática",
    name: valid.commonName,
    location: "IGNOVA",
    contactInfo: "",
    widgetRect: [0, 0, 0, 0],
  });
  const prepared = Buffer.from(await document.save({ useObjectStreams: false }));
  const signer = new P12Signer(p12Bytes, { passphrase: "clave-correcta" });
  const signed = await new SignPdf().sign(prepared, signer);
  assert.equal(signed.length, prepared.length);
  assert.notDeepEqual(signed, prepared);
  assert.match(signed.toString("latin1"), /\/ByteRange\s*\[/);
  console.log("P12 inspection and cryptographic signing smoke test passed");
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
