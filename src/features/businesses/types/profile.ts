import type { BusinessDto } from "./index";
import type { Review, RatingDistribution } from "@/lib/types/review";

export interface BusinessProfileDto extends BusinessDto {
  userId?: string | { _id: string; level?: string };
  isMuted?: boolean;
  muted?: boolean;
  liked?: boolean;
  isLiked?: boolean;
  completedJobs?: number;
  averageRating?: number;
  totalReviews?: number;
  experienceLevel?: string;
  availability?: string;
  noticePeriodUnit?: string;
}
export interface BusinessReviewSummary {
  reviews: Review[];
  averageRating?: number;
  totalReviews?: number;
  numberOfRatings?: number;
  totalComments?: number;
  ratingDistribution?: RatingDistribution;
}
export interface BusinessProfile {
  business: BusinessProfileDto;
  reviewSummary?: BusinessReviewSummary;
}
