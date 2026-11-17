"use client";

import { useBusinessProfile } from "@/features/businesses/hooks/useBusinessProfile";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchApplicantProfile } from "../api/fetchApplicantProfile";
import { mapApplicantExpertDetails } from "../helpers/mapApplicantExpertDetails";
import { mapJobApplicant } from "../helpers/jobApplicants";
import { jobKeys } from "../queries/jobKeys";
import { useGetJobById } from "./useGetJobById";
import { routes } from "@/lib/helpers/routes";

export const useApplicantProfile = (jobId: string, expertId: string, tab: string) => {
  const userId = useStore((state) => state.currentUser?._id);
  const job = useGetJobById(jobId);
  const allowed = Boolean(userId && job.data?.ownerId === userId);
  const query = useQuery({
    queryKey: [...jobKeys.all, "applicant-profile", userId, jobId, expertId],
    queryFn: ({ signal }) => fetchApplicantProfile(jobId, expertId, signal),
    enabled: allowed, staleTime: 60_000, retry: 1,
    select: (applicant) => applicant ? mapJobApplicant(applicant) : null,
  });
  const businessId = query.data?.businessId ?? "";
  const business = useBusinessProfile(businessId, allowed && Boolean(query.data));
  const retry = () => { void job.refetch(); if (allowed) { void query.refetch(); if (businessId) void business.refetch(); } };
  return {
    applicant: allowed ? query.data : undefined,
    details: allowed && query.data && business.data ? mapApplicantExpertDetails(query.data, business.data) : undefined,
    job: job.data,
    loading: job.isPending || (allowed && query.isPending) || (allowed && Boolean(businessId) && business.isPending),
    error: job.isError || query.isError || business.isError || (!job.isPending && !allowed),
    retry,
    backHref: routes.dashboardLinks.jobApplicants(jobId, tab),
    profileHref: routes.dashboardLinks.jobApplicantInfo(jobId, expertId, tab),
    reviewsHref: routes.dashboardLinks.jobApplicantReviews(jobId, expertId, tab),
  };
};
