"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FilterState } from "@/lib/hooks/useFilters";

import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import { noticePeriodOptions } from "@/lib/constants/noticePeriodOptions";
import FilterSelector from "@/components/atoms/FilterSelector/FilterSelector";

const MarketplaceNoticePeriodFilter = ({
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FilterSectionWrapper variant={variant}>
      <div className="flex items-center justify-between gap-2.5">
        <FilterTitle title="NOTICE PERIOD" />
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle notice period filters"
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
                onClick={() => clearFilter("noticePeriod")}
                variant={!filters.noticePeriod ? "secondary" : "primary"}
                parentVariant={variant}
              />
              <div className="flex items-center gap-2.5 flex-wrap w-full">
                {noticePeriodOptions?.map((period) => (
                  <FilterSelector
                    key={period?.value}
                    value={period.label}
                    onClick={() => setFilter("noticePeriod", period.value)}
                    variant={
                      filters.noticePeriod === period.value
                        ? "secondary"
                        : "primary"
                    }
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

export default MarketplaceNoticePeriodFilter;
