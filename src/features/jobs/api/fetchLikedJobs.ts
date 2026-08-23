import { axiosInstance } from "@/lib/axiosInstance";
import type {
  FetchAllJobsItemDto,
  FetchAllJobsPage,
} from "../types/listJobs";

export const FETCH_LIKED_JOBS_ENDPOINT = "/jobs/fetch-liked-jobs";

interface FetchLikedJobsEnvelope {
  message: string;
  data:
    | FetchAllJobsItemDto[]
    | FetchAllJobsPage
    | { likedJobs: FetchAllJobsItemDto[] };
}

export const fetchLikedJobs = async (
  signal?: AbortSignal,
): Promise<FetchAllJobsItemDto[]> => {
  const response = await axiosInstance.get<FetchLikedJobsEnvelope>(
    FETCH_LIKED_JOBS_ENDPOINT,
    { signal },
  );
  const payload = response.data?.data;
  const jobs = Array.isArray(payload)
    ? payload
    : "likedJobs" in payload
      ? payload.likedJobs
      : payload.jobs;

  if (!Array.isArray(jobs)) {
    throw new Error("The liked-jobs response did not include a valid jobs list.");
  }

  return jobs;
};
