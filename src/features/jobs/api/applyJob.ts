import { axiosInstance } from "@/lib/axiosInstance";
import type { ApplyJobPayload } from "../types/application";

export const applyJob = async (payload: ApplyJobPayload) => {
  const { data } = await axiosInstance.post("/jobs/apply-job", payload);
  return data;
};
