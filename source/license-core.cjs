const crypto = require("node:crypto");

const PRODUCT_ID = "IGNOVA.PDF_ESTUDIO_PRO";
const PRODUCT_MAJOR_VERSION = 1;
const LICENSE_SCHEMA_VERSION = 1;

const PUBLIC_KEY_PEM = `-----BEGIN PUBLIC KEY-----
MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEAwj03BnU2ZhuGGVsyx1p3
4RTWZjrX2oaImdiW89mt+lyQCl6d2/l2T33iRDzH8q1eKNZ0IaRgoDIG4CGyZqmh
wx8TcYNwwHJtk3+49uvJJc5x+jHV3beozibIAh7lXQX6+wd6DNSHHvGC8XicJdzV
MZRoecMhU/wasSaENdSrdJhv9Q6wgAv4+A3r0dX4FGxbOWJr5XVBDo9oIsPdt0yn
HJVlXxhLMNkCWxVfHzxphUKjkrXvd+mE4DfrQnfD/FZBQu5etRjm1UUtLna+N/rJ
esO58zKSoVzDWlGddu27DotwmzAJFqGt9Q7iYhbV6FmuBJ2nvw9BN8KJ9oTaqPs7
rDS0g5685GOfncyVl3AIn55lcr2o308g7gWJ6bt5EGzFjNyIwJ2N0xJzsthHw1Hr
7eevpBV08y+2pTKVUoErk0exoM96q1O1qQXcOAejMJtxAUIgmjbASvNqB/8wANAB
cPS3F/hzOc1A4CYbqrrdqiKTjoG0HIqbIvpP9IDJ9nTBAgMBAAE=
-----END PUBLIC KEY-----`;

function normalizeMachineCode(value) {
  const compact = String(value || "")
    .toUpperCase()
    .replace(/[^A-F0-9]/g, "")
    .slice(0, 20);
  if (compact.length !== 20) return "";
  return compact.match(/.{1,5}/g).join("-");
}

function failure(reason) {
  return { ok: false, reason };
}

function validateLicenseObject(document, machineCode, now = new Date()) {
  if (!document || typeof document !== "object" || Array.isArray(document)) {
    return failure("El archivo de licencia no contiene un documento válido.");
  }
  const { payload, signature } = document;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return failure("La licencia no contiene los datos firmados.");
  }
  if (typeof signature !== "string" || !/^[A-Za-z0-9+/=]+$/.test(signature)) {
    return failure("La firma digital de la licencia no es válida.");
  }
  if (payload.schema !== LICENSE_SCHEMA_VERSION || payload.product !== PRODUCT_ID) {
    return failure("La licencia pertenece a otro producto o formato.");
  }
  if (payload.versionMajor !== PRODUCT_MAJOR_VERSION) {
    return failure("La licencia no corresponde a esta versión principal del programa.");
  }
  if (typeof payload.licenseId !== "string" || !/^PEP-[A-Z0-9-]{8,40}$/.test(payload.licenseId)) {
    return failure("El identificador de la licencia no es válido.");
  }
  if (typeof payload.customer !== "string" || payload.customer.trim().length < 2 || payload.customer.length > 160) {
    return failure("La licencia no identifica correctamente a su titular.");
  }
  const normalizedExpectedMachine = normalizeMachineCode(machineCode);
  const normalizedLicensedMachine = normalizeMachineCode(payload.machineCode);
  if (!normalizedExpectedMachine || normalizedLicensedMachine !== normalizedExpectedMachine) {
    return failure("La licencia fue emitida para otro equipo.");
  }
  if (!Number.isInteger(payload.seatCount) || payload.seatCount < 1 || payload.seatCount > 1000) {
    return failure("El número de puestos de la licencia no es válido.");
  }
  if (payload.licenseType !== "perpetual" && payload.licenseType !== "term") {
    return failure("El tipo de licencia no es válido.");
  }
  const issuedAt = new Date(payload.issuedAt);
  if (!payload.issuedAt || Number.isNaN(issuedAt.getTime())) {
    return failure("La fecha de emisión de la licencia no es válida.");
  }
  if (issuedAt.getTime() > now.getTime() + 24 * 60 * 60 * 1000) {
    return failure("La fecha de emisión de la licencia es posterior a la fecha del equipo.");
  }
  if (payload.licenseType === "term") {
    if (typeof payload.expiresAt !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(payload.expiresAt)) {
      return failure("La fecha de vencimiento de la licencia no es válida.");
    }
    const expiresAt = new Date(`${payload.expiresAt}T23:59:59.999Z`);
    if (Number.isNaN(expiresAt.getTime()) || now.getTime() > expiresAt.getTime()) {
      return failure("La licencia ha vencido.");
    }
  } else if (payload.expiresAt !== null) {
    return failure("Una licencia perpetua no debe incluir fecha de vencimiento.");
  }

  let signatureBytes;
  try {
    signatureBytes = Buffer.from(signature, "base64");
  } catch {
    return failure("No se pudo interpretar la firma digital de la licencia.");
  }
  if (signatureBytes.length !== 384) {
    return failure("La firma digital tiene una longitud incorrecta.");
  }

  let verified = false;
  try {
    verified = crypto.verify(
      "sha256",
      Buffer.from(JSON.stringify(payload), "utf8"),
      PUBLIC_KEY_PEM,
      signatureBytes,
    );
  } catch {
    return failure("No se pudo verificar la firma digital de la licencia.");
  }
  if (!verified) return failure("La licencia ha sido modificada o no es auténtica.");

  return {
    ok: true,
    license: {
      id: payload.licenseId,
      customer: payload.customer.trim(),
      email: typeof payload.email === "string" ? payload.email.trim() : "",
      machineCode: normalizedLicensedMachine,
      type: payload.licenseType,
      seats: payload.seatCount,
      issuedAt: payload.issuedAt,
      expiresAt: payload.expiresAt,
    },
  };
}

module.exports = {
  LICENSE_SCHEMA_VERSION,
  PRODUCT_ID,
  PRODUCT_MAJOR_VERSION,
  PUBLIC_KEY_PEM,
  normalizeMachineCode,
  validateLicenseObject,
};
