import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

import { FilterState } from "@/lib/hooks/useFilters";

const MarketplaceRatingFilter = ({
  filters,
  setFilter,
  clearFilter,
  variant,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}) => {
  const ratings = ["1", "2", "3", "4", "5"];

  return (
    <FilterSectionWrapper variant={variant}>
      <FilterTitle title="RATING" />
      <div className="space-y-3 w-full">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("rating")}
          variant={!filters.rating ? "secondary" : "primary"}
          parentVariant={variant}
        />
        <div className="flex items-center gap-2.5 flex-wrap w-full">
          {ratings?.map((rating) => (
            <FilterSelector
              key={rating}
              value={`${rating}.0`}
              onClick={() => setFilter("rating", rating)}
              variant={filters.rating === rating ? "secondary" : "primary"}
              parentVariant={variant}
              showStar
            />
          ))}
        </div>
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceRatingFilter;
