import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { businessKeys } from "../queries/businessKeys";
import { toggleBusinessLike } from "../api/toggleBusinessLike";
import { updateBusinessLikeCache } from "../helpers/updateBusinessLikeCache";

export const useToggleBusinessLike = (businessId: string, initialLiked: boolean) => {
  const client = useQueryClient();
  const userId = useStore((state) => state.currentUser?._id);
  const openModal = useStore((state) => state.openModal);
  const busy = useRef(false);
  const mutation = useMutation({
    mutationFn: (liked: boolean) => toggleBusinessLike(businessId, liked),
    onMutate: async (liked) => {
      await client.cancelQueries({ queryKey: businessKeys.all });
      const previous = client.getQueriesData({ queryKey: businessKeys.all });
      client.setQueriesData<Parameters<typeof updateBusinessLikeCache>[0]>({ queryKey: businessKeys.all }, (data) => updateBusinessLikeCache(data, businessId, liked));
      return { previous };
    },
    onError: (_error, _liked, context) => {
      context?.previous.forEach(([key, data]) => client.setQueryData(key, data));
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
