import { useMemo, useState } from "react";
import { priceMap } from "../constants/priceMap";
import { formatInputTextNumberWithCommas } from "../helpers/formatNumbers";

export type PriceRange =
  | "<20"
  | "21-50"
  | "51-100"
  | "101-200"
  | "201-500"
  | ">500"
  | null;

export interface FilterState {
  categories: string[];
  location: string | null;
  deliveryTime: string | null;
  rating: string | null;
  level: string | null;
  noticePeriod: string | null;

  priceRange: PriceRange;
  minPrice: string | null;
  maxPrice: string | null;
}

const initialFilters: FilterState = {
  categories: [],
  location: null,
  deliveryTime: null,
  rating: null,
  level: null,
  noticePeriod: null,

  priceRange: null,
  minPrice: null,
  maxPrice: null,
};

export const useFilters = () => {
  const [tab, setTab] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]:
        (key === "minPrice" || key === "maxPrice") &&
        value !== null &&
        value !== undefined
          ? formatInputTextNumberWithCommas(String(value))
          : value,
    }));
  };

  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);

      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };

  const isCategorySelected = (category: string) =>
    filters.categories.includes(category);

  const setPriceRange = (range: PriceRange) => {
    setFilters((prev) => {
      if (!range) {
        return {
          ...prev,
          priceRange: null,
          minPrice: null,
          maxPrice: null,
        };
      }

      const selected = priceMap[range];

      return {
        ...prev,
        priceRange: range,
        minPrice: selected.min,
        maxPrice: selected.max,
      };
    });
  };

  const clearFilter = (key: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const hasFilters = useMemo(
    () =>
      Object.values(filters).some((value) => value !== null && value !== ""),
    [filters],
  );

  return {
    tab,
    setTab,
    filters,
    setFilter,
    clearFilter,
    resetFilters,
    hasFilters,
    setPriceRange,
    toggleCategory,
    isCategorySelected,
  };
};
