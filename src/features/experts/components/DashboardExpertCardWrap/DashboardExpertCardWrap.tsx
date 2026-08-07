"use client";

import { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { FilterState } from "@/lib/hooks/useFilters";
import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";
import { dashboardExperts } from "../../constants/dummy";
import ExpertCard from "../ExpertCard/ExpertCard";
import { routes } from "@/lib/helpers/routes";

const BATCH_SIZE = 4;

const DashboardExpertCardWrap = ({
  query,
  filters,
  savedOnly = false,
  publicLinks = false,
  batchSize = BATCH_SIZE,
}: {
  query: string | null;
  filters: FilterState;
  savedOnly?: boolean;
  publicLinks?: boolean;
  batchSize?: number;
}) => {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const experts = useMemo(() => {
    const search = query?.toLowerCase();
    return dashboardExperts
      .filter((expert) => {
        if (savedOnly && !expert.isLiked) return false;
        const matchesSearch =
          !search ||
          [expert.businessName, expert.serviceType, expert.location].some(
            (value) => value.toLowerCase().includes(search),
          );
        const matchesCategory =
          filters.categories.length === 0 ||
          filters.categories.includes(expert.serviceType);
        const matchesLocation =
          !filters.location ||
          expert.state.toLowerCase().includes(filters.location.toLowerCase()) ||
          expert.location
            .toLowerCase()
            .includes(filters.location.toLowerCase());
        const matchesLevel = !filters.level || expert.level === filters.level;
        const matchesRating =
          !filters.rating || expert.rating === Number(filters.rating);
        const min = Number(filters.minPrice?.replaceAll(",", "") || 0) * 1000;
        const max = Number(filters.maxPrice?.replaceAll(",", "") || 0) * 1000;
        const matchesPrice =
          (!min || expert.price >= min) && (!max || expert.price <= max);
        return (
          matchesSearch &&
          matchesCategory &&
          matchesLocation &&
          matchesLevel &&
          matchesRating &&
          matchesPrice
        );
      })
      .sort((a, b) => {
        if (filters.sortBy === "asc") return a.price - b.price;
        if (filters.sortBy === "desc") return b.price - a.price;
        if (filters.sortBy === "highest_rated") return b.rating - a.rating;
        if (filters.sortBy === "lowest_rated") return a.rating - b.rating;
        return 0;
      });
  }, [filters, query, savedOnly]);
  const visibleExperts = experts.slice(0, visibleCount);
  const hasMore = visibleCount < experts.length;
  const loadMore = useCallback(
    () =>
      setVisibleCount((count) => Math.min(count + batchSize, experts.length)),
    [batchSize, experts.length],
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
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="flex flex-wrap gap-6"
    >
      {visibleExperts.map((expert) => (
        <motion.div
          key={expert.id}
          variants={{
            hidden: { opacity: 0, y: 18, scale: 0.985 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          layout
        >
          <ExpertCard
            id={expert.id}
            imgUrl={expert.imgUrl}
            busniessName={expert.businessName}
            isVerified={expert.isVerified}
            rating={expert.rating}
            noOfReviews={expert.noOfReviews}
            price={expert.price}
            period={expert.period}
            currency={expert.currency}
            location={expert.location}
            noOfCompletedJobs={expert.noOfCompletedJobs}
            serviceType={expert.serviceType}
            level={expert.level}
            isLiked={expert.isLiked}
            profileHref={
              publicLinks
                ? routes.marketplace.expertInfo(expert.id)
                : routes.dashboardLinks.marketplaceExpertInfo(expert.id)
            }
            compareHref={
              publicLinks ? undefined : routes.dashboardLinks.compareExperts
            }
            reviewsHref={
              publicLinks
                ? undefined
                : routes.dashboardLinks.marketplaceExpertReviews(expert.id)
            }
          />
        </motion.div>
      ))}
      {visibleExperts.length === 0 && (
        <div className="w-full rounded-lg bg-[#F9F9F9] px-6 py-12 text-center text-sm text-[#5E625F]">
          {savedOnly
            ? "No saved experts match your search or filters."
            : "No experts match your search or filters."}
        </div>
      )}
      {visibleExperts.length > 0 && (
        <div
          ref={sentinelRef}
          className="w-full py-4 text-center text-sm text-[#737774]"
        >
          {hasMore
            ? "Scroll down to load more experts"
            : "You’ve reached the end — no more experts to fetch."}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardExpertCardWrap;
