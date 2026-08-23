import type { FilterState } from "@/lib/hooks/useFilters";
import type { JobCardViewModel } from "../types/listJobs";

const getAmount = (value: string | null) =>
  Number(value?.replaceAll(",", "") || 0) * 1000;

export const filterLikedJobs = ({
  jobs,
  filters,
  search,
}: {
  jobs: JobCardViewModel[];
  filters: FilterState;
  search: string | null;
}) => {
  const normalizedSearch = search?.trim().toLowerCase();
  const minBudget = getAmount(filters.minPrice);
  const maxBudget = getAmount(filters.maxPrice);

  return jobs
    .filter((job) => {
      const searchableValues = [
        job.title,
        job.description,
        job.category,
        job.location,
        job.posterName,
      ];
      const matchesSearch =
        !normalizedSearch ||
        searchableValues.some((value) =>
          value.toLowerCase().includes(normalizedSearch),
        );
      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(job.category);
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesRating =
        !filters.rating || job.posterRating === Number(filters.rating);
      const matchesBudget =
        (!minBudget || (job.budgetAmount ?? 0) >= minBudget) &&
        (!maxBudget || (job.budgetAmount ?? 0) <= maxBudget);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesRating &&
        matchesBudget
      );
    })
    .sort((left, right) => {
      if (filters.sortBy === "oldest") {
        return Date.parse(left.createdAt || "") - Date.parse(right.createdAt || "");
      }
      if (filters.sortBy === "asc") {
        return (left.budgetAmount ?? 0) - (right.budgetAmount ?? 0);
      }
      if (filters.sortBy === "desc") {
        return (right.budgetAmount ?? 0) - (left.budgetAmount ?? 0);
      }
      if (filters.sortBy === "highest_rated") {
        return right.posterRating - left.posterRating;
      }
      if (filters.sortBy === "lowest_rated") {
        return left.posterRating - right.posterRating;
      }
      return Date.parse(right.createdAt || "") - Date.parse(left.createdAt || "");
    });
};
