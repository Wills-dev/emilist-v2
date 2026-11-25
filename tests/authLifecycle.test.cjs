/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const normalize = load("src/features/auth/helpers/getUserFromResponse.ts");
const response = load("src/features/auth/helpers/authResponse.ts", { "./getUserFromResponse": normalize });
const signup = { token: "signup-test-token", userData: { _id: "user-id", email: "person@example.com", uniqueId: "user-code", languages: [], isEmailVerified: false, isVerified: false, isProfileComplete: false } };
const verified = { token: "verified-test-token", userData: { ...signup.userData, isEmailVerified: true } };

test("signup and OTP envelopes normalize userData and select the renewed token", () => {
  const first = response.readAuthResponse({ message: "success", data: signup });
  assert.equal(first.user.emailVerified, false);
  assert.equal(first.user.isProfileComplete, false);
  const second = response.readAuthResponse(verified, true);
  assert.equal(second.user.emailVerified, true);
  assert.equal(second.user._id, "user-id");
  assert.equal(second.token, "verified-test-token");
  const completed = normalize.getUserFromResponse({ data: { token: "profile-test-token", userData: { ...verified.userData, displayImage: "https://res.cloudinary.com/example/profile.png", isProfileComplete: true } } });
  assert.equal(completed.image, "https://res.cloudinary.com/example/profile.png");
  assert.equal(completed.isProfileComplete, true);
  assert.throws(() => response.readAuthResponse(signup, true), /has not been verified/);
  assert.throws(() => response.readAuthResponse({ userData: verified.userData }), /authentication response/);
});

function sessionFixture() {
  const events = [];
  const state = { currentUser: null, setCurrentUser(user) { state.currentUser = user; events.push("user"); } };
  const client = {
    cancelQueries: async () => { events.push("cancel"); },
    setQueriesData: (key, user) => { events.push("cache-prefix"); assert.equal(user._id, "user-id"); },
    setQueryData: (key, user) => { events.push(`cache:${key.join(":")}`); assert.equal(user._id, "user-id"); },
  };
  const hook = load("src/features/auth/hooks/useSaveAuthSession.ts", {
    react: { useCallback: (fn) => fn },
    "@tanstack/react-query": { useQueryClient: () => client },
    "@/store/authStore": { useStore: { getState: () => state } },
    "@/lib/helpers/cookie": { clearClear: () => events.push("clear-cookie"), createCookie: (key, token) => { assert.equal(key, "emilistToken"); events.push(`cookie:${token}`); } },
    "@/lib/helpers/authSession": { clearGoogleAuthContext: () => events.push("clear-google"), SESSION_AUTH_COOKIE: "auth-mode" },
    "../helpers/authResponse": response,
  });
  return { events, state, save: hook.useSaveAuthSession() };
}

test("verified session cancels stale user requests and updates user/cache before publishing the token", async () => {
  const fixture = sessionFixture();
  await fixture.save(signup);
  assert.equal(fixture.state.currentUser.emailVerified, false);
  fixture.events.length = 0;
  const user = await fixture.save(verified, true);
  assert.equal(user.emailVerified, true);
  assert.equal(fixture.state.currentUser.emailVerified, true);
  assert.equal(fixture.events[0], "cancel");
  assert.equal(fixture.events.at(-1), "cookie:verified-test-token");
  assert.ok(fixture.events.includes("cache:currentUser:bearer"));
});

test("OTP success publishes the verified session before continuing to profile completion", async () => {
  const fixture = sessionFixture();
  let mutation;
  let continued;
  const state = { redirectPath: "/post-job", otpEmail: "person@example.com", otpCountDown: 0, clearOtpEmail() { state.otpEmail = null; }, setOtpCountDown(value) { state.otpCountDown = value; } };
  const useStore = (selector) => selector(state);
  useStore.getState = () => state;
  const hook = load("src/features/auth/hooks/useVerifyEmail.ts", {
    react: { useEffect() {}, useRef: (value) => ({ current: value }), useState: (value) => [value, () => {}] },
    sonner: { toast: { success() {}, error() {} } },
    "@tanstack/react-query": { useMutation: (options) => { mutation = options; return { mutate() {}, isPending: false }; } },
    "@/store/authStore": { useStore },
    "../api": { verifyEmail() {} },
    "@/lib/helpers/authRedirect": { safeAuthDestination: (path) => path || "/dashboard/overview" },
    "./useSaveAuthSession": { useSaveAuthSession: () => fixture.save },
    "./useLoginContinuation": { useLoginContinuation: () => (user, path) => { continued = { user, path }; assert.equal(fixture.events.at(-1), "cookie:verified-test-token"); } },
    "zustand/react/shallow": { useShallow: (fn) => fn },
    "@/lib/helpers/promiseError": { promiseErrorFunction() {} },
  });
  hook.useVerifyEmail();
  await mutation.onSuccess(verified);
  assert.equal(continued.user.emailVerified, true);
  assert.equal(continued.path, "/post-job");
  assert.equal(state.otpEmail, null);
  assert.equal(state.otpCountDown, 0);
});

test("logout suppresses expiry redirects and reliably navigates home after clearing session data", async () => {
  const events = [];
  const state = {
    isSigningOut: false, setIsSigningOut(value) { state.isSigningOut = value; },
    clearCurrentUser() { events.push("clear-user"); }, clearPendingFlow() {}, clearOtpEmail() {}, closeAllModals() {}, setIsAuthInitialized() {},
  };
  const useStore = (selector) => selector(state);
  useStore.getState = () => state;
  let mutation;
  const previousWindow = global.window;
  global.window = { location: { pathname: "/dashboard/overview", search: "", hash: "", replace: (url) => events.push(`navigate:${url}`) } };
  try {
    const hook = load("src/features/auth/hooks/useLogout.ts", {
      react: { useState: (value) => [value, () => {}] },
      "@tanstack/react-query": { useMutation: (options) => { mutation = options; return { mutate: () => events.push("logout-request"), isPending: false }; }, useQueryClient: () => ({ cancelQueries: async () => events.push("cancel"), clear: () => events.push("clear-cache") }) },
      sonner: { toast: { success() {}, error() {} } }, "../api": { logout() {} },
      "@/lib/helpers/authSession": { clearGoogleAuthContext() {} },
      "@/lib/helpers/cookie": { clearAllCookies: () => events.push("clear-cookies") },
      "@/lib/helpers/routes": { routes: { home: "/" } }, "@/store/authStore": { useStore },
      "@/store/cart/cartStore": { useCartStore: (selector) => selector({ clearCart() {} }) },
      "@/store/job/postJobStore": { usePostJobStore: { getState: () => ({ previews: [], resetForm() {} }) } },
    });
    const logout = hook.useLogout();
    logout.confirmLogout();
    logout.confirmLogout();
    assert.equal(state.isSigningOut, true);
    assert.equal(events.filter((event) => event === "logout-request").length, 1);
    const expiry = load("src/lib/helpers/handleExpiredSession.ts", {
      "@/store/authStore": { useStore }, "./cookie": { clearClear() { throw new Error("Expiry handling ran during logout"); } },
      "./authSession": { SESSION_AUTH_COOKIE: "mode", clearGoogleAuthContext() {} }, "./authRedirect": { loginRedirectUrl: () => "/auth/login" },
    });
    expiry.handleExpiredSession();
    await mutation.onSettled();
    assert.ok(events.indexOf("cancel") < events.indexOf("clear-cookies"));
    assert.equal(events.at(-1), "navigate:/");
    assert.equal(events.includes("navigate:/auth/login"), false);
  } finally { global.window = previousWindow; }
});
