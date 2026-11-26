/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const jsx = require("react/jsx-runtime");
const { renderToStaticMarkup } = require("react-dom/server");
const load = require("./helpers/loadSource.cjs");
const api = load("src/features/jobs/api/fetchJobLeads.ts", {
  axios: { isAxiosError: (error) => error?.isAxiosError === true },
  "@/lib/axiosInstance": { axiosInstance: {} },
});
const error = (status, message) => ({ isAxiosError: true, response: { status, data: { message } } });
const basicError = error(400, "Basic subscription does not include the ability to fetch leads.");

test("Basic plan's 400 response is a subscription gate, while unrelated errors remain errors", () => {
  assert.equal(api.isJobLeadsSubscriptionError(basicError), true);
  for (const status of [402, 403]) assert.equal(api.isJobLeadsSubscriptionError(error(status, "Subscription required")), true);
  assert.equal(api.isJobLeadsSubscriptionError(error(400, "Invalid page")), false);
  assert.equal(api.isJobLeadsSubscriptionError(error(401, basicError.response.data.message)), false);
  assert.equal(api.isJobLeadsSubscriptionError(new Error("Network failure")), false);
});

test("restricted Leads tab explains Basic access and connects Upgrade Plan to the existing callback", () => {
  let upgrades = 0;
  const subscribe = () => upgrades++;
  const panel = load("src/features/jobs/components/LeadsPanel/LeadsPanel.tsx", {
    react: React, "react/jsx-runtime": jsx,
    "@/components/atoms/Button/Button": { default: ({ children, onClick }) => { assert.equal(onClick, subscribe); return React.createElement("button", { onClick }, children); } },
    "../ManageJobsPanel/ManageJobsTable/ManageJobsTable": { default: () => { throw new Error("Should show subscription message rather than an empty table"); } },
    "@/components/molecules/PaginationPanel/PaginationPanel": { default: () => null },
    "../../hooks/useGetJobLeads": { useGetJobLeads: () => ({ error: basicError, isError: true }) },
    "../../helpers/jobLeads": { mapJobLeadRow: (row) => row },
    "../../api/fetchJobLeads": api,
    "./leadsColumns": { leadsColumns: [] },
    "next/image": { default: ({ src, alt }) => React.createElement("img", { src, alt }) },
  }).default;
  const html = renderToStaticMarkup(React.createElement(panel, { category: "jobs", search: "", page: 1, onPageChange() {}, onSubscribe: subscribe }));
  assert.ok(html.includes("Your Basic plan doesn’t include job leads."));
  assert.ok(html.includes("Upgrade Plan"));
  assert.ok(!html.includes("Try again"));
  subscribe();
  assert.equal(upgrades, 1);
});
