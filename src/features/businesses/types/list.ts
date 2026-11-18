import type { BusinessProfileDto } from "./profile";

export interface BusinessListItem extends BusinessProfileDto {
  credentials?: string[];
  languages?: string[];
  experienceLevelLabel?: string;
  category?: string;
  location?: string;
  expertType?: string;
  isCompared?: boolean;
  userId?: string | { _id: string; level?: string };
  createdAt?: string;
}
export interface BusinessListQuery {
  page?: number; limit?: number; search?: string; userId?: string;
  serviceCategory?: string; minPayment?: number; maxPayment?: number;
  location?: string; noticePeriod?: string; experienceLevel?: string;
  minRating?: number; minReviews?: number; expertType?: string; currency?: string;
}
export interface BusinessListPage {
  businesses: BusinessListItem[];
  page: number;
  totalPages: number;
  totalBusinesses: number;
}
