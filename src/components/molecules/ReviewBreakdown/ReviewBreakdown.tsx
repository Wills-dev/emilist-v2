import StarIcon from "@/components/atoms/icons/StarIcon";
import ReviewCard from "@/components/atoms/ReviewCard/ReviewCard";

const ReviewBreakdown = ({
  totalReviews,
  reviewBreakdown,
  titleClassName = "sm:text-2xl",
}: {
  totalReviews: number;
  titleClassName?: string;
  reviewBreakdown: {
    one: number;
    two: number;
    three: number;
    four: number;
    five: number;
  };
}) => {
  return (
    <div className="w-full space-y-6 max-sm:bg-[#F6F7F9] max-sm:p-6">
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
          rating={reviewBreakdown?.five}
          starNumber={5}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.four}
          starNumber={4}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.three}
          starNumber={3}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.two}
          starNumber={2}
        />
        <ReviewCard
          totalReviews={totalReviews}
          rating={reviewBreakdown?.one}
          starNumber={1}
        />
      </div>
    </div>
  );
};

export default ReviewBreakdown;
