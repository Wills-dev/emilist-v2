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
  brand: string | null;
  priceRange: PriceRange;
  minPrice: string | null;
  maxPrice: string | null;
  sortBy: string | null;
  sortOrder: string | null;
}

const initialFilters: FilterState = {
  categories: [],
  location: null,
  deliveryTime: null,
  rating: null,
  level: null,
  noticePeriod: null,
  brand: null,
  priceRange: null,
  minPrice: null,
  maxPrice: null,
  sortBy: null,
  sortOrder: null,
};

export const useFilters = () => {
  const [tab, setTab] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null);

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

  const hasFilters = useMemo(() => {
    return Object.values(filters).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      return value !== null && value !== undefined && value !== "";
    });
  }, [filters]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleClear = () => {
    setSearch("");
    setSubmittedQuery(null);
  };

  const handleSearch = async (query = search) => {
    const normalizedQuery = query.trim();
    setSearch(normalizedQuery);
    setSubmittedQuery(normalizedQuery || null);
  };

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
    handleSearch,
    handleClear,
    handleSearchChange,
    status,
    setStatus,
    submittedQuery,
  };
};
