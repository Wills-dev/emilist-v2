import type { ApplicationDetailsDto } from "../types/applicationDetails";

export const getBidResponseActions = (application: ApplicationDetailsDto) => {
  const counters = application.bidHistory.filter((entry) => entry.type === "COUNTER_OFFER");
  const bidCount = application.bidHistory.filter((entry) => entry.type === "INITIAL_BID" || entry.type === "COUNTER_OFFER").length;
  const latest = application.latestCounterOffer ?? counters.at(-1);
  const open = Boolean(application.currentBid) && ["applied", "pending"].includes(application.status);
  const canRespond = open && (latest
    ? latest.status === "pending" && latest.madeByRole !== application.participantRole
    : application.participantRole === "job_owner");
  return { canRespond, counterLimitReached: bidCount >= 3, bidCount };
};
