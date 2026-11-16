import { axiosInstance } from "@/lib/axiosInstance";
import type { UpdateApplicationStatusParams } from "../types/updateApplicationStatus";

export const updateApplicationStatus = async ({ projectId, status }: UpdateApplicationStatusParams) => {
  if (!projectId.trim()) throw new Error("The application ID is unavailable.");
  if (!["applied", "accepted", "rejected", "pause", "unpause"].includes(status)) throw new Error("Invalid application status.");
  const { data } = await axiosInstance.patch<{ message?: string; success?: boolean; status?: boolean | string }>(
    `/jobs/update-application-status/${encodeURIComponent(projectId)}`,
    { status },
  );
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to update application status.");
  return data;
};
