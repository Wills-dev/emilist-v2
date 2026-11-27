"use client";

import { useExpertDetails } from "@/features/businesses/hooks/useExpertDetails";
import { routes } from "@/lib/helpers/routes";

export const useApplicantProfile = (jobId: string, expertId: string, tab: string) => {
  const business = useExpertDetails(expertId);
  return {
    details: business.details,
    loading: business.isPending,
    error: business.isError,
    retry: business.retry,
    backHref: routes.dashboardLinks.jobApplicants(jobId, tab),
    profileHref: routes.dashboardLinks.jobApplicantInfo(jobId, expertId, tab),
    reviewsHref: routes.dashboardLinks.jobApplicantReviews(jobId, expertId, tab),
  };
};
