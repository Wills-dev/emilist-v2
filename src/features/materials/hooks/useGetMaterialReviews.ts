import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getMaterialReviews } from "../api";
import { usePagination } from "@/lib/hooks/usePagination";

export const useGetMaterialReviews = ({
  materialId,
  limit = 10,
  sortBy = "mostRelevant",
}: {
  materialId: string;
  limit?: number;
  sortBy?: string;
}) => {
  const pagination = usePagination();
  const [search, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

  const reviewsQuery = useQuery({
    queryKey: [
      "material reviews",
      materialId,
      limit,
      sortBy,
      submittedQuery,
      pagination.currentPage,
    ],
    queryFn: () =>
      getMaterialReviews({
        materialId,
        page: pagination.currentPage,
        limit,
        sortBy,
        search: submittedQuery,
      }),
    enabled: Boolean(materialId),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    ...reviewsQuery,
    ...pagination,
    search,
    submittedQuery,
    setSearch,
    handleSearch: (query = search) => {
      const normalizedQuery = query.trim();
      setSearch(normalizedQuery);
      setSubmittedQuery(normalizedQuery || null);
      pagination.reset();
    },
  };
};
