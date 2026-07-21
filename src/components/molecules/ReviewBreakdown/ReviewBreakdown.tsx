import StarIcon from "@/components/atoms/icons/StarIcon";
import ReviewCard from "@/components/atoms/ReviewCard/ReviewCard";

const ReviewBreakdown = ({
  totalReviews,
  reviewBreakdown,
  titleClassName = "sm:text-2xl",
  variant = "primary",
}: {
  totalReviews: number;
  titleClassName?: string;
  variant?: "primary" | "tertiary";
  reviewBreakdown?: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}) => {
  return (
    <div className={`w-full space-y-6 "max-sm:bg-[#F6F7F9] max-sm:p-6"}`}>
      <div className="flex items-center gap-2">
        <span className="text-[#FF9933]">
          <StarIcon />
        </span>{" "}
        <h6
          className={`text-[#030A05] font-semibold font-exo ${titleClassName}`}
        >
          {totalReviews} Reviews
        </h6>
      </div>
      <div className="space-y-6">
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.[5] || 0}
          starNumber={5}
          variant={variant}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.[4] || 0}
          starNumber={4}
          variant={variant}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.[3] || 0}
          starNumber={3}
          variant={variant}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.[2] || 0}
          starNumber={2}
          variant={variant}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.[1] || 0}
          starNumber={1}
          variant={variant}
        />
      </div>
    </div>
  );
};

export default ReviewBreakdown;
