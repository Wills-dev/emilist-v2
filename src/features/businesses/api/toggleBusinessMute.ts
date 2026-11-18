import { axiosInstance } from "@/lib/axiosInstance";

export const toggleBusinessMute = async (businessId: string) => {
  if (!businessId.trim()) throw new Error("Business ID is unavailable.");
  const { data } = await axiosInstance.patch<{ success?: boolean; status?: boolean | string; message?: string; data?: { isMuted?: boolean; muted?: boolean } }>(`/business/mute-business/${encodeURIComponent(businessId)}`);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to update this business.");
  return data;
};
