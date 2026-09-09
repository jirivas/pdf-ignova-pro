"use strict";

const assert = require("node:assert/strict");
const {
  PRODUCT_MAJOR_VERSION,
  normalizeMachineCode,
  validateLicenseObject,
} = require("../license-core.cjs");

assert.equal(PRODUCT_MAJOR_VERSION, 1);
assert.equal(
  normalizeMachineCode("0123456789abcdef0123"),
  "01234-56789-ABCDE-F0123",
);
assert.equal(normalizeMachineCode("invalid"), "");
assert.equal(validateLicenseObject(null, "01234-56789-ABCDE-F0123").ok, false);
assert.equal(validateLicenseObject({ payload: {}, signature: "x" }, "01234-56789-ABCDE-F0123").ok, false);

console.log("license core smoke test passed");
