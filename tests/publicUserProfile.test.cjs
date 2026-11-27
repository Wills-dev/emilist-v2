/* eslint-disable @typescript-eslint/no-require-imports -- Node CommonJS test runner. */
const { test } = require("node:test");
const assert = require("node:assert/strict");
const jsx = require("react/jsx-runtime");
const load = require("./helpers/loadSource.cjs");
const mapper = load("src/features/profiles/helpers/mapPublicUser.ts");
const user = { _id: "user-id", firstName: " Jane ", lastName: "Doe", uniqueId: "public-tag", displayImage: "https://res.cloudinary.com/example/avatar.png", bio: "<p>About me</p>", isVerified: true };

test("public user fields map directly without inventing ratings or counts", () => {
  for (const kind of ["user", "employer", "merchant"]) {
    const profile = mapper.mapPublicUser(user, kind);
    assert.equal(profile.name, "Jane Doe");
    assert.equal(profile.kind, kind);
    assert.equal(profile.image, user.displayImage);
    assert.equal(profile.username, "public-tag");
    assert.equal(profile.verified, true);
    assert.equal(profile.rating, undefined);
    assert.equal(profile.reviewCount, undefined);
  }
});

test("public profile uses the user endpoint once and only uses job/material context for navigation", async () => {
  const requests = [];
  const configs = [];
  const api = load("src/features/profiles/api/fetchPublicUser.ts", {
    "@/lib/axiosInstance": { axiosInstance: { get: async (...args) => { requests.push(args); return { data: { data: user } }; } } },
  });
  const hook = load("src/features/profiles/hooks/usePublicUserProfile.ts", {
    "@tanstack/react-query": { useQuery: (config) => { configs.push(config); return { data: config.select(user), isPending: false, isError: false }; } },
    "../api/fetchPublicUser": api,
    "../helpers/mapPublicUser": mapper,
  });
  const View = () => null;
  const routes = load("src/lib/helpers/routes.ts");
  const Page = load("src/features/profiles/components/PersonProfilePage/PersonProfilePage.tsx", {
    "react/jsx-runtime": jsx,
    "next/navigation": { useSearchParams: () => new URLSearchParams("jobId=job-context&tab=completed&materialId=material-context") },
    "@/components/atoms/BackButton/BackButton": { default: () => null },
    "@/components/molecules/EmptyState/EmptyState": { default: () => null },
    "@/components/atoms/Container/Container": { default: () => null },
    "../../hooks/usePublicUserProfile": hook,
    "@/features/jobs/helpers/manageJobs": { resolveManageJobsTab: (tab) => tab || "listed" },
    "@/lib/helpers/routes": routes,
    "../ProfileSkeleton/ProfileSkeleton": { default: () => null },
    "../PersonProfileView/PersonProfileView": { default: View },
  }).default;
  const page = Page({ id: user._id, kind: "employer", dashboard: true });
  assert.equal(page.type, View);
  assert.equal(configs.length, 1);
  assert.deepEqual(configs[0].queryKey, ["public-user-profile", user._id]);
  const signal = new AbortController().signal;
  await configs[0].queryFn({ signal });
  assert.deepEqual(requests, [["/auth/user-details/user-id", { signal }]]);
  assert.equal(page.props.backHref, "/dashboard/jobs/job-context?tab=completed");
  assert.equal(page.props.reviewsHref, "/dashboard/profiles/employer/user-id/reviews?jobId=job-context&tab=completed");
  assert.equal(page.props.profile.name, "Jane Doe");
});

test("public user API rejects a response for a different user", async () => {
  const { fetchPublicUser } = load("src/features/profiles/api/fetchPublicUser.ts", {
    "@/lib/axiosInstance": { axiosInstance: { get: async () => ({ data: { data: { _id: "different-user" } } }) } },
  });
  await assert.rejects(fetchPublicUser("user-id"), /another user/);
});
