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

const ExpertReviewSummary = ({ expertId }: { expertId: string }) => {
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
    <div id="expert-reviews" className="w-full max-w-87.75 space-y-6">
      <ReviewBreakdown
        totalReviews={dashboardExpertReviewSummary.totalReviews}
        reviewBreakdown={dashboardExpertReviewSummary.ratingDistribution}
        titleClassName="text-lg"
      />
      <RatingSummary
        title="Expert Rating"
        rating={dashboardExpertReviewSummary.averageRating}
        variant="tertiary"
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
        link={routes.dashboardLinks.marketplaceExpertReviews(expertId)}
        reviews={reviews}
        sectionVariant="tertiary"
      />
    </div>
  );
};

export default ExpertReviewSummary;
