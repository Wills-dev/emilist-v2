/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const jsx = require("react/jsx-runtime");
const load = require("./helpers/loadSource.cjs");
const helper = load("src/lib/helpers/shortenIdentifier.ts");
const Badge = load("src/components/atoms/IdentifierBadge/IdentifierBadge.tsx", {
  react: { useState: () => [false, () => {}] },
  "react/jsx-runtime": jsx,
  "lucide-react": { Copy: () => null, Check: () => null },
  "@/lib/helpers/shortenIdentifier": helper,
}).default;

test("long IDs show first four and last four characters, while short IDs remain intact", () => {
  assert.equal(helper.shortenIdentifier("6b072bf69d46eb98c0350668"), "6b07…0668");
  assert.equal(helper.shortenIdentifier("e27934"), "e27934");
  assert.equal(helper.shortenIdentifier("123456789"), "123456789");
  assert.equal(Badge({ value: "person@example.com", shorten: false }).props.children[1].props.children, "person@example.com");
});

test("shortened ID keeps the full hover value and copies the original ID", async () => {
  const value = "6b072bf69d46eb98c0350668";
  const badge = Badge({ label: "Job ID", value });
  const display = badge.props.children[1];
  assert.equal(display.props.title, value);
  assert.equal(display.props.children, "6b07…0668");
  const previousNavigator = Object.getOwnPropertyDescriptor(global, "navigator");
  const previousTimeout = global.setTimeout;
  let copied;
  try {
    Object.defineProperty(global, "navigator", { configurable: true, value: { clipboard: { writeText: async (text) => { copied = text; } } } });
    global.setTimeout = () => 0;
    await badge.props.children[2].props.onClick();
    assert.equal(copied, value);
  } finally {
    global.setTimeout = previousTimeout;
    if (previousNavigator) Object.defineProperty(global, "navigator", previousNavigator); else delete global.navigator;
  }
});
