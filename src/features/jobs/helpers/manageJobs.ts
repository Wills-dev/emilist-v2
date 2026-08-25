import type { FetchAllJobsItemDto, JobListMoneyDto } from "../types/listJobs";
import type { BadgeTone, ListedJobRow } from "../types/manageJobs";
import { formatDuration } from "./jobList";

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  GBP: "£",
  EUR: "€",
};

export const formatBudgetAmount = (amount: number, currency = "NGN") => {
  const symbol = CURRENCY_SYMBOLS[currency?.toUpperCase()] ?? currency;
  return `${symbol}${amount.toLocaleString("en-NG")}`;
};

const parseJsonObject = <T extends object>(value: T | string | undefined) => {
  if (!value) return undefined;
  if (typeof value !== "string") return value;

  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as T) : undefined;
  } catch {
    return undefined;
  }
};

const parseMoney = (
  value: JobListMoneyDto | string | number | undefined,
): JobListMoneyDto | undefined => {
  if (typeof value === "number") return { amount: value };
  return parseJsonObject<JobListMoneyDto>(value);
};

export const resolveBudgetLabel = (job: FetchAllJobsItemDto) => {
  const money =
    parseMoney(job.totalBudget) ??
    parseMoney(job.estimatedBudget) ??
    parseMoney(job.recurringBudget) ??
    parseMoney(job.budget);
  const amount = Number(money?.amount);

  if (!Number.isFinite(amount)) return "—";
  return formatBudgetAmount(amount, money?.currency ?? "NGN");
};

export const formatListDate = (value?: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${date.getUTCFullYear()}`;
};

const JOB_STATUS_META: Record<string, { label: string; tone: BadgeTone }> = {
  draft: { label: "Draft", tone: "neutral" },
  pending: { label: "Pending", tone: "warning" },
  listed: { label: "Listed", tone: "success" },
  "in-review": { label: "In-review", tone: "warning" },
  in_review: { label: "In-review", tone: "warning" },
  applied: { label: "Applied", tone: "success" },
  rejected: { label: "Rejected", tone: "danger" },
  overdue: { label: "Overdue", tone: "danger" },
  paused: { label: "Paused", tone: "warning" },
  active: { label: "Active", tone: "success" },
  completed: { label: "Completed", tone: "success" },
};

export const resolveJobStatusMeta = (status: string) => {
  const key = status?.trim().toLowerCase();
  return (
    JOB_STATUS_META[key] ?? {
      label: status || "Unknown",
      tone: "neutral" as BadgeTone,
    }
  );
};

// Statuses where the poster or applicant still has to do something about the job.
const ACTION_NEEDED_STATUSES = new Set(["draft", "in-review", "in_review"]);

export const jobNeedsAction = (status: string) =>
  ACTION_NEEDED_STATUSES.has(status?.trim().toLowerCase());

const resolveJobOwnerId = (job: FetchAllJobsItemDto) => {
  const poster = job.userId;
  if (!poster) return null;
  return typeof poster === "string" ? poster : poster._id;
};

export const resolveIsJobOwner = (
  job: FetchAllJobsItemDto,
  currentUserId?: string,
) => {
  const ownerId = resolveJobOwnerId(job);
  return Boolean(ownerId && currentUserId && ownerId === currentUserId);
};

export const resolveListedJobAction = (
  status: string,
  isOwner: boolean,
): { label: string; disabled?: boolean } => {
  if (isOwner) return { label: "Edit Job" };

  const key = status?.trim().toLowerCase();
  if (key === "in-review" || key === "in_review") {
    return { label: "Accept Job Offer" };
  }
  if (key === "rejected")
    return { label: "Withdraw Application", disabled: true };
  return { label: "Withdraw Application" };
};

export const mapListedJobRow = (
  job: FetchAllJobsItemDto,
  currentUserId?: string,
): ListedJobRow => {
  const statusRaw = job.status || "draft";
  const isOwner = resolveIsJobOwner(job, currentUserId);

  return {
    id: job._id,
    date: formatListDate(job.createdAt),
    jobType: isOwner ? "Created" : "Applied",
    jobTitle: job.title?.trim() || "Untitled job",
    jobDuration: formatDuration(job) ?? "—",
    budget: resolveBudgetLabel(job),
    statusRaw,
    isOwner,
    needsAction: jobNeedsAction(statusRaw),
  };
};
