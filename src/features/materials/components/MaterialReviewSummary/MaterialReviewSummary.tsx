"use client";

import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import { useGetMaterialReviews } from "../../hooks/useGetMaterialReviews";

const MaterialReviewSummary = ({
  materialId,
  reviewLink,
  variant = "primary",
}: {
  materialId: string;
  reviewLink: string;
  variant?: "primary" | "tertiary";
}) => {
  const {
    data: reviews,
    handleSearch,
    setSearch,
    submittedQuery,
    isFetching,
  } = useGetMaterialReviews({ materialId, limit: 3 });

  return (
    <div className="max-w-96.75 w-full">
      <div className="space-y-6">
        <ReviewBreakdown
          totalReviews={reviews?.numberOfRatings ?? 0}
          reviewBreakdown={reviews?.ratingDistribution}
        />
        <RatingSummary
          title="Merchant Rating"
          rating={reviews?.averageRating ?? 0}
          variant={variant}
        />
        <CommentWrapper
          totalComments={
            submittedQuery
              ? reviews?.reviews?.length ?? 0
              : reviews?.numberOfRatings ?? 0
          }
          variant="small"
          onSubmit={handleSearch}
          setSearch={setSearch}
          link={reviewLink}
          reviews={reviews?.reviews ?? []}
          sectionVariant={variant}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
};

export default MaterialReviewSummary;
