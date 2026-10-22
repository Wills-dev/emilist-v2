"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useUserBusinesses } from "@/features/businesses/hooks/useUserBusinesses";
import type { UserExpertService } from "../types/expertService";
import { updateExpertBusiness } from "../api";

export const useExpertServicesSettings = () => {
  const businesses = useUserBusinesses();
  const queryClient = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const [overrides, setOverrides] = useState<Record<string, UserExpertService>>({});
  const experts = (businesses.data ?? []).map((item) => overrides[item.id] ?? item);
  const [activeId, setActiveId] = useState("");
  const activeExpert = experts.find((expert) => expert.id === activeId) ?? experts[0];
  const updateExpertLocally = (updated: UserExpertService) =>
    setOverrides((items) => ({ ...items, [updated.id]: updated }));
  const mutation = useMutation({ mutationFn: updateExpertBusiness, onSuccess: (_, updated) => { setOverrides((items) => ({ ...items, [updated.id]: updated })); void queryClient.invalidateQueries({ queryKey: ["user-businesses", userId] }); toast.success("Expert service updated successfully."); }, onError: promiseErrorFunction });
  return { isLoading: businesses.isPending, isError: businesses.isError, refetch: businesses.refetch, experts, activeId: activeExpert?.id ?? "", setActiveId, activeExpert, updateExpertLocally, saveExpert: mutation.mutate, isSaving: mutation.isPending };
};
