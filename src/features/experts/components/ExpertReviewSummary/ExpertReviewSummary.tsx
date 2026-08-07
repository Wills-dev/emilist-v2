"use client";

import { useMemo, useState } from "react";

import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import {
  dashboardExpertReviews,
  dashboardExpertReviewSummary,
} from "../../constants/dummy";
import { routes } from "@/lib/helpers/routes";

const ExpertReviewSummary = ({
  expertId,
  publicPage = false,
}: {
  expertId: string;
  publicPage?: boolean;
}) => {
  const [, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const reviews = useMemo(() => {
    const query = submittedQuery.trim().toLowerCase();
    if (!query) return dashboardExpertReviews;
    return dashboardExpertReviews.filter((review) =>
      `${review.user?.firstName ?? ""} ${review.user?.lastName ?? ""} ${review.comment ?? ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [submittedQuery]);

  return (
    <div id="expert-reviews" className="w-full space-y-6">
      <ReviewBreakdown
        totalReviews={dashboardExpertReviewSummary.totalReviews}
        reviewBreakdown={dashboardExpertReviewSummary.ratingDistribution}
        titleClassName="text-lg"
      />
      <RatingSummary
        title="Expert Rating"
        rating={dashboardExpertReviewSummary.averageRating}
        variant={publicPage ? "primary" : "tertiary"}
      />
      <CommentWrapper
        totalComments={
          submittedQuery
            ? reviews.length
            : dashboardExpertReviewSummary.totalComments
        }
        variant="small"
        onSubmit={setSubmittedQuery}
        setSearch={setSearch}
        link={
          publicPage
            ? routes.marketplace.expertInfoReviews(expertId)
            : routes.dashboardLinks.marketplaceExpertReviews(expertId)
        }
        reviews={reviews}
        sectionVariant={publicPage ? "primary" : "tertiary"}
      />
    </div>
  );
};

export default ExpertReviewSummary;
