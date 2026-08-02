"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";
import { FilterState } from "@/lib/hooks/useFilters";
import { routes } from "@/lib/helpers/routes";
import { dashboardJobs } from "../../constants/dummy";
import JobCard from "../JobCard/JobCard";

const BATCH_SIZE = 4;

const DashboardJobCardWrap = ({ query, filters, savedOnly = false }: { query: string | null; filters: FilterState; savedOnly?: boolean }) => {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const filteredJobs = useMemo(() => {
    const search = query?.toLowerCase();
    const filtered = dashboardJobs.filter((job) => {
      if (savedOnly && !job.isLiked) return false;
      const matchesSearch = !search || [job.title, job.description, job.category, job.location].some((value) => value?.toLowerCase().includes(search));
      const matchesCategory = filters.categories.length === 0 || filters.categories.includes(job.category ?? "");
      const matchesLocation = !filters.location || job.state.toLowerCase().includes(filters.location.toLowerCase()) || job.location?.toLowerCase().includes(filters.location.toLowerCase());
      const matchesNotice = !filters.noticePeriod || job.noticePeriod === filters.noticePeriod;
      const matchesLevel = !filters.level || job.level === filters.level;
      const matchesRating = !filters.rating || job.rating === Number(filters.rating);
      const min = Number(filters.minPrice?.replaceAll(",", "") || 0) * 1000;
      const max = Number(filters.maxPrice?.replaceAll(",", "") || 0) * 1000;
      const matchesPrice = (!min || (job.price ?? 0) >= min) && (!max || (job.price ?? 0) <= max);
      return matchesSearch && matchesCategory && matchesLocation && matchesNotice && matchesLevel && matchesRating && matchesPrice;
    });

    return filtered.sort((a, b) => {
      if (filters.sortBy === "oldest") return Number(a.id) - Number(b.id);
      if (filters.sortBy === "asc") return (a.price ?? 0) - (b.price ?? 0);
      if (filters.sortBy === "desc") return (b.price ?? 0) - (a.price ?? 0);
      if (filters.sortBy === "highest_rated") return (b.rating ?? 0) - (a.rating ?? 0);
      if (filters.sortBy === "lowest_rated") return (a.rating ?? 0) - (b.rating ?? 0);
      return Number(b.id) - Number(a.id);
    });
  }, [filters, query, savedOnly]);
  const visibleJobs = filteredJobs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredJobs.length;
  const loadMore = useCallback(
    () => setVisibleCount((count) => Math.min(count + BATCH_SIZE, filteredJobs.length)),
    [filteredJobs.length],
  );
  const sentinelRef = useInfiniteScrollTrigger({
    onIntersect: loadMore,
    enabled: hasMore,
    threshold: 0.25,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className="flex flex-wrap gap-6"
    >
      {visibleJobs.map((job) => (
        <motion.div
          key={job.id}
          variants={{
            hidden: { opacity: 0, y: 18, scale: 0.985 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          layout
        >
          <JobCard
            {...job}
            detailsHref={routes.dashboardLinks.marketplaceJobInfo(job.id ?? "")}
            compareHref={routes.dashboardLinks.compareJobs}
            reviewsHref={routes.dashboardLinks.marketplaceJobReviews(job.id ?? "")}
          />
        </motion.div>
      ))}
      {visibleJobs.length === 0 && (
        <div className="w-full rounded-lg bg-[#F9F9F9] px-6 py-12 text-center text-sm text-[#5E625F]">
          {savedOnly ? "No saved jobs match your search." : "No jobs match your search."}
        </div>
      )}
      {visibleJobs.length > 0 && (
        <div ref={sentinelRef} className="w-full py-4 text-center text-sm text-[#737774]">
          {hasMore ? "Scroll down to load more jobs" : "You’ve reached the end — no more jobs to fetch."}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardJobCardWrap;
