import type { JobDetailsViewModel } from "../types/jobDetails";

export const getAcceptedApplicationId = (job: Pick<JobDetailsViewModel, "acceptedApplicationId" | "applicationId" | "applications">) =>
  job.acceptedApplicationId ||
  job.applications?.find((application) => ["accepted", "active", "pause", "paused", "unpause"].includes(application.status?.trim().toLowerCase() ?? ""))?._id ||
  job.applicationId;
