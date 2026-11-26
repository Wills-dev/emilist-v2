import type { JobDetailsViewModel } from "../types/jobDetails";

export const jobOwnerReviewAction = (action: string | null, job: JobDetailsViewModel | undefined, userId?: string) => {
  if (action !== "job-owner-review" || !job || !userId || !job.ownerId || job.ownerId === userId) return null;
  const accepted = job.applications?.find((application) => (job.acceptedApplicationId && application._id === job.acceptedApplicationId) || ["accepted", "active", "completed", "paused"].includes(application.status?.toLowerCase() ?? ""));
  const artisanId = typeof accepted?.user === "string" ? accepted.user : accepted?.user?._id;
  if (artisanId && artisanId !== userId) return null;
  if (!artisanId && (!job.applicationId || (job.acceptedApplicationId && job.applicationId !== job.acceptedApplicationId))) return null;
  return job.hasReviewedJobOwner === true ? "already-reviewed" : "review";
};

export const removeJobOwnerReviewAction = (url: string) => {
  const next = new URL(url);
  if (next.searchParams.get("action") === "job-owner-review") next.searchParams.delete("action");
  return `${next.pathname}${next.search}${next.hash}`;
};
