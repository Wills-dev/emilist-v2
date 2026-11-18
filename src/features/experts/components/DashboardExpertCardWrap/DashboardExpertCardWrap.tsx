"use client";

import { motion } from "framer-motion";
import type { FilterState } from "@/lib/hooks/useFilters";
import { useExpertListing } from "@/features/businesses/hooks/useExpertListing";
import ExpertCard from "../ExpertCard/ExpertCard";
import ExpertCardSkeleton from "../ExpertCard/ExpertCardSkeleton";
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
  const { experts: visibleExperts, query: listing, sentinelRef, retry, loadMore } = useExpertListing(filters, query, batchSize, savedOnly);
  const hasMore = listing.hasNextPage;
  if (listing.isPending) return <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2">{Array.from({ length: batchSize }, (_, index) => <ExpertCardSkeleton key={index} />)}</div>;
  if (listing.isError && !listing.data) return <div role="alert" className="p-6 text-sm">Unable to load experts. <button type="button" onClick={retry} className="text-[#18A154] underline">Try again</button></div>;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
      }}
      className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {visibleExperts.map((expert) => (
        <motion.div
          key={expert.id}
          className="min-w-0"
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
        <div className="col-span-full w-full rounded-lg bg-[#F9F9F9] px-6 py-12 text-center text-sm text-[#5E625F]">
          {savedOnly
            ? "No saved experts match your search or filters."
            : "No experts match your search or filters."}
        </div>
      )}
      {(visibleExperts.length > 0 || hasMore) && (
        <div
          ref={sentinelRef}
          className="col-span-full w-full py-4 text-center text-sm text-[#737774]"
        >
          {hasMore ? <button type="button" disabled={listing.isFetchingNextPage} onClick={loadMore}>{listing.isFetchingNextPage ? "Loading experts…" : "Load more experts"}</button> : "You’ve reached the end — no more experts to fetch."}
        </div>
      )}
    </motion.div>
  );
};

export default DashboardExpertCardWrap;
