"use client";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useQueries } from "@tanstack/react-query";
import { useSelectedComparisons } from "@/features/comparison/hooks/useSelectedComparisons";
import { downloadComparison } from "@/features/comparison/helpers/downloadComparison";
import { fetchJobById } from "../api/fetchJobById";
import { mapJobDetails } from "../helpers/jobDetails";
import { jobKeys } from "../queries/jobKeys";
import type { CompareJobItem } from "../types";

export const useComparedJobs = () => {
  const router = useRouter();
  const initialized = useStore((state) => state.isAuthInitialized);
  const browseJobs = () => router.push(routes.dashboardLinks.marketplaceJobs);
  const { items, userId } = useSelectedComparisons("job");
  const queries = useQueries({ queries: items.map((item) => ({ queryKey: [...jobKeys.detail(item.id), userId], queryFn: ({ signal }: { signal: AbortSignal }) => fetchJobById({ id: item.id }, signal), staleTime: 60_000, retry: 1 })) });
  const jobs: CompareJobItem[] = queries.flatMap((query) => {
    if (!query.data) return [];
    const job = mapJobDetails(query.data);
    return [{ id: job.id, title: job.title, description: job.description.join("\n"), price: job.price, currency: job.currency, ownerId: job.ownerId, ownerName: job.ownerName, rating: job.ownerRating, reviewCount: job.ownerReviewCount, credentials: [], category: job.category, location: job.location, experience: job.level, noticePeriod: job.urgency || "—", languages: "—", employerRating: job.ownerRating, employerReviews: job.ownerReviewCount, jobsPosted: 0 }];
  });
  const downloadReport = () => downloadComparison("job-comparison.csv", ["Job", "Budget", "Currency", "Category", "Location", "Experience", "Employer Rating"], jobs.map((job) => [job.title, job.price, job.currency, job.category, job.location, job.experience, job.employerRating]));
  const retry = () => { queries.forEach((query) => { if (query.isError) void query.refetch(); }); };
  return { jobs, browseJobs, loading: !initialized || queries.some((query) => query.isPending), error: queries.some((query) => query.isError), retry, downloadReport };
};
