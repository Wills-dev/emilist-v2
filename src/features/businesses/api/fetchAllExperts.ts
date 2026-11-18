import { axiosInstance } from "@/lib/axiosInstance";
import type { BusinessListItem, BusinessListPage, BusinessListQuery } from "../types/list";

export const fetchAllExperts = async (query: BusinessListQuery, signal?: AbortSignal): Promise<BusinessListPage> => {
  const { data } = await axiosInstance.get<{ data: BusinessListItem[] | Partial<BusinessListPage> & { experts?: BusinessListItem[]; currentPage?: number } }>("/business/fetch-all-experts", { params: query, signal });
  const payload = data.data;
  const businesses = Array.isArray(payload) ? payload : payload?.businesses ?? payload?.experts;
  if (!Array.isArray(businesses) || businesses.some((item) => !item || typeof item._id !== "string")) throw new Error("The expert listing response is invalid.");
  const page = Number(Array.isArray(payload) ? query.page ?? 1 : payload.page ?? payload.currentPage ?? query.page ?? 1);
  const totalPages = Number(Array.isArray(payload) ? 1 : payload.totalPages ?? 1);
  const totalBusinesses = Number(Array.isArray(payload) ? businesses.length : payload.totalBusinesses ?? businesses.length);
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(totalPages) || totalPages < 0 || !Number.isSafeInteger(totalBusinesses) || totalBusinesses < 0) throw new Error("The expert pagination response is invalid.");
  return { businesses, page, totalPages, totalBusinesses };
};
