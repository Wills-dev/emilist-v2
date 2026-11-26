/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const load = require("./helpers/loadSource.cjs");
const { getBidResponseActions } = load("src/features/jobs/helpers/bidResponseActions.ts");
const initial = { _id: "application/id", status: "applied", participantRole: "job_owner", currentBid: { maximumPrice: 5000, milestones: [] }, latestCounterOffer: null, bidHistory: [{ type: "INITIAL_BID", status: "pending", madeByRole: "applicant" }] };

test("initial bid uses regular application acceptance and rejection endpoints", async () => {
  const calls = [];
  const imports = { "@/lib/axiosInstance": { axiosInstance: { patch: async (...args) => { calls.push(args); return { data: { message: "success" } }; } } } };
  const api = load("src/features/jobs/api/respondToBid.ts", {
    "./respondCounterBid": load("src/features/jobs/api/respondCounterBid.ts", imports),
    "./updateApplicationStatus": load("src/features/jobs/api/updateApplicationStatus.ts", imports),
  });
  const eligibility = getBidResponseActions(initial);
  assert.equal(eligibility.canRespond, true);
  assert.equal(eligibility.hasCounterOffer, false);
  for (const action of ["accept", "reject"]) await api.respondToBid({ projectId: initial._id, action, hasCounterOffer: eligibility.hasCounterOffer });
  assert.deepEqual(calls, [["/jobs/update-application-status/application%2Fid", { status: "accepted" }], ["/jobs/update-application-status/application%2Fid", { status: "rejected" }]]);
  calls.length = 0;
  for (const madeByRole of ["job_owner", "applicant"]) {
    const counter = { ...initial, participantRole: madeByRole === "job_owner" ? "applicant" : "job_owner", latestCounterOffer: { madeByRole, status: "pending" } };
    const state = getBidResponseActions(counter);
    assert.equal(state.canRespond, true);
    assert.equal(state.hasCounterOffer, true);
    await api.respondToBid({ projectId: initial._id, action: "accept", hasCounterOffer: state.hasCounterOffer });
  }
  assert.deepEqual(calls, [["/jobs/respond-counter-bid/application%2Fid", { action: "accept" }], ["/jobs/respond-counter-bid/application%2Fid", { action: "accept" }]]);
});

test("counter-offer evidence is recognized from history, summary or the counter list", () => {
  for (const patch of [
    { bidHistory: [...initial.bidHistory, { type: "COUNTER_OFFER", status: "rejected", madeByRole: "job_owner" }] },
    { counterOffers: [{}] },
    { counterOfferSummary: { jobOwnerUsed: 1, applicantUsed: 0 } },
    { counterOfferSummary: { jobOwnerUsed: 0, applicantUsed: 1 } },
  ]) assert.equal(getBidResponseActions({ ...initial, ...patch }).hasCounterOffer, true);
});
