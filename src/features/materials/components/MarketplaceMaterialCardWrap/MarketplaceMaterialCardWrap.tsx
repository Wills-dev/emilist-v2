"use client";

import { motion } from "framer-motion";

import MaterialCard from "../MaterialCard/MaterialCard";
import MaterialCardSkeleton from "../MaterialCard/MaterialCardSkeleton";
import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";
import { MaterialListItem } from "../../types";

interface MarketplaceMaterialCardWrapProps {
  materials?: MaterialListItem[];
  isLoading?: boolean;
  isError?: boolean;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  getReviewsHref?: (materialId: string) => string;
}

const MarketplaceMaterialCardWrap = ({
  materials = [],
  isLoading = false,
  isError = false,
  fetchNextPage = () => undefined,
  hasNextPage = false,
  isFetchingNextPage = false,
  emptyTitle = "No materials found",
  emptyDescription = "Try changing your search or filters.",
  getReviewsHref,
}: MarketplaceMaterialCardWrapProps) => {
  const sentinelRef = useInfiniteScrollTrigger({
    onIntersect: fetchNextPage,
    enabled: hasNextPage && !isFetchingNextPage,
    threshold: 0.25,
  });

  if (isError) {
    return (
      <div className="rounded-lg bg-[#F9F9F9] px-6 py-12 text-center text-sm text-[#5E625F]">
        We couldn&apos;t load the materials. Please try again.
      </div>
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
      className="flex flex-wrap gap-6 xl:max-h-screen xl:overflow-y-auto no-scrollbar"
    >
      {isLoading
        ? Array.from({ length: 4 }, (_, index) => (
            <MaterialCardSkeleton key={index} />
          ))
        : materials.map((material) => {
            const location =
              [material.delivery?.city, material.delivery?.state]
                .filter(Boolean)
                .join(", ") ||
              "Delivery location not specified";

            return (
              <motion.div
                key={material.id}
                variants={{
                  hidden: { opacity: 0, y: 18, scale: 0.985 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                layout
              >
                <MaterialCard
                id={material.id}
                productName={material.name}
                price={material.price}
                unit={material.unit}
                location={location}
                createdAt={material.createdAt}
                isLiked={material.isLiked ?? false}
                currency={material.currency}
                imgUrl={
                  material.thumbnail ||
                  material.images?.[0]?.url ||
                  "/assets/images/default-job-image.svg"
                }
                profileImg={material.merchant.logo ?? undefined}
                fullName={
                  material.merchant.businessName ||
                  material.merchant.displayName ||
                  "Merchant"
                }
                rating={material.merchant.rating ?? material.averageRating}
                noOfReviews={
                  material.merchant.totalReviews ?? material.reviewCount
                }
                  sellerId={material.merchant.id}
                  reviewsHref={getReviewsHref?.(material.id)}
                />
              </motion.div>
            );
          })}

      {!isLoading && materials.length === 0 && (
        <div className="w-full rounded-lg bg-[#F9F9F9] px-6 py-12 text-center">
          <p className="font-exo font-semibold text-[#303431]">
            {emptyTitle}
          </p>
          <p className="mt-1 text-sm text-[#737774]">
            {emptyDescription}
          </p>
        </div>
      )}

      {materials.length > 0 && (
        <div
          ref={sentinelRef}
          className="w-full py-4 text-center text-sm text-[#737774]"
        >
          {isFetchingNextPage
            ? "Loading more materials..."
            : !hasNextPage
              ? "You’ve reached the end — no more materials to fetch."
              : "Scroll down to load more materials"}
        </div>
      )}
    </motion.div>
  );
};

export default MarketplaceMaterialCardWrap;
