import { isAxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeCurrentSubscription, normalizeSubscriptionHistory } from "../helpers/normalizeUserSubscriptions";

export const fetchCurrentSubscription = async (signal?: AbortSignal) => {
  try {
    const { data } = await axiosInstance.get<unknown>("/subscription/get-user-subscription", { signal });
    return normalizeCurrentSubscription(data);
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) return null;
    throw error;
  }
};

export const fetchUserSubscriptions = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>("/subscription/get-all-user-subscriptions", { signal });
  return normalizeSubscriptionHistory(data);
};
