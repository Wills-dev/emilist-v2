import { axiosInstance } from "@/lib/axiosInstance";
import { normalizePromo, normalizePromos, normalizePromoProducts } from "../helpers/normalizePromo";
import type { CreatePromoPayload, UpdatePromoPayload } from "../types";

export const fetchSellerPromos = async (signal?: AbortSignal) => {
  const { data } = await axiosInstance.get("/promo", { signal });
  return normalizePromos(data.data);
};
export const createSellerPromo = async (payload: CreatePromoPayload) => {
  const { data } = await axiosInstance.post("/promo", payload);
  return normalizePromo(data.data);
};
export const updateSellerPromo = async ({ id, payload }: { id: string; payload: UpdatePromoPayload }) => {
  await axiosInstance.patch(`/promo/${encodeURIComponent(id)}`, payload);
};
export const deleteSellerPromo = async (id: string) => {
  await axiosInstance.delete(`/promo/${encodeURIComponent(id)}`);
};
export const fetchPromoProducts = async (page: number, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get("/material/fetch-user-products", { params: { page, limit: 50 }, signal });
  return normalizePromoProducts(data.data, page);
};
