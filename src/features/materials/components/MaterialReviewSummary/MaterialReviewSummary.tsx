import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";

const MaterialReviewSummary = () => {
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
    </div>
  );
};

export default MaterialReviewSummary;
