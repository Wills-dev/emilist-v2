"use client";

import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";
import { cn } from "@/lib/utils";
import type { JobCardViewModel } from "../../types/listJobs";
import JobCardSkeleton from "../JobCard/JobCardSkeleton";
import JobCardItem from "../JobCardItem/JobCardItem";

interface JobCardListProps {
  jobs: JobCardViewModel[];
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
  onResetFilters?: () => void;
  getDetailsHref: (jobId: string) => string;
  getCompareHref?: (jobId: string) => string;
  getReviewsHref?: (jobId: string) => string;
  className?: string;
}

const JobCardList = ({
  jobs,
  isLoading,
  isError,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  refetch,
  onResetFilters,
  getDetailsHref,
  getCompareHref,
  getReviewsHref,
  className,
}: JobCardListProps) => {
  const sentinelRef = useInfiniteScrollTrigger({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage && !isError,
    threshold: 0.25,
  });

  if (isError && jobs.length === 0) {
    return (
      <EmptyState
        title="Unable to load jobs"
        description="We couldn't fetch the latest jobs. Check your connection and try again."
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.08 },
        },
      }}
      className={cn("flex max-md:justify-center flex-wrap gap-6", className)}
    >
      {isLoading && jobs.length === 0
        ? Array.from({ length: 4 }, (_, index) => (
            <JobCardSkeleton key={index} />
          ))
        : jobs.map((job) => (
            <motion.div
              key={job.id}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.985 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              layout
              className="max-w-[375.5px] w-full sm:min-w-[375.5px] min-w-75"
            >
              <JobCardItem
                job={job}
                detailsHref={getDetailsHref(job.id)}
                compareHref={getCompareHref?.(job.id)}
                reviewsHref={getReviewsHref?.(job.id)}
              />
            </motion.div>
          ))}

      {!isLoading && !isError && jobs.length === 0 && (
        <EmptyState
          title="No jobs found"
          description="Try changing your search or filters."
          actionLabel={onResetFilters ? "Reset filters" : undefined}
          onAction={onResetFilters}
          className="min-h-64"
        />
      )}

      {jobs.length > 0 && (
        <div
          ref={sentinelRef}
          aria-live="polite"
          className="w-full py-4 text-center text-sm text-[#737774]"
        >
          {isError ? (
            <div className="flex flex-col items-center gap-2">
              <span>We couldn&apos;t load more jobs.</span>
              <Button
                variant="secondary"
                className="h-8 px-4 py-1 text-xs"
                onClick={refetch}
              >
                Try again
              </Button>
            </div>
          ) : isFetchingNextPage ? (
            "Loading more jobs..."
          ) : !hasNextPage ? (
            "You’ve reached the end — no more jobs to fetch."
          ) : (
            "Scroll down to load more jobs"
          )}
        </div>
      )}
    </motion.div>
  );
};

export default JobCardList;
