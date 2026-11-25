/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const routes = { dashboard: "/dashboard/overview", login: "/auth/login", verifyEmail: "/auth/verify-email", completeProfile: "/dashboard/profile/complete" };
const redirect = load("src/lib/helpers/authRedirect.ts", { "./routes": { routes } });
const cookieValues = {};
const storage = new Map();
const session = load("src/lib/helpers/authSession.ts", {
  "./cookie": { readCookie: (key) => cookieValues[key], AUTH_COOKIE_CHANGE_EVENT: "auth-change" },
  "./authRedirect": redirect,
  "./authConstants": { SESSION_AUTH_COOKIE: "emilistAuthMode", GOOGLE_AUTH_CONTEXT_KEY: "emilist-google-auth" },
});
const plans = load("src/features/auth/helpers/loginContinuation.ts", {
  "@/lib/helpers/routes": { routes }, "@/lib/helpers/authRedirect": redirect,
});
const base = { destination: "/post-job", isModalFlow: false, pendingFlow: null, redirectPath: null };
const user = { emailVerified: true, isProfileComplete: true };

test("Google callback context is short-lived and destinations stay within the app", () => {
  const now = 10000000;
  const parse = (value) => session.parseGoogleAuthContext(JSON.stringify(value), now);
  assert.deepEqual(parse({ destination: "/post-job", startedAt: now }), { destination: "/post-job", startedAt: now });
  assert.equal(parse({ destination: "https://external.example", startedAt: now }).destination, routes.dashboard);
  assert.equal(parse({ destination: "/post-job", startedAt: now - 31 * 60 * 1000 }), null);
  assert.equal(parse({ destination: "/post-job", startedAt: now + 1 }), null);
  assert.equal(session.parseGoogleAuthContext("invalid-json", now), null);
  assert.equal(parse({ destination: "/post-job" }), null);
});

test("transport chooses Google session over stale JWTs and otherwise keeps bearer login", () => {
  const previous = global.window;
  global.window = { sessionStorage: { getItem: (key) => storage.get(key) ?? null } };
  try {
    assert.equal(session.getBrowserAuthMode(), "");
    cookieValues.emilistToken = "stale-token";
    assert.equal(session.getBrowserAuthMode(), "bearer");
    storage.set(session.GOOGLE_AUTH_CONTEXT_KEY, JSON.stringify({ destination: "/post-job", startedAt: Date.now() }));
    assert.equal(session.getBrowserAuthMode(), "google");
    storage.clear();
    cookieValues[session.SESSION_AUTH_COOKIE] = "session";
    assert.equal(session.getBrowserAuthMode(), "session");
    assert.equal(session.usesCookieSession("google"), true);
    assert.equal(session.usesCookieSession("session"), true);
    assert.equal(session.usesCookieSession("bearer"), false);
  } finally { global.window = previous; storage.clear(); for (const key of Object.keys(cookieValues)) delete cookieValues[key]; }
});

test("password login and Google login share verification and profile-completion decisions", () => {
  for (const fromGoogle of [false, true]) {
    const context = { ...base, fromGoogle };
    assert.equal(plans.getLoginContinuation(user, context).path, "/post-job");
    assert.equal(plans.getLoginContinuation({ ...user, emailVerified: false }, context).path, "/auth/verify-email?redirect=%2Fpost-job");
    assert.equal(plans.getLoginContinuation({ ...user, isProfileComplete: false }, context).path, "/dashboard/profile/complete?redirect=%2Fpost-job");
  }
});

test("Google modal returns restore the originating page while pending forms remain available", () => {
  const context = { ...base, isModalFlow: true, pendingFlow: "post-job", redirectPath: "/post-job", fromGoogle: true };
  assert.deepEqual(plans.getLoginContinuation(user, context), { modal: null, path: "/post-job", clearPending: false });
  assert.deepEqual(plans.getLoginContinuation({ ...user, isProfileComplete: false }, context), { modal: "complete-profile", path: "/post-job", clearPending: false });
  assert.deepEqual(plans.getLoginContinuation(user, { ...context, fromGoogle: false }), { modal: null, path: null, clearPending: false });
  assert.equal(plans.getLoginContinuation({ ...user, isProfileComplete: false }, { ...context, pendingFlow: "register-expert" }).modal, null);
  assert.equal(plans.getLoginContinuation(user, { ...context, destination: "//external.example" }).path, routes.dashboard);
});

test("API requests send session cookies only in Google/session mode and omit stale bearer headers", () => {
  let mode = "bearer";
  let requestInterceptor;
  const instance = { interceptors: { request: { use: (fn) => { requestInterceptor = fn; } }, response: { use() {} } } };
  load("src/lib/axiosInstance.ts", {
    axios: { default: { create: () => instance } },
    "./helpers/handleExpiredSession": { handleExpiredSession() {} },
    "./helpers/authSession": { getBrowserAuthMode: () => mode, usesCookieSession: session.usesCookieSession },
    "./helpers/cookie": { readCookie: () => "token-value" },
  });
  const config = () => ({ headers: { Authorization: "Bearer stale", delete(key) { delete this[key]; } } });
  let result = requestInterceptor(config());
  assert.equal(result.withCredentials, false);
  assert.equal(result.headers.Authorization, "Bearer token-value");
  for (mode of ["google", "session"]) {
    result = requestInterceptor(config());
    assert.equal(result.withCredentials, true);
    assert.equal(result.headers.Authorization, undefined);
  }
});
