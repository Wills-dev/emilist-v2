/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const loadSource = require("./helpers/loadSource.cjs");
const routes = { dashboard: "/dashboard/overview", login: "/auth/login" };
const authRedirect = loadSource("src/lib/helpers/authRedirect.ts", { "./routes": { routes } });
const { googleAuthStartUrl, googleAuthDestination } = loadSource("src/features/auth/helpers/googleAuth.ts", { "@/lib/helpers/authRedirect": authRedirect, "@/lib/helpers/authSession": { GOOGLE_AUTH_CONTEXT_KEY: "emilist-google-auth" } });

test("Google OAuth starts at the configured GET endpoint and preserves API base paths", () => {
  for (const base of ["https://be.emilist.com/api/v1", "https://be.emilist.com/api/v1/", "https://be.emilist.com/api/v1/?x=1#old"]) {
    assert.equal(googleAuthStartUrl(base), "https://be.emilist.com/api/v1/auth/google");
  }
  assert.equal(googleAuthStartUrl("http://localhost:4000/api/v1"), "http://localhost:4000/api/v1/auth/google");
  for (const base of [undefined, "", "javascript:alert(1)", "http://external.example/api/v1"]) assert.throws(() => googleAuthStartUrl(base));
});

test("Google sign-in retains intended in-app destinations and rejects external redirects", () => {
  assert.equal(googleAuthDestination("/dashboard/jobs", null, "/", false), "/dashboard/jobs");
  assert.equal(googleAuthDestination(null, "/post-job", "/", false), "/post-job");
  assert.equal(googleAuthDestination(null, null, "/marketplace/materials/item", true), "/marketplace/materials/item");
  assert.equal(googleAuthDestination(null, null, "/auth/login", false), routes.dashboard);
  for (const destination of ["//external.example", "https://external.example", "/auth/google/callback", "/\\external.example"]) {
    assert.equal(googleAuthDestination(destination, null, "/", false), routes.dashboard);
  }
});
