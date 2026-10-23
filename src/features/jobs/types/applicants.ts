export const APPLICATION_STATUSES = ["applied", "pending", "accepted", "rejected", "completed", "cancelled"] as const;
export type ApplicationStatus = typeof APPLICATION_STATUSES[number];
export interface FetchApplicantsQuery {
  jobId: string;
  status?: ApplicationStatus;
  experienceLevel?: string;
  page: number;
  limit: number;
}
export interface ApplicantDto {
  _id: string;
  job: { type?: string; _id: string; title: string; status: string; jobCategory?: string; service?: string };
  user: { _id: string; fullName?: string; userName?: string; email?: string; profileImage?: string; level?: string } | null;
  status: ApplicationStatus;
  appliedAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
  biddableDetails?: { maximumPrice: number; milestones: { milestoneId: string; amount: number; achievement: string }[] } | null;
  counterOffers?: unknown[];
  counterOfferSummary?: import("./counterOffer").CounterOfferSummary;
  businessId?: string;
  businessName?: string;
  businessLocation?: { address?: string; city?: string; state?: string; country?: string; formatted?: string };
  mainService?: string;
  experienceLevel?: string;
  yearsOfExperience?: number;
  completedJobs?: number;
  averageRating?: number;
  totalReviews?: number;
  businessReviewCount?: number;
  applicantName?: string;
  displayImage?: string;
  quote?: unknown;
}
export interface ApplicantsPage {
  total: number;
  page: number;
  limit: number;
  applicants: ApplicantDto[];
}
