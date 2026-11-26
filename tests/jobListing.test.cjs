/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const helpers = load("src/features/jobs/helpers/jobListingActions.ts");
const job = { id: "job-id", title: "Build a house", ownerId: "owner", isListed: true };

test("owners can delete only before acceptance, and listing visibility controls list/delist independently", () => {
  assert.deepEqual(helpers.jobListingActions(job, "owner"), ["delete", "delist"]);
  assert.deepEqual(helpers.jobListingActions({ ...job, isListed: false }, "owner"), ["delete", "list"]);
  assert.deepEqual(helpers.jobListingActions({ ...job, acceptedApplicationId: "application" }, "owner"), ["delist"]);
  assert.deepEqual(helpers.jobListingActions({ ...job, acceptedApplicationId: "application", isListed: false }, "owner"), ["list"]);
  assert.deepEqual(helpers.jobListingActions({ ...job, applications: [{ status: "accepted" }] }, "owner"), ["delist"]);
  assert.deepEqual(helpers.jobListingActions(job, "other"), []);
  assert.deepEqual(helpers.jobListingActions(job), []);
});

test("job listing API uses the documented verbs and encoded job IDs", async () => {
  const calls = [];
  const api = load("src/features/jobs/api/updateJobListing.ts", { "@/lib/axiosInstance": { axiosInstance: {
    delete: async (...args) => { calls.push(["DELETE", ...args]); return { data: { message: "success" } }; },
    patch: async (...args) => { calls.push(["PATCH", ...args]); return { data: { message: "success" } }; },
  } } });
  for (const action of ["delete", "delist", "list"]) await api.updateJobListing({ jobId: "parent/id", action });
  assert.deepEqual(calls, [["DELETE", "/jobs/delete-job/parent%2Fid"], ["PATCH", "/jobs/delist-job/parent%2Fid"], ["PATCH", "/jobs/list-job/parent%2Fid"]]);
});

function fixture(api) {
  const slots = [];
  let cursor = 0;
  const events = [];
  const target = { ...job };
  const hook = load("src/features/jobs/hooks/useJobListingActions.ts", {
    react: {
      useState: (initial) => { const index = cursor++; if (!(index in slots)) slots[index] = initial; return [slots[index], (next) => { slots[index] = next; }]; },
      useRef: (initial) => { const index = cursor++; if (!(index in slots)) slots[index] = { current: initial }; return slots[index]; },
    },
    "@tanstack/react-query": { useQueryClient: () => ({ invalidateQueries: (key) => events.push(["invalidate", key]), removeQueries: (key) => events.push(["remove", key]) }) },
    axios: { isAxiosError: () => false },
    sonner: { toast: { success: (text) => events.push(["success", text]), error: (text) => events.push(["error", text]), info: (text) => events.push(["info", text]) } },
    "@/store/authStore": { useStore: (selector) => selector({ currentUser: { _id: "owner" } }) },
    "@/lib/helpers/promiseError": { promiseErrorFunction() {} },
    "../api/updateJobListing": { updateJobListing: api },
    "../helpers/jobListingActions": helpers,
  }).useJobListingActions;
  return { target, events, render: () => { cursor = 0; return hook(target, () => events.push(["deleted"])); } };
}

test("menu selection waits for confirmation, blocks duplicate requests and refreshes data after deletion", async () => {
  let resolve;
  let requests = 0;
  const { render, events } = fixture(() => { requests++; return new Promise((done) => { resolve = done; }); });
  render().menuActions[0].onSelect();
  assert.equal(render().action, "delete");
  assert.equal(requests, 0);
  const pending = render().confirm();
  render().close();
  assert.equal(render().action, "delete");
  await render().confirm();
  assert.equal(requests, 1);
  resolve({});
  await pending;
  assert.equal(render().action, null);
  assert.equal(render().busy, false);
  assert.ok(events.some(([kind]) => kind === "deleted"));
  assert.ok(events.some(([kind]) => kind === "invalidate"));
});

test("new acceptance prevents deletion at confirmation; API failure keeps confirmation open", async () => {
  let requests = 0;
  const changed = fixture(async () => requests++);
  changed.render().menuActions[0].onSelect();
  changed.target.acceptedApplicationId = "new-accepted-application";
  await changed.render().confirm();
  assert.equal(requests, 0);
  const failed = fixture(async () => { throw new Error("Job has an accepted applicant"); });
  failed.render().menuActions[0].onSelect();
  await failed.render().confirm();
  assert.equal(failed.render().action, "delete");
  assert.equal(failed.render().busy, false);
  assert.ok(!failed.events.some(([kind]) => kind === "success"));
});
