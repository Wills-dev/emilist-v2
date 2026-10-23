import { buildBidTerms, type BidMilestoneDraft } from "./jobApplication";
import type { CounterOfferPayload } from "../types/counterOffer";
import type { JobApplicant } from "../types/jobManagement";

export const buildCounterOffer = (maximumPrice: string, message: string, milestones: BidMilestoneDraft[], expectedIds: string[]): CounterOfferPayload => {
  const ids = milestones.map((item) => item.milestoneId);
  if (!expectedIds.length || ids.length !== expectedIds.length || new Set(ids).size !== ids.length || expectedIds.some((id) => !ids.includes(id))) {
    throw new Error("Include every job milestone exactly once before submitting.");
  }
  const terms = buildBidTerms(maximumPrice, milestones);
  return { ...terms, message: message.trim() };
};

export const getCounterOfferEligibility = (application: JobApplicant, userId: string | undefined, ownerId: string): { allowed: boolean; reason: string } => {
  const isOwner = Boolean(userId && userId === ownerId);
  const isApplicant = Boolean(userId && userId === application.applicantUserId);
  if (!isOwner && !isApplicant) return { allowed: false, reason: "Only the job owner or applicant can counter this offer." };
  if (application.status && !["applied", "pending"].includes(application.status)) return { allowed: false, reason: "This application is no longer open for counteroffers." };
  if ((application.bidCount ?? 0) >= 3) return { allowed: false, reason: "Three bids have been made. The job owner can now hire the expert or reject the bid." };
  const summary = application.counterOfferSummary;
  if (summary && ((isOwner ? summary.jobOwnerRemaining : summary.applicantRemaining) <= 0 || (isOwner ? summary.jobOwnerUsed : summary.applicantUsed) >= 2)) return { allowed: false, reason: "You have used both of your counteroffers." };
  const history = application.counterOffers ?? [];
  if (!history.length && !application.latestCounterOffer && summary && (summary.jobOwnerUsed > 0 || summary.applicantUsed > 0)) {
    return { allowed: false, reason: "Counteroffer history is unavailable. Refresh the application to continue." };
  }
  if (!history.length && !application.latestCounterOffer) return isOwner ? { allowed: true, reason: "" } : { allowed: false, reason: "The job owner must make the first counteroffer." };
  const latest = application.latestCounterOffer ?? history.at(-1);
  if (!latest || typeof latest !== "object") return { allowed: false, reason: "Counteroffer turn information is unavailable. Refresh the application to continue." };
  // A populated audit entry is required to determine whose turn it is.
  const entry = latest as { sender?: string | { _id?: string }; senderId?: string; senderRole?: string; madeByRole?: string; status?: string };
  const senderId = entry.senderId ?? (typeof entry.sender === "string" ? entry.sender : entry.sender?._id);
  const role = (entry.madeByRole ?? entry.senderRole)?.toLowerCase().replace(/[ _-]/g, "");
  const sentByOwner = senderId ? senderId === ownerId : role === "jobowner" || role === "owner" ? true : role === "applicant" || role === "artisan" ? false : undefined;
  if (sentByOwner === undefined) return { allowed: false, reason: "Counteroffer turn information is unavailable. Refresh the application to continue." };
  const countSentByMe = history.filter((item) => {
    if (!item || typeof item !== "object") return false;
    const offer = item as typeof entry;
    const id = offer.senderId ?? (typeof offer.sender === "string" ? offer.sender : offer.sender?._id);
    const senderRole = (offer.madeByRole ?? offer.senderRole)?.toLowerCase().replace(/[ _-]/g, "");
    return id ? id === userId : isOwner ? ["jobowner", "owner"].includes(senderRole ?? "") : ["applicant", "artisan"].includes(senderRole ?? "");
  }).length;
  if (countSentByMe >= 2) return { allowed: false, reason: "You have used both of your counteroffers." };
  const status = entry.status?.toLowerCase();
  if (status !== "pending" && status !== "rejected" && status !== "accepted") return { allowed: false, reason: "Counteroffer status is unavailable. Refresh the application to continue." };
  if (status === "accepted") return { allowed: false, reason: "This counteroffer has already been accepted." };
  const ownOffer = sentByOwner === isOwner;
  if (ownOffer && status !== "rejected") return { allowed: false, reason: "Wait for the other party to respond before sending another counteroffer." };
  if (!ownOffer && status === "rejected") return { allowed: false, reason: "The sender can revise their rejected counteroffer." };
  return { allowed: true, reason: "" };
};
