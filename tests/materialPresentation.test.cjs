/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const metrics = load("src/lib/helpers/pluralizeQuantityMetric.ts");
const { pluralizeQuantityMetric: format } = metrics;

test("quantity metrics handle singular, plural, irregular and abbreviated units", () => {
  for (const [quantity, unit, expected] of [
    [1, "Bag", "Bag"], [2, "Bag", "Bags"], [2, "box", "boxes"],
    [3, "Cubic Foot", "Cubic Feet"], [1, "Cubic Feet", "Cubic Foot"],
    [3, "bags", "bags"], [1, "bags", "bag"], [2, "kg", "kg"],
    [2, "m²", "m²"], [2, "dozen", "dozen"], [0, "Bag", "Bag"],
  ]) assert.equal(format(quantity, unit), expected);
});

test("plural dropdown labels preserve metric values sent to the API", () => {
  const { quantityMetrics, quantityMetricOptions } = load("src/lib/constants/qunatityUnits.ts", {
    "@/lib/helpers/pluralizeQuantityMetric": metrics,
  });
  assert.deepEqual(quantityMetricOptions(5).map((item) => item.value), quantityMetrics.map((item) => item.value));
  assert.equal(quantityMetricOptions(5).find((item) => item.value === "Box").label, "Boxes");
  assert.equal(quantityMetricOptions(1).find((item) => item.value === "Box").label, "Box");
});

test("promo eligibility accepts active status casing and retains inactive/deleted restrictions", () => {
  const { promoProductUnavailableReason: reason } = load("src/features/promos/helpers/promoProductEligibility.ts");
  for (const status of [undefined, "active", "Active", " ACTIVE "]) assert.equal(reason({ id: "a", name: "Box", status }), undefined);
  assert.match(reason({ id: "a", name: "Box", status: "inactive" }), /Only active/);
  assert.match(reason({ id: "a", name: "Box", status: "active", isDeleted: true }), /deleted/);
});
