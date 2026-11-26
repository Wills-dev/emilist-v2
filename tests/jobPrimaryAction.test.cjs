/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const { getJobPrimaryAction } = load("src/features/jobs/helpers/jobManagement.ts", {
  "./manageJobs": { normalizeJobStatus: (status) => status.trim().toLowerCase() },
});

test("active jobs hide Complete Milestone once the only milestone is completed", () => {
  assert.equal(getJobPrimaryAction("active", false, false, [{ status: "completed" }]), null);
  assert.equal(getJobPrimaryAction("active", false, false, []), null);
  assert.equal(getJobPrimaryAction("active", false, false, [{ status: "in-review" }]), null);
  assert.equal(getJobPrimaryAction("active", false, false, [{ status: "completed" }, { status: "pending" }]), null);
});

test("Complete Milestone remains available only for active work on an active job", () => {
  assert.equal(getJobPrimaryAction("active", false, false, [{ status: "completed" }, { status: "active" }]), "complete-milestone");
  assert.equal(getJobPrimaryAction("active", false, false, [{ status: "in-progress" }]), "complete-milestone");
  assert.equal(getJobPrimaryAction("paused", false, false, [{ status: "active" }]), null);
  assert.equal(getJobPrimaryAction("active", true, false, [{ status: "completed" }]), "pause");
});
