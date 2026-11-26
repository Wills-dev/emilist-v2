/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const { jobOwnerReviewAction, removeJobOwnerReviewAction } = load("src/features/jobs/helpers/jobOwnerReviewAction.ts");
const job = { ownerId: "owner", hasReviewedJobOwner: false, acceptedApplicationId: "accepted", applications: [{ _id: "accepted", user: { _id: "artisan" }, status: "accepted" }] };

test("review link selects the form or already-reviewed notice for the assigned artisan", () => {
  assert.equal(jobOwnerReviewAction("job-owner-review", job, "artisan"), "review");
  assert.equal(jobOwnerReviewAction("job-owner-review", { ...job, hasReviewedJobOwner: true }, "artisan"), "already-reviewed");
  assert.equal(jobOwnerReviewAction("job-owner-review", { ownerId: "owner", applicationId: "accepted", acceptedApplicationId: "accepted" }, "artisan"), "review");
});

test("owners, visitors and unrelated users cannot trigger a review modal", () => {
  for (const user of [undefined, "owner", "unrelated"]) assert.equal(jobOwnerReviewAction("job-owner-review", job, user), null);
  assert.equal(jobOwnerReviewAction(null, job, "artisan"), null);
  assert.equal(jobOwnerReviewAction("other", job, "artisan"), null);
  assert.equal(jobOwnerReviewAction("job-owner-review", undefined, "artisan"), null);
  assert.equal(jobOwnerReviewAction("job-owner-review", { ownerId: "owner" }, "unrelated"), null);
  assert.equal(jobOwnerReviewAction("job-owner-review", { ownerId: "owner", applicationId: "pending", acceptedApplicationId: "accepted" }, "unrelated"), null);
});

test("closing the action removes only its query parameter, preserving tab, section and hash", () => {
  assert.equal(removeJobOwnerReviewAction("http://localhost:3000/dashboard/jobs/job?action=job-owner-review"), "/dashboard/jobs/job");
  assert.equal(removeJobOwnerReviewAction("http://localhost:3000/dashboard/jobs/job?tab=completed&action=job-owner-review&section=payments#invoice"), "/dashboard/jobs/job?tab=completed&section=payments#invoice");
  assert.equal(removeJobOwnerReviewAction("http://localhost:3000/dashboard/jobs/job?action=other"), "/dashboard/jobs/job?action=other");
});
