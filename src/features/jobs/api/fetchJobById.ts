import { axiosInstance } from "@/lib/axiosInstance";
import type {
  FetchJobByIdEnvelope,
  FetchJobByIdQuery,
  JobDetailsDto,
} from "../types/jobDetails";

export const url = "/jobs/fetch-job-by-id";

export const fetchJobById = async (
  { id, reviewsPage = 1, reviewsLimit = 5 }: FetchJobByIdQuery,
  signal?: AbortSignal,
): Promise<JobDetailsDto> => {
  const response = await axiosInstance.get<FetchJobByIdEnvelope>(url, {
    params: {
      id: id.trim(),
      reviewsPage: reviewsPage || 1,
      reviewsLimit: reviewsLimit || 5,
    },
    signal,
  });

  const payload = response.data?.data;
  const job = payload?.job ?? payload;
  if (!job?._id) {
    throw new Error("The job response did not include a valid job.");
  }

  return job;
};
