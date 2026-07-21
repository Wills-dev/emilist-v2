const ReviewCard = ({
  starNumber,
  rating,
  totalReviews,
  variant,
}: {
  starNumber: number;
  rating: number;
  totalReviews: number;
  variant?: "primary" | "tertiary";
}) => {
  const width = totalReviews ? `${(rating / totalReviews) * 100}%` : "0%";

  return (
    <div
      className={`flex items-center justify-between sm:gap-4 gap-2 ${rating < 1 ? "opacity-50" : ""}`}
    >
      <p className="text-sm font-medium text-[#5E625F] flex items-center whitespace-nowrap">
        {starNumber} Stars
      </p>
      <div
        className={`h-2.5 w-full rounded-[10px]  overflow-hidden ${variant === "tertiary" ? "bg-white" : "bg-[#F1F2F9]"}`}
      >
        <div className="h-full rounded-[10px] bg-[#FF9933]" style={{ width }} />
      </div>
      <p className="font-medium text-exo">({rating})</p>
    </div>
  );
};

export default ReviewCard;
