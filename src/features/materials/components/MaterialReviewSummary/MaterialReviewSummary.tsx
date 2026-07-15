"use client";

import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";

const MaterialReviewSummary = ({ reviewLink }: { reviewLink: string }) => {
  const { handleSubmit, setSearch } = useGeneralSearch();

  const reviewBreakdown = {
    one: 0,
    two: 33,
    three: 10,
    four: 4,
    five: 13,
  };

  return (
    <div className="space-y-6">
      <ReviewBreakdown totalReviews={51} reviewBreakdown={reviewBreakdown} />
      <RatingSummary title="Merchant Rating" rating={4.3} />
      <CommentWrapper
        totalComments={100}
        variant="small"
        onSubmit={handleSubmit}
        setSearch={setSearch}
        link={reviewLink}
        limit={3}
      />
    </div>
  );
};

export default MaterialReviewSummary;
