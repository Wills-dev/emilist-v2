"use client";

import { useExpertReviewList } from "../../hooks/useExpertReviewList";
import type { ExpertDetailsData } from "../../types/expertDetails";

import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import { routes } from "@/lib/helpers/routes";

const ExpertReviewSummary = ({
  expertId,
  publicPage = false,
  reviewsHref,
  data,
}: {
  data?: ExpertDetailsData["reviews"];
  expertId: string;
  publicPage?: boolean;
  reviewsHref?: string;
}) => {
  const summary = data ?? { totalReviews: 0, totalComments: 0, averageRating: 0, reviews: [] };
  const { submittedQuery, setSubmittedQuery, setSearch, visibleReviews: reviews } = useExpertReviewList(data?.reviews ?? []);

  return (
    <div id="expert-reviews" className="w-full space-y-6">
      <ReviewBreakdown
        totalReviews={summary.totalReviews}
        reviewBreakdown={summary.ratingDistribution}
        titleClassName="text-lg"
      />
      <RatingSummary
        title="Expert Rating"
        rating={summary.averageRating}
        variant={publicPage ? "primary" : "tertiary"}
      />
      <CommentWrapper
        totalComments={
          submittedQuery
            ? reviews.length
            : summary.totalComments
        }
        variant="small"
        onSubmit={setSubmittedQuery}
        setSearch={setSearch}
        link={
          reviewsHref ??
          (publicPage
            ? routes.marketplace.expertInfoReviews(expertId)
            : routes.dashboardLinks.marketplaceExpertReviews(expertId))
        }
        reviews={reviews}
        sectionVariant={publicPage ? "primary" : "tertiary"}
      />
    </div>
  );
};

export default ExpertReviewSummary;
