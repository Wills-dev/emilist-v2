/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const { recurringJobAction } = load("src/features/jobs/helpers/recurringJobAction.ts");
const recurring = { jobUrgency: "regularly", endDate: "2027-12-31T00:00:00.000Z" };

test("ongoing recurring jobs never show conversion or renewal", () => {
  assert.equal(recurringJobAction(recurring, new Date("2026-11-27T06:00:00Z")), null);
  assert.equal(recurringJobAction(recurring, new Date("2027-12-31T22:59:59Z")), null);
});

test("recurring jobs show renewal after the end date in Lagos time", () => {
  assert.equal(recurringJobAction(recurring, new Date("2027-12-31T23:00:00Z")), "renew");
  assert.equal(recurringJobAction(recurring, new Date("2028-01-02T06:00:00Z")), "renew");
});

test("unknown end dates cannot imply expiry, and nonrecurring jobs retain conversion", () => {
  for (const endDate of [undefined, "", "invalid"]) assert.equal(recurringJobAction({ jobUrgency: "regularly", endDate }), null);
  assert.equal(recurringJobAction({ jobUrgency: "right_now" }), "convert");
  assert.equal(recurringJobAction({ jobUrgency: "in_future" }), "convert");
});
