"use client";
import { useComparedBusinesses } from "@/features/businesses/hooks/useComparedBusinesses";
import { downloadComparison } from "@/features/comparison/helpers/downloadComparison";
import { mapComparedBusiness } from "@/features/businesses/helpers/mapComparedBusiness";

export const useComparedExperts = () => {
  const query = useComparedBusinesses();
  const experts = (query.data ?? []).map(mapComparedBusiness);
  const downloadReport = () => {
    const headers = ["Expert", "Rate", "Currency", "Experience", "Rating", "Reviews", "Service", "Jobs Completed", "Notice Period", "Location", "Credentials", "Languages", "Insurance"];
    const rows = experts.map((expert) => [expert.name, expert.price, expert.currency, expert.experience, expert.rating, expert.reviewCount, expert.serviceCategory, expert.jobsCompleted, expert.noticePeriod, expert.location, expert.credentials.join("; "), expert.languages, expert.insurance]);
    downloadComparison("expert-comparison.csv", headers, rows);
  };
  const retry = () => { void query.refetch(); };
  return { query, retry, loading: query.isPending, error: query.isError, experts, downloadReport };
};
