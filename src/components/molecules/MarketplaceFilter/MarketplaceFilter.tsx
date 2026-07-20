import { selectOption } from "@/lib/types";
import { FilterState, PriceRange } from "@/lib/hooks/useFilters";

import MarketplaceCategory from "../MarketplaceCategory/MarketplaceCategory";
import MarketplaceLocationFilter from "../MarketplaceLocationFilter/MarketplaceLocationFilter";
import MarketplacePriceFilter from "../MarketplacePriceFilter/MarketplacePriceFilter";
import MarketplaceNoticePeriodFilter from "../MarketplaceNoticePeriodFilter/MarketplaceNoticePeriodFilter";
import MarketplaceExpertLevelFilter from "../MarketplaceExpertLevelFilter/MarketplaceExpertLevelFilter";
import MarketplaceRatingFilter from "../MarketplaceRatingFilter/MarketplaceRatingFilter";

export interface MarketplaceFilterProps {
  showCategory?: boolean;
  showPrice?: boolean;
  categories?: { label: string; value: string }[];
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  setPriceRange?: (range: PriceRange) => void;
  toggleCategory: (category: string) => void;
  isCategorySelected: (category: string) => boolean;
  locations?: selectOption[] | string[];
  showLocation?: boolean;
  showNoticePeriod?: boolean;
  showLevel?: boolean;
  showRating?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}

const MarketplaceFilter = ({
  showCategory,
  categories,
  filters,
  setFilter,
  setPriceRange,
  toggleCategory,
  isCategorySelected,
  showLocation,
  locations,
  showPrice,
  showNoticePeriod,
  clearFilter,
  showLevel,
  showRating,
  variant,
}: MarketplaceFilterProps) => {
  const showCat = categories !== undefined && showCategory;
  const showLoc = locations !== undefined && showLocation;
  const showPrices = setPriceRange !== undefined && showPrice;

  return (
    <div className="space-y-4 w-full">
      {showCat && (
        <MarketplaceCategory
          filters={filters}
          setFilter={setFilter}
          toggleCategory={toggleCategory}
          isCategorySelected={isCategorySelected}
          categories={categories || []}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
      {showPrices && (
        <MarketplacePriceFilter
          filters={filters}
          setFilter={setFilter}
          setPriceRange={setPriceRange}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
      {showLoc && (
        <MarketplaceLocationFilter
          filters={filters}
          setFilter={setFilter}
          options={locations || []}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
      {showNoticePeriod && (
        <MarketplaceNoticePeriodFilter
          filters={filters}
          setFilter={setFilter}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
      {showLevel && (
        <MarketplaceExpertLevelFilter
          filters={filters}
          setFilter={setFilter}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
      {showRating && (
        <MarketplaceRatingFilter
          filters={filters}
          setFilter={setFilter}
          clearFilter={clearFilter}
          variant={variant}
        />
      )}
    </div>
  );
};

export default MarketplaceFilter;
