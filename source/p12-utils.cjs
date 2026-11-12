"use strict";

const forge = require("node-forge");

function attributeValue(attributes, shortName) {
  const attribute = (attributes || []).find(item => item.shortName === shortName);
  return attribute?.value ? String(attribute.value) : "";
}

function inspectP12Buffer(input, passphrase = "") {
  const bytes = Buffer.isBuffer(input) ? input : Buffer.from(input || []);
  if (!bytes.length) {
    return {
      ok: false,
      code: "EMPTY_CERTIFICATE",
      message: "El archivo de certificado está vacío.",
    };
  }

  let asn1;
  try {
    const der = forge.util.createBuffer(bytes.toString("binary"));
    asn1 = forge.asn1.fromDer(der);
  } catch {
    return {
      ok: false,
      code: "INVALID_CERTIFICATE",
      message: "El archivo no es un certificado .P12 o .PFX válido.",
    };
  }

  let p12;
  try {
    p12 = forge.pkcs12.pkcs12FromAsn1(asn1, false, String(passphrase || ""));
  } catch {
    const passwordProvided = String(passphrase || "").length > 0;
    return {
      ok: false,
      code: passwordProvided ? "INVALID_PASSWORD" : "PASSWORD_REQUIRED",
      passwordRequired: true,
      message: passwordProvided
        ? "La contraseña del certificado no es correcta."
        : "Este certificado está protegido. Introduce su contraseña.",
    };
  }

  const certBags = p12.getBags({
    bagType: forge.pki.oids.certBag,
  })[forge.pki.oids.certBag] || [];
  const keyBags = [
    ...(p12.getBags({ bagType: forge.pki.oids.pkcs8ShroudedKeyBag })[
      forge.pki.oids.pkcs8ShroudedKeyBag
    ] || []),
    ...(p12.getBags({ bagType: forge.pki.oids.keyBag })[
      forge.pki.oids.keyBag
    ] || []),
  ];
  const certificate = certBags.find(bag => bag.cert)?.cert;
  if (!certificate || !keyBags.some(bag => bag.key)) {
    return {
      ok: false,
      code: "MISSING_PRIVATE_KEY",
      message: "El archivo no contiene un certificado y su clave privada.",
    };
  }

  const now = new Date();
  const validFrom = certificate.validity.notBefore;
  const validTo = certificate.validity.notAfter;
  const commonName = attributeValue(certificate.subject.attributes, "CN");
  const organization = attributeValue(certificate.subject.attributes, "O");
  const issuer = attributeValue(certificate.issuer.attributes, "CN") ||
    attributeValue(certificate.issuer.attributes, "O");

  return {
    ok: true,
    code: "VALID",
    passwordRequired: String(passphrase || "").length > 0,
    commonName,
    organization,
    issuer,
    serialNumber: certificate.serialNumber || "",
    validFrom: validFrom.toISOString(),
    validTo: validTo.toISOString(),
    expired: now > validTo,
    notYetValid: now < validFrom,
  };
}

module.exports = { inspectP12Buffer };
