import type { ApplicationDetailsDto } from "../types/applicationDetails";

export const getApplicationAttention = (application: ApplicationDetailsDto | undefined) => {
  if (!application || application.participantRole !== "applicant" || !["applied", "pending"].includes(application.status)) {
    return { requiresResponse: false, message: "" };
  }
  const latest = application.latestCounterOffer ?? application.bidHistory.filter((entry) => entry.type === "COUNTER_OFFER").at(-1);
  if (!latest) return { requiresResponse: false, message: "Waiting for Employer’s response…" };
  if (latest.status === "pending" && latest.madeByRole === "job_owner") {
    return { requiresResponse: true, message: "Employer has sent a counteroffer. Review it in My Application." };
  }
  if (latest.status === "pending" && latest.madeByRole === "applicant") {
    return { requiresResponse: false, message: "Waiting for Employer’s response to your counteroffer…" };
  }
  if (latest.status === "accepted") return { requiresResponse: false, message: "The offer has been accepted." };
  if (latest.status === "rejected") return { requiresResponse: false, message: "The counteroffer was rejected." };
  return { requiresResponse: false, message: "" };
};
