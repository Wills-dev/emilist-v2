import type {
  FetchAllJobsItemDto,
  JobListDurationDto,
  JobListMediaDto,
} from "./listJobs";

export interface JobMilestoneInvoiceDto {
  disputeTicketId?: string;
  disputeStatus?: string;
  reviewStatus?: string;
  invoiceId?: string;
  additionalAmount?: number | string;
  invoiceRaised?: boolean;
  note?: string;
  number?: string;
  issuedAt?: string;
  dueAt?: string;
  paidAt?: string;
  downloadUrl?: string;
}

export interface JobMilestoneDto {
  hasUnresolvedDispute?: boolean;
  datePaid?: string;
  paymentInfo?: { reference?: string; amountPaid?: number | string; paymentMethod?: string; date?: string };
  invoice?: JobMilestoneInvoiceDto;
  paymentStatus?: string;
  _id?: string;
  id?: string;
  status?: string;
  achievement?: string;
  title?: string;
  details?: string;
  description?: string;
  amount?: number | string;
  currency?: string;
  timeFrame?: JobListDurationDto | string;
  duration?: JobListDurationDto | string;
}

export interface JobDetailsDto extends FetchAllJobsItemDto {
  hasReviewedJobOwner?: boolean;
  disputeSummary?: { canCloseContract?: boolean };
  acceptedApplicationId?: string;
  maximumPrice?: number;
  applicationId?: string;
  applicationStatus?: string;
  experienceLevel?: string;
  startDate?: string;
  endDate?: string;
  milestones?: JobMilestoneDto[];
  files?: Array<string | JobListMediaDto>;
  reviews?: unknown[];
}

export interface FetchJobByIdData extends JobDetailsDto {
  job?: JobDetailsDto;
}

export interface FetchJobByIdEnvelope {
  message: string;
  data: FetchJobByIdData;
}

export interface FetchJobByIdQuery {
  id: string;
  reviewsPage?: number;
  reviewsLimit?: number;
}

export interface JobDetailsViewModel {
  hasReviewedJobOwner?: boolean;
  canCloseContract?: boolean;
  acceptedApplicationId?: string;
  applications?: import("./listJobs").JobListApplicationDto[];
  applicationId?: string;
  applicationStatus?: string;
  invoices?: import("./jobManagement").JobInvoice[];
  payments?: import("./jobManagement").JobPayment[];
  type?: string;
  id: string;
  status: string;
  category: string;
  title: string;
  createdAt: string;
  price: number;
  currency: string;
  location: string;
  duration: string;
  applicants: number;
  level: string;
  isLiked: boolean;
  ownerId: string;
  ownerVerified?: boolean;
  ownerUsername?: string;
  ownerBio?: string;
  ownerName: string;
  ownerImage: string;
  ownerRating: number;
  ownerReviewCount: number;
  urgency: string;
  description: string[];
  images: string[];
  attachments?: { url: string; name: string }[];
  milestones: Array<{
    id: string;
    status?: string;
    achievement?: string;
    paymentStatus?: string;
    invoice?: { invoiceRaised: boolean; additionalAmount: number; note: string; totalAmount: number };
    title: string;
    duration: string;
    amount: number;
    currency: string;
    details: string;
    isExpanded: boolean;
  }>;
}
