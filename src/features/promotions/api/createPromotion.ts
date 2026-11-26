import { axiosInstance } from "@/lib/axiosInstance";
import { validatePromotion, type PromotionType } from "../helpers/promotion";

export const createPromotion = async ({ id, type, duration }: { id: string; type: PromotionType; duration: number }) => {
  validatePromotion(id, type, duration);
  const { data } = await axiosInstance.post<{ message?: string; success?: boolean; status?: string | boolean }>(`/subscription/promote/${encodeURIComponent(id)}`, { type, duration });
  if (data.success === false || data.status === false || ["fail", "failed", "error"].includes(String(data.status))) throw new Error(data.message || "Unable to create campaign.");
  return data;
};
