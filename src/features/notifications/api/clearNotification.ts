import { axiosInstance } from "@/lib/axiosInstance";

export const clearNotification = async (notificationId: string) => {
  const { data } = await axiosInstance.delete(`/notification/clear-notification/${encodeURIComponent(notificationId)}`);
  return data;
};
