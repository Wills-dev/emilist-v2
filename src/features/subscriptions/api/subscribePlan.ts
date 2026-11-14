import { axiosInstance } from "@/lib/axiosInstance";
import type { PaymentCheckoutResponse } from "@/lib/helpers/paymentRedirect";
import type { SubscribePlanPayload } from "../types";

export const subscribePlan = async (payload: SubscribePlanPayload) => {
  const { data } = await axiosInstance.post<PaymentCheckoutResponse>("/subscription/subscribe-plan", payload);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to activate plan.");
  return data;
};
