import { axiosInstance } from "@/lib/axiosInstance";
import type { BusinessProfile, BusinessProfileDto, BusinessReviewSummary } from "../types/profile";

export const fetchBusinessProfile = async (businessId: string, userId?: string, signal?: AbortSignal): Promise<BusinessProfile> => {
  const { data } = await axiosInstance.get<{ data: BusinessProfileDto | {
    business: BusinessProfileDto; reviews?: BusinessReviewSummary;
  } }>(`/business/fetch-single-business/${encodeURIComponent(businessId)}`, {
    params: userId ? { userId } : undefined, signal,
  });
  const payload = data?.data;
  const business = payload && "business" in payload ? payload.business : payload;
  if (!business || business._id !== businessId) throw new Error("The business profile response is invalid or belongs to another business.");
  return { business, reviewSummary: payload && "business" in payload ? payload.reviews : undefined };
};
