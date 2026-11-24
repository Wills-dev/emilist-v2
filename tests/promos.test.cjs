/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const loadSource = require("./helpers/loadSource.cjs");
const forms = loadSource("src/features/promos/helpers/promoForm.ts");
const normalize = loadSource("src/features/promos/helpers/normalizePromo.ts");
const now = Date.parse("2026-11-24T12:00:00Z");
const promo = { id: "promo-id", code: "SAVE20", discountPercentage: 20, expiryDate: "2026-12-31T23:59:59Z", isActive: true, isSingleUse: false, useCount: 2, products: [{ id: "a", name: "Cement" }, { id: "b", name: "Sand" }] };
const createForm = () => ({ ...forms.initialPromoForm("a"), discountPercentage: "20", expiryDate: "2026-12-31T23:59", productIds: ["a", "b"] });

test("new promos support generated or uppercase custom codes and multiple products", () => {
  const payload = forms.buildPromoPayload(createForm(), undefined, now);
  assert.equal(Object.hasOwn(payload, "code"), false);
  assert.deepEqual(payload.productIds, ["a", "b"]);
  assert.equal(payload.expiryDate, "2026-12-31T22:59:00.000Z");
  assert.equal(payload.isSingleUse, false);
  assert.equal(forms.buildPromoPayload({ ...createForm(), code: " save20 ", isSingleUse: true }, undefined, now).code, "SAVE20");
});

test("invalid codes, discounts, product counts and duplicate products are rejected", () => {
  for (const code of ["AB", "INVALID-CODE", "A".repeat(21)]) assert.throws(() => forms.buildPromoPayload({ ...createForm(), code }, undefined, now));
  for (const discountPercentage of ["", "0", "101", "NaN"]) assert.throws(() => forms.buildPromoPayload({ ...createForm(), discountPercentage }, undefined, now));
  for (const productIds of [[], ["a", "a"], Array.from({ length: 51 }, (_, i) => String(i)), [""]]) assert.throws(() => forms.buildPromoPayload({ ...createForm(), productIds }, undefined, now));
  assert.equal(forms.buildPromoPayload({ ...createForm(), discountPercentage: "100", productIds: Array.from({ length: 50 }, (_, i) => String(i)) }, undefined, now).productIds.length, 50);
});

test("expiry validation uses WAT and rejects past or impossible calendar dates", () => {
  assert.equal(forms.promoDateInput("2026-11-24T23:30:00Z"), "2026-11-25T00:30");
  for (const expiryDate of ["2026-11-24T12:00", "2026-02-31T23:59", "not-a-date"]) assert.throws(() => forms.buildPromoPayload({ ...createForm(), expiryDate }, undefined, now));
});

test("edits send changed fields only and never resend code or single-use settings", () => {
  const form = forms.initialPromoForm("a", promo);
  assert.throws(() => forms.buildPromoPayload(form, promo, now), /Make a change/);
  const payload = forms.buildPromoPayload({ ...form, code: "DIFFERENT", isSingleUse: true, discountPercentage: "25", productIds: ["b", "a"] }, promo, now);
  assert.deepEqual(payload, { discountPercentage: 25 });
  assert.deepEqual(forms.buildPromoPayload({ ...form, productIds: ["b"] }, promo, now), { productIds: ["b"] });
  assert.deepEqual(forms.buildPromoPayload({ ...form, isActive: false }, promo, now), { isActive: false });
});

test("expired promos can be edited or paused, but need a new expiry before reactivation", () => {
  const expired = { ...promo, expiryDate: "2026-01-01T12:00:00Z", isActive: false };
  const form = forms.initialPromoForm("a", expired);
  assert.deepEqual(forms.buildPromoPayload({ ...form, discountPercentage: "25" }, expired, now), { discountPercentage: 25 });
  assert.throws(() => forms.buildPromoPayload({ ...form, isActive: true }, expired, now), /future expiry/);
  const patch = forms.buildPromoPayload({ ...form, expiryDate: "2026-12-31T23:59", isActive: true }, expired, now);
  assert.deepEqual(patch, { expiryDate: "2026-12-31T22:59:00.000Z", isActive: true });
});

test("promo normalization supports populated products and product ID arrays", () => {
  const raw = { ...promo, _id: "promo-id", productIds: ["a", { _id: "b", name: "Sand", status: "inactive" }] };
  const result = normalize.normalizePromo(raw);
  assert.deepEqual(result.products.map((product) => product.id), ["a", "b"]);
  assert.equal(result.products[1].status, "inactive");
  assert.equal(normalize.normalizePromos({ promos: [raw] }).length, 1);
  assert.throws(() => normalize.normalizePromos({ unexpected: [] }));
  assert.equal(normalize.normalizePromoProducts({ products: [{ _id: "a", name: "Cement" }], pagination: { currentPage: 1, totalPages: 3 } }, 1).nextPage, 2);
  assert.equal(normalize.normalizePromoProducts({ products: [], totalPages: 1 }, 1).nextPage, undefined);
});

test("promo requests use authenticated shared client and correct CRUD endpoints", async () => {
  const calls = [];
  const raw = { ...promo, _id: "promo-id", productIds: ["a"] };
  const client = Object.fromEntries(["get", "post", "patch", "delete"].map((method) => [method, async (...args) => {
    calls.push([method, ...args]);
    return { data: { data: method === "get" ? [raw] : raw } };
  }]));
  const api = loadSource("src/features/promos/api/index.ts", { "@/lib/axiosInstance": { axiosInstance: client }, "../helpers/normalizePromo": normalize });
  const signal = new AbortController().signal;
  await api.fetchSellerPromos(signal);
  assert.deepEqual(calls.pop(), ["get", "/promo", { signal }]);
  const payload = forms.buildPromoPayload(createForm(), undefined, now);
  await api.createSellerPromo(payload);
  assert.deepEqual(calls.pop(), ["post", "/promo", payload]);
  await api.updateSellerPromo({ id: "promo/id", payload: { isActive: false } });
  assert.deepEqual(calls.pop(), ["patch", "/promo/promo%2Fid", { isActive: false }]);
  await api.deleteSellerPromo("promo/id");
  assert.deepEqual(calls.pop(), ["delete", "/promo/promo%2Fid"]);
});
