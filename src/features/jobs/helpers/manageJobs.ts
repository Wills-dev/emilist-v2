import type {
  FetchAllJobsItemDto,
  JobListMoneyDto,
  JobListScheduleDto,
} from "../types/listJobs";
import type {
  ActiveJobRow,
  BadgeTone,
  CompletedJobRow,
  JobMilestoneProgressDto,
  JobsByStatusItemDto,
  ListedJobRow,
  ManageJobsTab,
  OverdueJobRow,
  PausedJobRow,
} from "../types/manageJobs";
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
  completed: { label: "Completed", tone: "neutral" },
};

export const resolveJobStatusMeta = (status: string) => {
  const key = normalizeJobStatus(status);
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
  ACTION_NEEDED_STATUSES.has(normalizeJobStatus(status));

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

export const normalizeJobStatus = (status: string) =>
  status?.trim().toLowerCase().replace(/[ _]+/g, "-");

export const isListedJobStatus = (status: string) =>
  ["listed", "in-review", "applied", "rejected"].includes(
    normalizeJobStatus(status),
  );

export const resolveListedJobAction = (
  status: string,
): { label: string; disabled?: boolean } | null => {
  switch (normalizeJobStatus(status)) {
    case "listed":
      return { label: "Edit Job" };
    case "in-review":
      return { label: "Accept Job Offer" };
    case "applied":
      return { label: "Withdraw Application" };
    default:
      return null;
  }
};

export const resolveManageJobsTab = (value?: string | null): ManageJobsTab =>
  ["overdue", "paused", "active", "completed", "leads"].includes(value ?? "")
    ? (value as ManageJobsTab)
    : "listed";

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

export const resolveShortJobId = (id: string) =>
  id ? `#${id.slice(-6).toUpperCase()}` : "—";

const resolveJobStartDate = (job: FetchAllJobsItemDto) => {
  const schedule = parseJsonObject<JobListScheduleDto>(job.jobSchedule);
  return schedule?.startDate ?? job.createdAt;
};

const parseMilestoneProgress = (
  value: JobMilestoneProgressDto | string | undefined,
) => parseJsonObject<JobMilestoneProgressDto>(value);

export const resolveMilestoneProgressLabel = (job: JobsByStatusItemDto) => {
  const progress = parseMilestoneProgress(job.milestoneProgress);
  if (!progress) return "—";
  if (progress.currentMilestone) return progress.currentMilestone;

  const completed = Number(progress.completedMilestones);
  const total = Number(progress.totalMilestones);
  if (Number.isFinite(completed) && Number.isFinite(total) && total > 0) {
    return `Milestone ${completed}/${total}`;
  }

  return "—";
};

export const mapOverdueJobRow = (job: JobsByStatusItemDto): OverdueJobRow => ({
  id: job._id,
  startDate: formatListDate(job.dueDate ?? resolveJobStartDate(job)),
  jobId: resolveShortJobId(job._id),
  jobTitle: job.title?.trim() || "Untitled job",
  duration: formatDuration(job) ?? "—",
  budget: resolveBudgetLabel(job),
});

export const mapPausedJobRow = (job: JobsByStatusItemDto): PausedJobRow => ({
  id: job._id,
  dateCreated: formatListDate(job.createdAt),
  jobId: resolveShortJobId(job._id),
  jobTitle: job.title?.trim() || "Untitled job",
  duration: formatDuration(job) ?? "—",
  budget: resolveBudgetLabel(job),
});

export const mapActiveJobRow = (job: JobsByStatusItemDto): ActiveJobRow => ({
  id: job._id,
  startDate: formatListDate(resolveJobStartDate(job)),
  jobId: resolveShortJobId(job._id),
  jobTitle: job.title?.trim() || "Untitled job",
  budget: resolveBudgetLabel(job),
  progress: resolveMilestoneProgressLabel(job),
});

export const mapCompletedJobRow = (
  job: JobsByStatusItemDto,
): CompletedJobRow => ({
  id: job._id,
  completedDate: formatListDate(job.completedAt ?? job.createdAt),
  jobId: resolveShortJobId(job._id),
  jobTitle: job.title?.trim() || "Untitled job",
  duration: formatDuration(job) ?? "—",
  budget: resolveBudgetLabel(job),
});
