"use client";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createSellerPromo, deleteSellerPromo, fetchPromoProducts, fetchSellerPromos, updateSellerPromo } from "../api";

export const promoKeys = { all: ["seller-promos"] as const, seller: (userId?: string) => ["seller-promos", userId] as const };
export const useSellerPromos = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({ queryKey: promoKeys.seller(userId), queryFn: ({ signal }) => fetchSellerPromos(signal), enabled: Boolean(userId), staleTime: 60_000, retry: 1 });
};
export const usePromoProducts = () => {
  const userId = useStore((state) => state.currentUser?._id);
  return useInfiniteQuery({ queryKey: ["promo-products", userId], queryFn: ({ pageParam, signal }) => fetchPromoProducts(pageParam, signal), initialPageParam: 1, getNextPageParam: (lastPage) => lastPage.nextPage, enabled: Boolean(userId), staleTime: 30_000, retry: 1 });
};
export const usePromoMutations = () => {
  const client = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const refresh = async () => { await Promise.all([client.invalidateQueries({ queryKey: promoKeys.seller(userId) }), client.invalidateQueries({ queryKey: ["cart"] })]); };
  const onError = (error: unknown) => isAxiosError(error) ? promiseErrorFunction(error) : toast.error(error instanceof Error ? error.message : "Unable to save promo.");
  const create = useMutation({ mutationFn: createSellerPromo, onSuccess: refresh, onError });
  const update = useMutation({ mutationFn: updateSellerPromo, onSuccess: refresh, onError });
  const remove = useMutation({ mutationFn: deleteSellerPromo, onSuccess: refresh, onError });
  return { create, update, remove };
};
