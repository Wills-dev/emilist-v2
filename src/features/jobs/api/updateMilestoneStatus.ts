import { axiosInstance } from "@/lib/axiosInstance";
import type { UpdateMilestoneStatusParams } from "../types/updateMilestoneStatus";

export const updateMilestoneStatus = async ({ jobId, milestoneId, payload }: UpdateMilestoneStatusParams) => {
  const { data } = await axiosInstance.patch(
    `/jobs/update-milestone-status/${encodeURIComponent(jobId)}/milestone/${encodeURIComponent(milestoneId)}`,
    payload,
  );
  return data;
};
