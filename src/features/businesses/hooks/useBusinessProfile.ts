import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { businessKeys } from "../queries/businessKeys";
import { fetchBusinessProfile } from "../api/fetchBusinessProfile";

export const useBusinessProfile = (businessId: string, enabled = true) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: businessKeys.profile(businessId, userId),
    queryFn: ({ signal }) => fetchBusinessProfile(businessId, userId, signal),
    enabled: enabled && Boolean(businessId), staleTime: 60_000, retry: 1,
  });
};
