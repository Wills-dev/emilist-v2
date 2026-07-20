import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";

import Input from "@/components/atoms/Input/Input";
import { priceMap, priceOptions } from "@/lib/constants/priceMap";
import { FilterState, PriceRange } from "@/lib/hooks/useFilters";
import { Minus } from "lucide-react";

const MarketplacePriceFilter = ({
  filters,
  setFilter,
  setPriceRange,
  clearFilter,
  variant,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  setPriceRange: (range: PriceRange) => void;
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}) => {
  const noPriceSelected = !filters.minPrice && !filters.maxPrice;

  const handleClearFilter = () => {
    clearFilter("minPrice");
    clearFilter("maxPrice");
  };

  return (
    <FilterSectionWrapper variant={variant}>
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title="Price range" />
        <div className="flex items-center gap-2">
          <div className="max-w-12 w-full">
            <Input
              id="minPrice"
              type="text"
              name="minPrice"
              value={filters.minPrice || ""}
              onChange={(e) => setFilter("minPrice", e.target.value)}
              placeholder="Min"
            />
          </div>
          <Minus className="w-4" />
          <div className="max-w-12 w-full">
            <Input
              id="maxPrice"
              type="text"
              name="maxPrice"
              value={filters.maxPrice || ""}
              onChange={(e) => setFilter("maxPrice", e.target.value)}
              placeholder="Max"
            />
          </div>
        </div>
      </div>
      <div className="space-y-3 w-full">
        <FilterSelector
          value={"All"}
          onClick={handleClearFilter}
          variant={noPriceSelected ? "secondary" : "primary"}
          parentVariant={variant}
        />
        <div className="w-full flex items-center gap-2.5 flex-wrap">
          {priceOptions?.map((price) => {
            const priceValue = price.value && priceMap[price.value];
            const selectedPrice =
              priceValue?.min === filters.minPrice &&
              priceValue.max === filters.maxPrice;

            return (
              <FilterSelector
                key={price?.value}
                value={price.label}
                onClick={() => setPriceRange(price.value)}
                variant={selectedPrice ? "secondary" : "primary"}
                parentVariant={variant}
              />
            );
          })}
        </div>
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplacePriceFilter;
