import clsx from "clsx";

import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import StarIcon from "@/components/atoms/icons/StarIcon";

const RatingSummary = ({
  title,
  rating,
  variant = "primary",
}: {
  title: string;
  rating: number;
  variant?: "primary" | "secondary" | "tertiary";
}) => {
  const activeRating = Math.round(rating);

  const ratings = [1, 2, 3, 4, 5];

  const variants = {
    primary: "bg-white",
    secondary: "bg-[#F0FDF5] text-[#18A154]",
  };

  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title={title} />
      <div className="flex items-center gap-2.5 flex-wrap w-full">
        {ratings?.map((rate, index) => (
          <div
            key={index}
            className={clsx(
              "px-2 py-1 text-sm rounded-[24px] cursor-pointer flex items-center gap-1",
              activeRating === rate ? variants.secondary : variants.primary,
            )}
          >
            <span className="text-[#FF9933]">
              <StarIcon />
            </span>
            {rate}.0
          </div>
        ))}
      </div>
    </FilterSectionWrapper>
  );
};

export default RatingSummary;
