import { axiosInstance } from "@/lib/axiosInstance";
import type { CloseContractPayload } from "../types/closeContract";

export const closeContract = async ({ jobId, payload }: { jobId: string; payload: CloseContractPayload }) => {
  if (!jobId.trim()) throw new Error("The job ID is unavailable.");
  const { data } = await axiosInstance.patch<{ message?: string; success?: boolean; status?: boolean | string }>(
    `/jobs/close-contract/${encodeURIComponent(jobId)}`, payload,
  );
  if (data.success === false || data.status === false || data.status === "error" || data.status === "failed") {
    throw new Error(data.message || "Unable to close the contract.");
  }
  return data;
};
