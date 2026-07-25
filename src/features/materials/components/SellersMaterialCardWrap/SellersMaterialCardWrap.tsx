"use client";

import { motion } from "framer-motion";

import MaterialCard from "../MaterialCard/MaterialCard";
import MaterialCardSkeleton from "../MaterialCard/MaterialCardSkeleton";
import { OtherSellerProduct, SimilarProduct } from "../../types";
import { useInfiniteScrollTrigger } from "@/lib/hooks/useInfiniteScrollTrigger";

const SellersMaterialCardWrap = ({
  materials,
  isLoading,
  emptyDescription = "This seller has no other products.",
  hasNextPage,
  isFetchingNextPage = false,
  onLoadMore = () => undefined,
  grid = false,
}: {
  materials: Array<OtherSellerProduct | SimilarProduct>;
  isLoading: boolean;
  emptyDescription?: string;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  onLoadMore?: () => void;
  grid?: boolean;
}) => {
  const sentinelRef = useInfiniteScrollTrigger({
    onIntersect: onLoadMore,
    enabled: Boolean(hasNextPage) && !isFetchingNextPage,
    threshold: 0.25,
  });

  return (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="w-full"
  >
    <div
      className={
        grid
          ? "flex flex-wrap gap-6 w-full"
          : "flex items-center overflow-x-auto max-lg:flex-wrap gap-6 w-full no-scrollbar"
      }
    >
      {isLoading
        ? Array.from({ length: 2 }, (_, index) => (
            <MaterialCardSkeleton key={index} />
          ))
        : materials.map((material) => {
            const isSimilarProduct = "averageRating" in material;
            const averageRating = isSimilarProduct
              ? material.averageRating ?? 0
              : material.reviews.length > 0
                ? material.reviews.reduce(
                    (total, review) => total + review.rating,
                    0,
                  ) / material.reviews.length
                : 0;
            const storeName =
              "storeName" in material &&
              material.storeName !== material.merchantName
                ? material.storeName
                : "";
            const availability = `${material.availableQuantity} ${material.quantityMetric} available`;
            const merchantDetail = [storeName, availability]
              .filter(Boolean)
              .join(" • ");

            return (
              <MaterialCard
              key={material._id}
              id={material._id}
              productName={material.name}
              price={material.price}
              unit={material.priceMetric}
              location={
                [
                  material.deliveryLocations[0]?.lga,
                  material.deliveryLocations[0]?.state,
                ]
                  .filter(Boolean)
                  .join(", ") || "Delivery location not specified"
              }
              createdAt={material.createdAt}
              isLiked={"liked" in material ? material.liked : false}
              currency={material.currency}
              imgUrl={
                material.images.find((image) => image.isPrimary)?.imageUrl ||
                material.images[0]?.imageUrl ||
                "/assets/images/default-job-image.svg"
              }
              fullName={
                material.merchantName ||
                ("storeName" in material ? material.storeName : "Merchant")
              }
              rating={averageRating}
              noOfReviews={
                isSimilarProduct
                  ? material.numberOfRatings
                  : material.reviews.length
              }
              sellerId={
                "user" in material ? material.user._id : material.userId._id
              }
              merchantDetail={merchantDetail}
            />
            );
          })}

      {!isLoading && materials.length === 0 && (
        <p className="w-full py-12 text-center text-sm text-[#737774]">
          {emptyDescription}
        </p>
      )}
      {!isLoading && materials.length > 0 && hasNextPage !== undefined && (
        <div
          ref={sentinelRef}
          className="w-full py-4 text-center text-sm text-[#737774]"
        >
          {isFetchingNextPage
            ? "Loading more materials..."
            : hasNextPage
              ? "Scroll down to load more materials"
              : "You’ve reached the end — no more materials to fetch."}
        </div>
      )}
    </div>
  </motion.section>
  );
};

export default SellersMaterialCardWrap;
