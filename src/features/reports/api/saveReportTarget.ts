import { axiosInstance } from "@/lib/axiosInstance";
import type { SaveTargetInput } from "../types/api";
export const saveReportTarget = async (payload: SaveTargetInput) => {
  const { data } = await axiosInstance.put("/reports/targets", payload);
  if (data?.success === false || data?.status === false) throw new Error(data.message || "Unable to save targets.");
  return data;
};
