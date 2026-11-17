import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { businessKeys } from "../queries/businessKeys";
import { toggleBusinessLike } from "../api/toggleBusinessLike";
import type { BusinessProfile } from "../types/profile";

export const useToggleBusinessLike = (businessId: string, initialLiked: boolean) => {
  const client = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const openModal = useStore((state) => state.openModal);
  const busy = useRef(false);
  const key = businessKeys.profile(businessId, userId);
  const mutation = useMutation({
    mutationFn: (liked: boolean) => toggleBusinessLike(businessId, liked),
    onMutate: async (liked) => {
      await client.cancelQueries({ queryKey: key });
      const previous = client.getQueryData<BusinessProfile>(key);
      client.setQueryData<BusinessProfile>(key, (profile) => profile ? {
        ...profile, business: { ...profile.business, liked, isLiked: liked },
      } : profile);
      return { previous };
    },
    onError: (_error, _liked, context) => {
      if (context?.previous) client.setQueryData(key, context.previous);
      toast.error("Could not update this business. Please try again.");
    },
    onSettled: async () => {
      await client.invalidateQueries({ queryKey: businessKeys.all }); busy.current = false;
    },
    retry: false,
  });
  const toggle = () => {
    if (!userId) { openModal("login"); return; }
    if (!businessId || mutation.isPending || busy.current) return;
    busy.current = true; mutation.mutate(!initialLiked);
  };
  return { toggle, busy: mutation.isPending, liked: mutation.isPending ? Boolean(mutation.variables) : initialLiked };
};
