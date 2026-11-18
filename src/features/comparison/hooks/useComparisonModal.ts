"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { useComparisonStore } from "@/store/comparisonStore";
import { compareBusiness } from "@/features/businesses/api/compareBusiness";
import { useComparedBusinesses } from "@/features/businesses/hooks/useComparedBusinesses";
import { businessKeys } from "@/features/businesses/queries/businessKeys";
import { compareMaterial, getComparedMaterials } from "@/features/materials/api";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import type { ComparisonItem, ComparisonType } from "../types";

const destinations = { material: routes.dashboardLinks.materialsCompare, job: routes.dashboardLinks.compareJobs, expert: routes.dashboardLinks.compareExperts };

export const useComparisonModal = (type: ComparisonType, item: ComparisonItem) => {
  const [open, setOpen] = useState(false);
  const userId = useStore((state) => state.currentUser?._id);
  const router = useRouter();
  const queryClient = useQueryClient();
  const selections = useComparisonStore((state) => state.selections);
  const add = useComparisonStore((state) => state.add);
  const pending = useRef(false);
  const materials = useQuery({ queryKey: ["compared materials", userId], queryFn: getComparedMaterials, enabled: type === "material" && open && Boolean(userId), staleTime: 30_000, retry: 1 });
  const businesses = useComparedBusinesses(type === "expert" && open);
  const localSelected = Boolean(userId && selections[userId]?.[type]?.some((entry) => entry.id === item.id));
  const selected = type === "expert" ? Boolean(businesses.data?.some((entry) => entry._id === item.id)) : type === "material" && materials.data ? materials.data.enhancedProducts.some((entry) => entry._id === item.id) : localSelected;
  const checking = type === "expert" ? businesses.isFetching : type === "material" ? materials.isFetching : false;
  const checkFailed = Boolean(userId && (type === "expert" ? businesses.isError : type === "material" ? materials.isError : false));
  const mutation = useMutation({
    mutationFn: (id: string) => type === "expert" ? compareBusiness(id) : compareMaterial(id),
    onSuccess: async () => {
      if (type === "expert") await queryClient.invalidateQueries({ queryKey: businessKeys.all });
      else {
        if (userId) add(userId, type, item);
        await queryClient.invalidateQueries({ queryKey: ["compared materials"] });
      }
    },
    onError: promiseErrorFunction,
    onSettled: () => { pending.current = false; },
  });
  const requireLogin = () => {
    if (userId) return true;
    setOpen(false);
    useStore.getState().setPendingFlow(null, {}, window.location.pathname + window.location.search, true);
    return false;
  };
  const show = () => setOpen(true);
  const changeOpen = (value: boolean) => { if (!pending.current) setOpen(value); };
  const addItem = () => {
    if (!requireLogin() || (selected && type !== "expert") || pending.current || !item.id || checking || checkFailed) return;
    if (type !== "job") { pending.current = true; mutation.mutate(item.id); }
    else add(userId!, type, item);
  };
  const viewComparison = () => { if (requireLogin()) { setOpen(false); router.push(destinations[type]); } };
  const retry = () => { if (type === "expert") void businesses.refetch(); else void materials.refetch(); };
  return { open, selected, checkFailed, retry, canRemove: type === "expert", busy: mutation.isPending || checking, show, changeOpen, addItem, viewComparison };
};
