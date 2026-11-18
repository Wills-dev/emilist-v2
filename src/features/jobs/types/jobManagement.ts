import type { JobDetailsViewModel } from "./jobDetails";

export type JobInfoTab = "details" | "applicants" | "invoices" | "payments" | "application";
export type JobAction =
  | "edit"
  | "remove"
  | "pause"
  | "resume"
  | "cancel"
  | "review"
  | "accept"
  | "withdraw"
  | "convert"
  | "counter-offer"
  | "complete-milestone"
  | "rate-employer";
export interface JobApplicant {
  businessId?: string;
  applicantUserId?: string;
  counterOffers?: unknown[];
  latestCounterOffer?: import("./applicationDetails").ApplicationDetailsDto["latestCounterOffer"];
  counterOfferSummary?: import("./counterOffer").CounterOfferSummary;
  jobType?: string;
  bidCount?: number;
  status?: import("./applicants").ApplicationStatus;
  acceptedAt?: string;
  rejectedAt?: string;
  bidMilestones?: { milestoneId: string; amount: number; achievement: string }[];
  quote?: unknown;
  expertId?: string;
  isVerified?: boolean;
  jobsCompleted?: number;
  serviceType?: string;
  yearsOfExperience?: number;
  bidAmount?: number;
  currency?: string;
  id: string;
  name: string;
  image?: string;
  level: string;
  location: string;
  appliedAt: string;
  rating: number;
  reviewCount: number;
}
export interface JobInvoice {
  disputeTicketId?: string;
  disputeStatus?: string;
  hasUnresolvedDispute?: boolean;
  jobId?: string;
  jobTitle?: string;
  paymentReference?: string;
  amountPaid?: number;
  paymentMethod?: string;
  milestoneId?: string;
  invoiceId?: string;
  subtotal?: number;
  additionalAmount?: number;
  note?: string;
  status?: "paid" | "unpaid" | "pending" | "overdue";
  id: string;
  number: string;
  billedTo: string;
  milestone: string;
  issuedAt: string;
  dueAt: string;
  paidAt?: string;
  amount: number;
  currency: string;
  downloadUrl?: string;
}
export interface JobPayment {
  invoiceId?: string;
  subtotal?: number;
  additionalAmount?: number;
  amountPaid?: number;
  paymentMethod?: string;
  paidAt?: string;
  id: string;
  reference: string;
  recipient: string;
  milestone: string;
  date: string;
  amount: number;
  currency: string;
  status: "paid" | "unpaid" | "pending" | "upcoming" | "overdue";
  receiptUrl?: string;
}

// Independent view models: connect these collections when their API contracts are available.
export interface JobManagementData {
  applicationFeedback?: string[];
  applicantsList?: JobApplicant[];
  invoices?: JobInvoice[];
  payments?: JobPayment[];
  expert?: Pick<
    JobApplicant,
    "id" | "name" | "image" | "rating" | "reviewCount"
  >;
}
export type ManagedJob = JobDetailsViewModel & JobManagementData;
