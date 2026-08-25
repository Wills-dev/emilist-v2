import type { FetchAllJobsListQuery } from "../types/listJobs";
import type { ListedJobsQuery } from "../types/manageJobs";

export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (query: FetchAllJobsListQuery) =>
    [...jobKeys.lists(), query] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (jobId: string) => [...jobKeys.details(), jobId] as const,
  liked: () => [...jobKeys.all, "liked"] as const,
  listed: (query: ListedJobsQuery) =>
    [...jobKeys.all, "listed", query] as const,
};
