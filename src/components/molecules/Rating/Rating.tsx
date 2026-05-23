import StarIcon from "@/components/atoms/icons/StarIcon";

const Rating = ({
  rating,
  className = "text-[16.2px]",
}: {
  rating: number;
  className?: string;
}) => {
  return (
    <div className="flex items-center gap-[2.29px]">
      {[...Array(5)].map((_, index) => (
        <span
          className={`block ${className} ${index < rating ? "text-[#FF9933]" : "text-[#B8B9B8]"}`}
          key={index}
        >
          <StarIcon />
        </span>
      ))}
    </div>
  );
};

export default Rating;
