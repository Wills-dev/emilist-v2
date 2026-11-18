import type { Review, RatingDistribution } from "@/lib/types/review";
import type { MessageRecipient } from "@/features/messages/types/recipient";
import type { DashboardExpertFixture } from "./index";

export interface ExpertDetailsData {
  expert: DashboardExpertFixture;
  profile: {
    availability: string;
    noticePeriod: string;
    galleryImages: string[];
    about: string[];
  };
  muted?: boolean;
  aboutHtml?: string;
  recipient?: MessageRecipient;
  reviews: {
    totalReviews: number;
    totalComments: number;
    averageRating: number;
    ratingDistribution?: RatingDistribution;
    reviews: Review[];
  };
}
