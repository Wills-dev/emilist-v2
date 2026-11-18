import { axiosInstance } from "@/lib/axiosInstance";

export const deleteBusiness = async (businessId: string) => {
  if (!businessId) throw new Error("Business ID is unavailable.");
  return axiosInstance.delete(`/business/delete-business/${encodeURIComponent(businessId)}`);
};

export const deleteBusinessImage = async ({ businessId, imageId }: { businessId: string; imageId: string }) => {
  if (!businessId || !imageId) throw new Error("Business image ID is unavailable.");
  return axiosInstance.delete(`/business/delete-business/${encodeURIComponent(businessId)}/image/${encodeURIComponent(imageId)}`);
};
