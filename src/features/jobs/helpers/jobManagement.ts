import { normalizeJobStatus } from "./manageJobs";
import type { JobAction } from "../types/jobManagement";

export const isManagedJobInProgress = (status: string) =>
  ["active", "paused", "overdue", "completed"].includes(
    normalizeJobStatus(status),
  );

export const jobActionLabels: Record<JobAction, string> = {
  edit: "Edit Job",
  remove: "Remove Job Listing",
  pause: "Pause Job",
  resume: "Resume Job",
  cancel: "Cancel Job",
  review: "Review Milestone",
  accept: "Accept Job Offer",
  withdraw: "Withdraw Application",
  convert: "Convert to recurring job",
  renew: "Renew recurring job",
  "counter-offer": "Suggest Counter-Offer",
  "complete-milestone": "Complete Milestone",
  "rate-employer": "Rate job owner",
};

export const getJobStatusMessage = (status: string, isOwner: boolean) => {
  switch (normalizeJobStatus(status)) {
    case "listed":
      return "Waiting for experts to respond…";
    case "in-review":
      return isOwner
        ? "Experts are waiting on your response…"
        : "Employer is waiting on your response…";
    case "applied":
      return "Waiting for Employer’s response…";
    case "rejected":
      return "Employer has responded";
    case "completed":
      return "This job is completed.";
    case "paused":
      return "This job is paused";
    case "overdue":
      return "This job is overdue";
    default:
      return "";
  }
};

export const getJobPrimaryAction = (
  status: string,
  isOwner: boolean,
  canCloseContract = false,
  milestones: Array<{ status?: string }> = [],
): JobAction | null => {
  const key = normalizeJobStatus(status);
  if (!isOwner) {
    if (key === "applied") return "withdraw";
    if (key === "in-review") return "accept";
    if (key === "active" && milestones.some((milestone) => ["active", "in-progress"].includes(normalizeJobStatus(milestone.status ?? "")))) return "complete-milestone";
    if (key === "overdue") return "cancel";
    return null;
  }
  switch (key) {
    case "listed":
      return "edit";
    case "active":
      return canCloseContract ? null : "pause";
    case "paused":
      return "resume";
    case "overdue":
      return "cancel";
    default:
      return null;
  }
};
