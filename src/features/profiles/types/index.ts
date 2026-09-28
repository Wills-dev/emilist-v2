import type { Review, RatingDistribution } from "@/lib/types/review";

export type ProfileKind = "employer" | "merchant" | "user";
export interface PersonProfile {
  id: string;
  kind: ProfileKind;
  name: string;
  image?: string;
  username?: string;
  verified?: boolean;
  online?: boolean;
  bio?: string;
  activityCount?: number;
  rating?: number;
  reviewCount?: number;
  distribution?: RatingDistribution;
  reviews?: Review[];
}
