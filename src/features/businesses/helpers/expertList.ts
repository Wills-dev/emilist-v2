import type { FilterState } from "@/lib/hooks/useFilters";
import type { DashboardExpertFixture } from "@/features/experts/types";
import type { BusinessListItem, BusinessListQuery } from "../types/list";

export const expertListParams = (filters: FilterState, search?: string | null): BusinessListQuery => {
  const price = (value: string | null) => value ? Number(value.replaceAll(",", "")) : undefined;
  return {
    search: search?.trim() || undefined,
    serviceCategory: filters.categories.length ? filters.categories.join(",") : undefined,
    minPayment: price(filters.minPrice), maxPayment: price(filters.maxPrice),
    location: filters.location || undefined, noticePeriod: filters.noticePeriod ? filters.noticePeriod === "immediately" ? "Immediately" : filters.noticePeriod.replaceAll("_", " ") : undefined,
    experienceLevel: filters.level?.toLowerCase() || undefined,
    minRating: filters.rating ? Number(filters.rating) : undefined,
  };
};

export const mapExpertListItem = (business: BusinessListItem): DashboardExpertFixture => ({
  id: business._id,
  imgUrl: business.displayImage || business.image || "/assets/images/avatar.svg",
  businessName: business.businessName || "Unnamed business",
  isVerified: business.isVerified === true || ["Verified", "EmiPreferred"].includes(business.expertType ?? ""),
  rating: Number(business.averageRating ?? business.rating ?? 0),
  noOfReviews: Number(business.totalReviews ?? (Array.isArray(business.reviews) ? business.reviews.length : business.reviews) ?? 0),
  price: Number(business.startingPrice ?? 0), period: business.rateUnit ?? "", currency: business.currency ?? "NGN",
  location: business.location || [business.businessState, business.businessCountry].filter(Boolean).join(", "),
  state: business.businessState ?? "", noOfCompletedJobs: Number(business.completedJobs ?? 0),
  serviceType: business.category || business.services?.[0] || business.service || "Expert",
  level: business.experienceLevel ?? "", isLiked: business.liked ?? business.isLiked ?? false,
});

export const sortExperts = (experts: DashboardExpertFixture[], sort: string | null) => [...experts].sort((a, b) => {
  if (sort === "asc") return a.price - b.price;
  if (sort === "desc") return b.price - a.price;
  if (sort === "highest_rated") return b.rating - a.rating;
  if (sort === "lowest_rated") return a.rating - b.rating;
  return 0;
});
