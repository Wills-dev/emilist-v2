import type { ApplicationStatus } from "./applicants";
import type { CounterOfferSummary } from "./counterOffer";

export type ApplicationParticipantRole = "job_owner" | "applicant";
export interface ApplicationBid {
  maximumPrice: number;
  milestones: { milestoneId: string; amount: number; achievement: string }[];
}
export interface BidHistoryEntry {
  _id?: string;
  type: "INITIAL_BID" | "COUNTER_OFFER";
  madeByRole: ApplicationParticipantRole;
  maximumPrice: number;
  milestones?: ApplicationBid["milestones"];
  message?: string;
  status: string;
  createdAt?: string;
  respondedAt?: string | null;
}
interface ApplicationPerson {
  _id: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  userName?: string;
}
export interface ApplicationDetailsDto {
  _id: string;
  status: ApplicationStatus;
  participantRole: ApplicationParticipantRole;
  appliedAt?: string;
  job: { _id: string; title: string; type: string; status: string; currency?: string };
  user: ApplicationPerson;
  creator: ApplicationPerson;
  initialBid: ApplicationBid | null;
  currentBid: ApplicationBid | null;
  bidHistory: BidHistoryEntry[];
  latestCounterOffer?: Pick<BidHistoryEntry, "_id" | "madeByRole" | "maximumPrice" | "status"> | null;
  counterOffers?: unknown[];
  counterOfferSummary?: CounterOfferSummary;
}
