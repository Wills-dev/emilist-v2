/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const { serviceCredentials } = load("src/features/settings/helpers/serviceCredentials.ts");

function expiry(flag, expiryDate = "2028-11-30T00:00:00.000Z") {
  const sections = serviceCredentials({ certifications: [{ id: "cert", isCertificateExpire: flag, expiringDate: expiryDate }], memberships: [{ id: "member", isMembershipExpire: flag, endDate: expiryDate }], insurances: [] });
  return sections.slice(0, 2).map((section) => section.items[0].fields.at(-1).value);
}

test("false no-expiry flags display certification and membership dates", () => {
  for (const value of expiry(false)) assert.match(value, /30 Nov 2028/);
});

test("true no-expiry flags override stored dates", () => {
  assert.deepEqual(expiry(true), ["Doesn’t expire", "Ongoing"]);
});

test("missing or invalid expiry dates display N/A without claiming indefinite validity", () => {
  assert.deepEqual(expiry(false, ""), ["N/A", "N/A"]);
  assert.deepEqual(expiry(false, "invalid"), ["N/A", "N/A"]);
});
