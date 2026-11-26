/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const helpers = load("src/features/settings/helpers/bankDetails.ts");
const account = { id: "account-id", bankName: " GTBank ", accountNumber: "0123456789", accountName: " Jane Doe ", country: "" };

test("payout payload preserves leading zeros and the exact password, and only sends documented fields", async () => {
  const payload = helpers.bankDetailsPayload(account, " password-with-spaces ");
  assert.deepEqual(payload, { password: " password-with-spaces ", number: "0123456789", bank: "GTBank", holdersName: "Jane Doe" });
  assert.equal(helpers.bankDetailsError(account, "password"), undefined);
  assert.equal(helpers.bankDetailsError({ ...account, accountNumber: "abc" }, "password").field, "accountNumber");
  assert.equal(helpers.bankDetailsError(account, "").field, "password");
  let request;
  const { updateAccountDetails } = load("src/features/settings/api/updateAccountDetails.ts", {
    "@/lib/axiosInstance": { axiosInstance: { patch: async (...args) => { request = args; return { data: { message: "success" } }; } } },
  });
  await updateAccountDetails(payload);
  assert.deepEqual(request, ["/auth/update-account-details", payload]);
});

function fixture(api) {
  const state = [];
  let cursor = 0;
  const calls = [];
  const hook = load("src/features/settings/hooks/useBankDetailsForm.ts", {
    react: {
      useRef: (initial) => { const index = cursor++; if (!(index in state)) state[index] = { current: initial }; return state[index]; },
      useState: (initial) => { const index = cursor++; if (!(index in state)) state[index] = typeof initial === "function" ? initial() : initial; return [state[index], (next) => { state[index] = typeof next === "function" ? next(state[index]) : next; }]; },
    },
    sonner: { toast: { success: (message) => calls.push(["success", message]), error: (message) => calls.push(["error", message]) } },
    axios: { isAxiosError: () => false },
    "@tanstack/react-query": { useQueryClient: () => ({ invalidateQueries: (key) => calls.push(["invalidate", key]) }) },
    "../api/updateAccountDetails": { updateAccountDetails: api },
    "../helpers/bankDetails": helpers,
    "@/lib/helpers/formValidation": { reportFormError: (field) => calls.push(["validation", field]) },
    "@/lib/helpers/promiseError": { promiseErrorFunction() {} },
  }).useBankDetailsForm;
  const render = () => { cursor = 0; return hook(); };
  let form = render();
  const id = form.accounts[0].id;
  for (const [key, value] of Object.entries(account)) if (key !== "id") form.updateAccount(id, key, value);
  form.updatePassword(id, "test-password");
  return { render, id, calls };
}

test("bank form saves only after API success, blocks duplicate requests, clears password and refreshes the profile", async () => {
  let complete;
  let requests = 0;
  const fixtureState = fixture(() => { requests++; return new Promise((resolve) => { complete = resolve; }); });
  const { render, id, calls } = fixtureState;
  const pending = render().saveAccount(id);
  assert.equal(render().savingAccountId, id);
  assert.deepEqual(render().savedAccountIds, []);
  await render().saveAccount(id);
  assert.equal(requests, 1);
  complete({ message: "success" });
  await pending;
  assert.deepEqual(render().savedAccountIds, [id]);
  assert.equal(render().passwords[id], "");
  assert.equal(render().savingAccountId, null);
  assert.ok(calls.some(([kind]) => kind === "invalidate"));
});

test("failed bank updates stay unsaved and discard the submitted password", async () => {
  const { render, id, calls } = fixture(async () => { throw new Error("Incorrect password"); });
  await render().saveAccount(id);
  assert.deepEqual(render().savedAccountIds, []);
  assert.equal(render().passwords[id], "");
  assert.equal(render().savingAccountId, null);
  assert.deepEqual(calls, [["error", "Incorrect password"]]);
});
