import type { ApplicantDto } from "../types/applicants";
import type { JobApplicant } from "../types/jobManagement";

export const mapJobApplicant = (application: ApplicantDto): JobApplicant => ({
  id: application._id,
  applicantUserId: application.user?._id,
  counterOffers: application.counterOffers,
  counterOfferSummary: application.counterOfferSummary,
  expertId: application.businessId ?? application.user?._id,
  jobType: application.job.type,
  name: application.businessName || application.applicantName || application.user?.fullName || application.user?.userName || "Applicant unavailable",
  image: application.displayImage ?? application.user?.profileImage,
  level: application.experienceLevel ? application.experienceLevel.charAt(0).toUpperCase() + application.experienceLevel.slice(1) : "Level not specified",
  location: application.businessLocation?.formatted || [application.businessLocation?.address, application.businessLocation?.city, application.businessLocation?.state, application.businessLocation?.country].filter(Boolean).join(", ") || "Location not provided",
  serviceType: application.mainService,
  yearsOfExperience: application.yearsOfExperience,
  jobsCompleted: application.completedJobs,
  appliedAt: application.appliedAt ?? "",
  rating: application.averageRating ?? 0,
  reviewCount: application.businessReviewCount ?? application.totalReviews ?? 0,
  status: application.status,
  acceptedAt: application.acceptedAt,
  rejectedAt: application.rejectedAt,
  bidAmount: application.biddableDetails?.maximumPrice,
  bidMilestones: application.biddableDetails?.milestones,
  quote: application.quote,
});
