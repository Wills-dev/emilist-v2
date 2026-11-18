import { axiosInstance } from "@/lib/axiosInstance";
export type BusinessItemType = "certification" | "membership" | "insurance" | "service";
export interface DeleteBusinessItemParams { businessId: string; itemId: string; itemType: BusinessItemType; }

export const deleteBusinessItem = async ({ businessId, itemId, itemType }: DeleteBusinessItemParams) => {
  if (!businessId || !itemId) throw new Error("The business item ID is unavailable.");
  const { data } = await axiosInstance.delete<{ message?: string; success?: boolean; status?: boolean | string }>(`/business/delete-business-item/${encodeURIComponent(businessId)}/${encodeURIComponent(itemId)}/${itemType}`);
  if (data.success === false || data.status === false || data.status === "failed" || data.status === "error") throw new Error(data.message || "Unable to delete this item.");
  return data;
};
