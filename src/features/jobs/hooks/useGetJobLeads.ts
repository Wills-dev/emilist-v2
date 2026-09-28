import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useStore } from "@/store/authStore";
import { fetchJobLeads } from "../api/fetchJobLeads";
import { jobKeys } from "../queries/jobKeys";

export const useGetJobLeads = ({
  page = 1,
  limit = 10,
  enabled = true,
}: {
  page?: number;
  limit?: number;
  enabled?: boolean;
}) => {
  const userId = useStore((state) => state.currentUser?._id);
  const query = { page, limit };
  return useQuery({
    queryKey: jobKeys.leads(query, userId),
    queryFn: ({ signal }) => fetchJobLeads(query, signal),
    enabled: enabled && Boolean(userId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: (count, error) => {
      if (
        isAxiosError(error) &&
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      )
        return false;
      return count < 1;
    },
  });
};
