import type { BusinessProfile } from "../types/profile";
import type { BusinessListItem } from "../types/list";
import type { BusinessListPage } from "../types/list";
import type { InfiniteData } from "@tanstack/react-query";

type BusinessCache = BusinessListItem[] | BusinessProfile | BusinessListPage | InfiniteData<BusinessListPage>;
export const updateBusinessLikeCache = (data: BusinessCache | undefined, businessId: string, liked: boolean): BusinessCache | undefined => {
  if (!data) return data;
  if (Array.isArray(data)) return data.map((business) => business._id === businessId ? { ...business, liked, isLiked: liked } : business);
  if ("pages" in data) return { ...data, pages: data.pages.map((page) => updateBusinessLikeCache(page, businessId, liked) as BusinessListPage) };
  if ("businesses" in data) return { ...data, businesses: data.businesses.map((business) => business._id === businessId ? { ...business, liked, isLiked: liked } : business) };
  if ("business" in data && data.business._id === businessId) return { ...data, business: { ...data.business, liked, isLiked: liked } };
  return data;
};
