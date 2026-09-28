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
  rate: "Rate expert",
  convert: "Convert to recurring job",
  "counter-offer": "Suggest Counter-Offer",
  "complete-milestone": "Complete Milestone",
  "rate-employer": "Rate employer",
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
): JobAction | null => {
  const key = normalizeJobStatus(status);
  if (!isOwner) {
    if (key === "applied") return "withdraw";
    if (key === "in-review") return "accept";
    if (key === "active") return "complete-milestone";
    if (key === "overdue") return "cancel";
    return null;
  }
  switch (key) {
    case "listed":
      return "edit";
    case "active":
      return "pause";
    case "paused":
      return "resume";
    case "overdue":
      return "cancel";
    default:
      return null;
  }
};
