"use client";

import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchApplicants } from "../api/fetchApplicants";
import { mapJobApplicant } from "../helpers/jobApplicants";
import { jobKeys } from "../queries/jobKeys";
import type { FetchApplicantsQuery } from "../types/applicants";

export const useJobApplicants = (query: FetchApplicantsQuery, ownerId: string) => {
  const userId = useStore((state) => state.currentUser?._id);
  return useQuery({
    queryKey: [...jobKeys.all, "applicants", userId, query],
    queryFn: ({ signal }) => fetchApplicants(query, signal),
    select: (page) => ({ ...page, applicants: page.applicants.map(mapJobApplicant) }),
    enabled: Boolean(query.jobId && userId && userId === ownerId),
    staleTime: 60 * 1000,
    retry: 1,
  });
};
