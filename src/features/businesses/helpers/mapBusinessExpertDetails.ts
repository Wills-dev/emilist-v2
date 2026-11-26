import { formatNoticePeriod } from "@/features/settings/helpers/formatNoticePeriod";
import type { ExpertDetailsData } from "@/features/experts/types/expertDetails";
import type { BusinessProfile } from "@/features/businesses/types/profile";
import { mapBusiness } from "@/features/businesses/helpers/mapBusiness";
import type { Review } from "@/lib/types/review";
interface ExpertFallback {
  image?: string; rating?: number; reviewCount?: number; location?: string;
  jobsCompleted?: number; serviceType?: string; level?: string; applicantUserId?: string;
}

const finiteNumber = (value: unknown, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const isReview = (value: unknown): value is Review => Boolean(value && typeof value === "object" && ("comment" in value || "rating" in value));

export const mapBusinessExpertDetails = (profile: BusinessProfile, applicant: ExpertFallback = {}): ExpertDetailsData => {
  const { business, reviewSummary } = profile;
  const mapped = mapBusiness(business);
  const reviews = (Array.isArray(reviewSummary?.reviews) ? reviewSummary.reviews : Array.isArray(business.reviews) ? business.reviews : []).filter(isReview);
  const rating = finiteNumber(reviewSummary?.averageRating ?? business.averageRating ?? business.rating, applicant.rating ?? 0);
  const count = finiteNumber(reviewSummary?.totalReviews ?? reviewSummary?.numberOfRatings ?? business.totalReviews ?? (typeof business.reviews === "number" ? business.reviews : undefined), applicant.reviewCount ?? 0);
  return {
    ownerId: typeof business.userId === "string" ? business.userId : business.userId?._id,
    expert: {
      id: business._id, imgUrl: mapped.image || applicant.image || "", businessName: mapped.businessName,
      isVerified: mapped.isVerified, rating, noOfReviews: count,
      price: finiteNumber(business.startingPrice), period: mapped.rateUnit, currency: mapped.currency,
      location: [mapped.businessAddress, mapped.businessState, mapped.businessCountry].filter(Boolean).join(", ") || applicant.location || "",
      state: mapped.businessState, noOfCompletedJobs: finiteNumber(business.completedJobs, applicant.jobsCompleted ?? 0),
      serviceType: business.service || mapped.services[0] || applicant.serviceType || "Expert",
      level: business.experienceLevel || mapped.level || applicant.level || "",
      isLiked: business.liked ?? business.isLiked ?? false,
    },
    profile: {
      availability: business.availability ?? "",
      noticePeriod: formatNoticePeriod(mapped.noticePeriod),
      galleryImages: mapped.businessImages, about: [],
    },
    aboutHtml: mapped.businessDescription,
    muted: business.isMuted ?? business.muted ?? false,
    recipient: { businessId: business._id, userId: applicant.applicantUserId ?? (typeof business.userId === "string" ? business.userId : business.userId?._id) ?? "", name: mapped.businessName, image: mapped.image || applicant.image },
    reviews: {
      totalReviews: count, totalComments: reviewSummary?.totalComments ?? reviews.length,
      averageRating: rating, ratingDistribution: reviewSummary?.ratingDistribution, reviews,
    },
  };
};
