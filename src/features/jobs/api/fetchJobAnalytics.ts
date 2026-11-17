import { axiosInstance } from "@/lib/axiosInstance";
import type { JobAnalytics, JobAnalyticsQuery } from "../types/jobAnalytics";

export const fetchJobAnalytics = async (
  query: JobAnalyticsQuery = {},
  signal?: AbortSignal,
): Promise<JobAnalytics> => {
  const response = await axiosInstance.get<{ data: JobAnalytics }>(
    "/jobs/user-job-analytics", { params: query, signal },
  );
  const analytics = response.data?.data;
  const fields = ["totalJobs", "totalActiveJobs", "totalCompletedJobs", "totalOverdueJobs"] as const;
  if (!analytics || fields.some((field) =>
    !Number.isSafeInteger(analytics[field]) || analytics[field] < 0,
  )) throw new Error("The job analytics response did not include valid job counts.");
  return analytics;
};
