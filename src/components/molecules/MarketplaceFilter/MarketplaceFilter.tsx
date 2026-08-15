import { selectOption } from "@/lib/types";
import { FilterState, PriceRange } from "@/lib/hooks/useFilters";

import MarketplaceCategory from "../MarketplaceCategory/MarketplaceCategory";
import MarketplaceLocationFilter from "../MarketplaceLocationFilter/MarketplaceLocationFilter";
import MarketplacePriceFilter from "../MarketplacePriceFilter/MarketplacePriceFilter";
import MarketplaceNoticePeriodFilter from "../MarketplaceNoticePeriodFilter/MarketplaceNoticePeriodFilter";
import MarketplaceExpertLevelFilter from "../MarketplaceExpertLevelFilter/MarketplaceExpertLevelFilter";
import MarketplaceRatingFilter from "../MarketplaceRatingFilter/MarketplaceRatingFilter";
import MarketplaceDeliveryTimeFilter from "../MarketplaceDeliveryTimeFilter/MarketplaceDeliveryTimeFilter";

export interface MarketplaceFilterProps {
  showCategory?: boolean;
  categoryTitle?: string;
  showPrice?: boolean;
  priceTitle?: string;
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
  noticePeriodOptions?: selectOption[];
  noticePeriodTitle?: string;
  showLevel?: boolean;
  showRating?: boolean;
  showDeliveryTime?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
}

const MarketplaceFilter = ({
  showCategory,
  categoryTitle,
  categories,
  filters,
  setFilter,
  setPriceRange,
  toggleCategory,
  isCategorySelected,
  showLocation,
  locations,
  showPrice,
  priceTitle,
  showNoticePeriod,
  noticePeriodOptions,
  noticePeriodTitle,
  clearFilter,
  showLevel,
  showRating,
  showDeliveryTime,
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
          toggleCategory={toggleCategory}
          isCategorySelected={isCategorySelected}
          categories={categories || []}
          clearFilter={clearFilter}
          variant={variant}
          title={categoryTitle}
        />
      )}
      {showPrices && (
        <MarketplacePriceFilter
          filters={filters}
          setFilter={setFilter}
          setPriceRange={setPriceRange}
          clearFilter={clearFilter}
          variant={variant}
          title={priceTitle}
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
          options={noticePeriodOptions}
          title={noticePeriodTitle}
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
      {showDeliveryTime && (
        <MarketplaceDeliveryTimeFilter
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
