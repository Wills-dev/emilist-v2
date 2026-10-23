import type { ApplicationDetailsDto } from "../types/applicationDetails";
import type { JobApplicant } from "../types/jobManagement";

export const mapApplicationDetails = (application: ApplicationDetailsDto): JobApplicant => ({
  id: application._id,
  bidCount: application.bidHistory.filter((entry) => entry.type === "INITIAL_BID" || entry.type === "COUNTER_OFFER").length,
  applicantUserId: application.user._id,
  expertId: application.user._id,
  name: application.user.fullName || [application.user.firstName, application.user.lastName].filter(Boolean).join(" ") || application.user.userName || "Applicant",
  jobType: application.job.type,
  status: application.status,
  appliedAt: application.appliedAt ?? "",
  bidAmount: application.currentBid?.maximumPrice,
  bidMilestones: application.currentBid?.milestones,
  currency: application.job.currency,
  counterOffers: application.bidHistory.filter((entry) => entry.type === "COUNTER_OFFER"),
  latestCounterOffer: application.latestCounterOffer,
  counterOfferSummary: application.counterOfferSummary,
  level: "",
  location: "",
  rating: 0,
  reviewCount: 0,
});
