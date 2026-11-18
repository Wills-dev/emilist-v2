import { axiosInstance } from "@/lib/axiosInstance";
import type { ReviewOwnerPayload } from "../types/reviewOwner";

export const reviewJobOwner = async ({ jobId, payload }: { jobId: string; payload: ReviewOwnerPayload }) => {
  if (!jobId.trim()) throw new Error("The job ID is unavailable.");
  const { data } = await axiosInstance.post<{ message?: string; success?: boolean; status?: boolean | string }>(`/jobs/${encodeURIComponent(jobId)}/review-owner`, payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to submit the review.");
  return data;
};
