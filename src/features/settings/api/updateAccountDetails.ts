import { axiosInstance } from "@/lib/axiosInstance";
import type { UpdateAccountDetailsPayload } from "../types/bank";

export const updateAccountDetails = async (payload: UpdateAccountDetailsPayload) => {
  const { data } = await axiosInstance.patch<{ message?: string; success?: boolean; status?: string | boolean }>("/auth/update-account-details", payload);
  if (data.success === false || data.status === false || ["fail", "failed", "error"].includes(String(data.status))) throw new Error(data.message || "Unable to save bank details.");
  return data;
};
