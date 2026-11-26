import { axiosInstance } from "@/lib/axiosInstance";
import type { JobListingAction } from "../helpers/jobListingActions";

export const updateJobListing = async ({ jobId, action }: { jobId: string; action: JobListingAction }) => {
  if (!jobId.trim()) throw new Error("The job ID is missing.");
  const path = `/jobs/${action === "delete" ? "delete-job" : action === "delist" ? "delist-job" : "list-job"}/${encodeURIComponent(jobId)}`;
  const { data } = action === "delete" ? await axiosInstance.delete(path) : await axiosInstance.patch(path);
  if (data?.success === false || data?.status === "fail" || data?.status === "error") throw new Error(data.message || "Unable to update job listing.");
  return data;
};
