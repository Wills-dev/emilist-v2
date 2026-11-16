import type { JobApplicant } from "../types/jobManagement";

export const getApplicantSelectionState = ({ applicant, jobStatus, acceptedApplicationId, hasAcceptedApplication = false }: {
  applicant: Pick<JobApplicant, "id" | "status" | "acceptedAt" | "rejectedAt">;
  jobStatus?: string;
  acceptedApplicationId?: string;
  hasAcceptedApplication?: boolean;
}) => {
  const status = applicant.status?.trim().toLowerCase();
  const jobCancelled = ["cancelled", "canceled", "cancel"].includes(jobStatus?.trim().toLowerCase() ?? "");
  const accepted = acceptedApplicationId
    ? applicant.id === acceptedApplicationId
    : ["accepted", "active", "paused", "pause", "completed"].includes(status ?? "") || Boolean(applicant.acceptedAt && !applicant.rejectedAt);
  const locked = !jobCancelled && !accepted && hasAcceptedApplication;
  const canRespond = Boolean(applicant.id) && !accepted && !locked && (jobCancelled || !status || ["pending", "applied"].includes(status));
  return { accepted, locked, canRespond, jobCancelled };
};
