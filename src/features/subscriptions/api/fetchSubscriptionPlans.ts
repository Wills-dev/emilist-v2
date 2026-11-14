import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeSubscriptionPlans } from "../helpers/normalizeSubscriptionPlans";

export const fetchSubscriptionPlans = async (duration: "monthly" | "yearly" = "monthly", signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>("/subscription/get-plans", { params: { duration }, signal });
  return normalizeSubscriptionPlans(data, duration);
};
