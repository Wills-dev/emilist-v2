import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeNotifications } from "../helpers/normalizeNotifications";

export const fetchNotifications = async (page: number, limit: number, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>("/notification/fetch-user-notification", { params: { page, limit }, signal });
  return normalizeNotifications(data, page, limit);
};
