import { axiosInstance } from "@/lib/axiosInstance";
import type { PayForJobPayload, PayForJobResponse } from "../types/payForJob";

export const payForJob = async (payload: PayForJobPayload) => {
  // axiosInstance already supplies the /api/v1 base URL and authorization.
  const { data } = await axiosInstance.post<PayForJobResponse>("/jobs/pay-for-job", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") {
    throw new Error(data.message || "Unable to process payment.");
  }
  return data;
};
