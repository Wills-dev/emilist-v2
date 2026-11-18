import { axiosInstance } from "@/lib/axiosInstance";
import type { BusinessListItem } from "../types/list";

export const compareBusiness = async (businessId: string) => {
  if (!businessId.trim()) throw new Error("Business ID is unavailable.");
  return axiosInstance.patch(`/business/compare-business/${encodeURIComponent(businessId)}`);
};

export const fetchComparedBusinesses = async (signal?: AbortSignal): Promise<BusinessListItem[]> => {
  const { data } = await axiosInstance.get<{ data: BusinessListItem[] | { enhancedBusinesses?: BusinessListItem[]; businesses?: BusinessListItem[]; comparedBusinesses?: BusinessListItem[]; experts?: BusinessListItem[] } }>("/business/fetch-compared-business", { signal });
  const payload = data.data;
  const businesses = Array.isArray(payload) ? payload : payload?.enhancedBusinesses ?? payload?.businesses ?? payload?.comparedBusinesses ?? payload?.experts;
  if (!Array.isArray(businesses) || businesses.some((business) => !business || typeof business._id !== "string")) throw new Error("The compared business response is invalid.");
  return businesses;
};
