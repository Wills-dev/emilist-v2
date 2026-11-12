import { axiosInstance } from "@/lib/axiosInstance";

export const markNotificationAsRead = async (notificationId: string) => {
  const { data } = await axiosInstance.patch(`/notification/mark-as-read/${encodeURIComponent(notificationId)}`, {});
  return data;
};
