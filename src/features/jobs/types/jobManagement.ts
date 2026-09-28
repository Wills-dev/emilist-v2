import type { JobDetailsViewModel } from "./jobDetails";

export type JobInfoTab = "details" | "applicants" | "invoices" | "payments";
export type JobAction =
  | "edit"
  | "remove"
  | "pause"
  | "resume"
  | "cancel"
  | "review"
  | "accept"
  | "withdraw"
  | "rate"
  | "convert"
  | "counter-offer"
  | "complete-milestone"
  | "rate-employer";
export interface JobApplicant {
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
  id: string;
  reference: string;
  recipient: string;
  milestone: string;
  date: string;
  amount: number;
  currency: string;
  status: "paid" | "pending" | "upcoming" | "overdue";
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
