import { FilterState, PriceRange } from "@/lib/hooks/useFilters";
import MarketplaceCategory from "../MarketplaceCategory/MarketplaceCategory";

const MarketplaceFilter = ({
  showCategory,
  categories,
  filters,
  setFilter,
  setPriceRange,
  toggleCategory,
  isCategorySelected,
}: {
  showCategory?: boolean;
  categories?: { label: string; value: string }[];
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  setPriceRange: (range: PriceRange) => void;
  toggleCategory: (category: string) => void;
  isCategorySelected: (category: string) => boolean;
}) => {
  const showCat = categories !== undefined && showCategory;

  return (
    <div className="space-y-4 w-full">
      <MarketplaceCategory
        filters={filters}
        setFilter={setFilter}
        toggleCategory={toggleCategory}
        isCategorySelected={isCategorySelected}
      />
    </div>
  );
};

export default MarketplaceFilter;
