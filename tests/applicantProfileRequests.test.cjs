/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");

test("applicant profile uses a single business query and retries only that query", async () => {
  const requests = [];
  const queries = [];
  let retries = 0;
  const businessProfile = { business: { _id: "selected-business" } };
  const details = { expert: { id: "selected-business" } };
  const api = load("src/features/businesses/api/fetchBusinessProfile.ts", {
    "@/lib/axiosInstance": { axiosInstance: { get: async (...args) => { requests.push(args); return { data: { data: businessProfile.business } }; } } },
  });
  const business = load("src/features/businesses/hooks/useBusinessProfile.ts", {
    "@tanstack/react-query": { useQuery: (config) => { queries.push(config); return { data: businessProfile, isPending: false, isError: false, refetch: async () => retries++ }; } },
    "@/store/authStore": { useStore: (selector) => selector({ currentUser: { _id: "viewer" } }) },
    "../queries/businessKeys": load("src/features/businesses/queries/businessKeys.ts"),
    "../api/fetchBusinessProfile": api,
  });
  const expert = load("src/features/businesses/hooks/useExpertDetails.ts", {
    "./useBusinessProfile": business,
    "../helpers/mapBusinessExpertDetails": { mapBusinessExpertDetails: (profile) => { assert.equal(profile, businessProfile); return details; } },
  });
  const routes = load("src/lib/helpers/routes.ts");
  const { useApplicantProfile } = load("src/features/jobs/hooks/useApplicantProfile.ts", {
    "@/features/businesses/hooks/useExpertDetails": expert,
    "@/lib/helpers/routes": routes,
  });
  const result = useApplicantProfile("job-id", "selected-business", "active");
  assert.equal(queries.length, 1);
  assert.equal(queries[0].enabled, true);
  const signal = new AbortController().signal;
  await queries[0].queryFn({ signal });
  assert.deepEqual(requests, [["/business/fetch-single-business/selected-business", { params: { userId: "viewer" }, signal }]]);
  assert.equal(result.details, details);
  assert.equal(result.loading, false);
  assert.equal(result.error, false);
  assert.equal(result.backHref, routes.routes.dashboardLinks.jobApplicants("job-id", "active"));
  assert.equal(result.reviewsHref, routes.routes.dashboardLinks.jobApplicantReviews("job-id", "selected-business", "active"));
  result.retry();
  assert.equal(retries, 1);
});
