"use client";

import { useMemo, useState } from "react";

import { FilterState } from "@/lib/hooks/useFilters";

import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";

const MarketplaceCategory = ({
  filters,
  setFilter,
  categories,
  toggleCategory,
  clearFilter,
}: {
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  toggleCategory: (category: string) => void;
  categories: { label: string; value: string }[];
  isCategorySelected: (category: string) => boolean;
  clearFilter: (key: keyof FilterState) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategoryLength = filters.categories.length > 0;

  const availableCategories = useMemo(() => {
    return categories?.filter(
      (category) => !filters.categories.includes(category.value),
    );
  }, [categories, filters.categories]);

  return (
    <FilterSectionWrapper>
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title="JOB Category" />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`transition-all duration-300 ${isOpen ? "rotate-180" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="sm:size-5 size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-3 w-full">
        <FilterSelector
          value={"All"}
          onClick={() => clearFilter("categories")}
          variant={!selectedCategoryLength ? "secondary" : "primary"}
        />
        {selectedCategoryLength && (
          <div className="flex items-center gap-2.5 flex-wrap w-full">
            {filters.categories?.map((category) => (
              <FilterSelector
                key={category}
                value={category}
                onClick={() => toggleCategory(category)}
                variant="secondary"
                showClose
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-2.5 flex-wrap">
          {availableCategories?.slice(0, 10).map((item) => (
            <FilterSelector
              key={item.label}
              value={item.value}
              onClick={() => toggleCategory(item.value)}
              variant="primary"
            />
          ))}
        </div>
      </div>
    </FilterSectionWrapper>
  );
};

export default MarketplaceCategory;
