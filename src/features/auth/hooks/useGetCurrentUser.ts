import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { getCurrentUser } from "../api";

export const useGetCurrentUser = () => {
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const clearCurrentUser = useStore((state) => state.clearCurrentUser);

  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    enabled: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  useEffect(() => {
    if (query.data) {
      setCurrentUser(query.data);
    }
    if (query.isError) {
      clearCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.data, query.isError]);

  return query;
};
