"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FilterState } from "@/lib/hooks/useFilters";

import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";

const MarketplaceCategory = ({
  filters,
  categories,
  toggleCategory,
  clearFilter,
  variant,
  title = "JOB Category",
}: {
  filters: FilterState;
  toggleCategory: (category: string) => void;
  categories: { label: string; value: string }[];
  isCategorySelected: (category: string) => boolean;
  variant?: "primary" | "secondary" | "tertiary";
  clearFilter: (key: keyof FilterState) => void;
  title?: string;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const selectedCategoryLength = filters.categories.length > 0;

  const availableCategories = useMemo(() => {
    return categories?.filter(
      (category) => !filters.categories.includes(category.value),
    );
  }, [categories, filters.categories]);

  return (
    <FilterSectionWrapper variant={variant}>
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title={title} />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle category filters"
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
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-3 w-full">
              <FilterSelector
                value={"All"}
                onClick={() => clearFilter("categories")}
                variant={!selectedCategoryLength ? "secondary" : "primary"}
                parentVariant={variant}
              />
              {selectedCategoryLength && (
                <div className="flex items-center gap-2.5 flex-wrap w-full">
                  {filters.categories?.map((category) => (
                    <FilterSelector
                      key={category}
                      value={category}
                      onClick={() => toggleCategory(category)}
                      variant="secondary"
                      parentVariant={variant}
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
                    parentVariant={variant}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FilterSectionWrapper>
  );
};

export default MarketplaceCategory;
