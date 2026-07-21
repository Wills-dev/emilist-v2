"use client";

import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";
import { MaterialReviewsResponse } from "../../types";

const MaterialReviewSummary = ({
  reviewLink,
  reviews,
  variant = "primary",
}: {
  reviewLink: string;
  reviews?: MaterialReviewsResponse;
  variant?: "primary" | "tertiary";
}) => {
  const { handleSubmit, setSearch } = useGeneralSearch();

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
          totalComments={reviews?.numberOfRatings ?? 0}
          variant="small"
          onSubmit={handleSubmit}
          setSearch={setSearch}
          link={reviewLink}
          reviews={reviews?.reviews ?? []}
          sectionVariant={variant}
        />
      </div>
    </div>
  );
};

export default MaterialReviewSummary;
