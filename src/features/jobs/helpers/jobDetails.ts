import type {
  JobListDurationDto,
  JobListMediaDto,
  JobListMoneyDto,
  JobListScheduleDto,
} from "../types/listJobs";
import type { JobDetailsDto, JobDetailsViewModel } from "../types/jobDetails";

const parseObject = <T extends object>(value: T | string | undefined) => {
  if (!value) return undefined;
  if (typeof value !== "string") return value;
  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as T) : undefined;
  } catch {
    return undefined;
  }
};

const toNumber = (value: unknown) => {
  const parsed = Number(String(value ?? "").replaceAll(",", ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const parseMoney = (value: JobListMoneyDto | string | number | undefined) => {
  if (typeof value === "number") return { amount: value };
  return parseObject<JobListMoneyDto>(value);
};

const getImageUrl = (value: string | JobListMediaDto) => {
  if (typeof value === "string") return value.trim();
  return value.url?.trim() || value.secureUrl?.trim() || value.src?.trim() || "";
};

const formatDuration = (value: JobListDurationDto | string | undefined) => {
  if (typeof value === "string" && !value.trim().startsWith("{")) return value;
  const duration = parseObject<JobListDurationDto>(value);
  const amount = duration?.value ?? duration?.number;
  const unit = duration?.unit ?? duration?.period;
  if (!amount || !unit) return undefined;

  const numericAmount = Number(amount);
  const normalizedUnit = String(unit).replace(/\(s\)$/i, "");
  const displayUnit = numericAmount === 1
    ? normalizedUnit.replace(/s$/i, "")
    : normalizedUnit.endsWith("s")
      ? normalizedUnit
      : `${normalizedUnit}s`;

  return `${amount} ${displayUnit}`;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
};

const frequencyLabels: Record<string, string> = {
  weekly: "Weekly",
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
};

const formatJobTimeline = (job: JobDetailsDto) => {
  if (job.jobUrgency === "right_now") {
    return formatDuration(job.jobDuration) || "Immediate start";
  }

  if (job.jobUrgency === "in_future") {
    const schedule = parseObject<JobListScheduleDto>(job.jobSchedule);
    if (schedule?.startDate && schedule.endDate) {
      return `${formatDate(schedule.startDate)} – ${formatDate(schedule.endDate)}`;
    }
    if (schedule?.startDate) return `Starts ${formatDate(schedule.startDate)}`;
    return "Scheduled for the future";
  }

  if (job.jobUrgency === "regularly") {
    const frequency = frequencyLabels[job.jobFrequency || ""] || job.jobFrequency || "Recurring";
    if (job.startDate && job.endDate) {
      return `${frequency}, ${formatDate(job.startDate)} – ${formatDate(job.endDate)}`;
    }
    if (job.startDate) return `${frequency} from ${formatDate(job.startDate)}`;
    return frequency;
  }

  return formatDuration(job.jobDuration) || "Timeline unavailable";
};

const urgencyLabels: Record<string, string> = {
  right_now: "Immediately",
  in_future: "In future",
  regularly: "Regularly",
};

export const mapJobDetails = (job: JobDetailsDto): JobDetailsViewModel => {
  const poster = job.userId && typeof job.userId === "object" ? job.userId : undefined;
  const selectedBudget =
    job.jobUrgency === "right_now"
      ? job.totalBudget
      : job.jobUrgency === "in_future"
        ? job.estimatedBudget
        : job.recurringBudget;
  const budget = parseMoney(selectedBudget) ?? parseMoney(job.budget);
  const location =
    typeof job.location === "string" ? job.location : job.location?.address;
  const description = job.description?.trim() || "No job description provided.";

  return {
    id: job._id,
    category: job.jobCategory?.trim() || job.category?.trim() || "Uncategorised",
    title: job.title?.trim() || "Untitled job",
    createdAt: job.createdAt || new Date(0).toISOString(),
    price: toNumber(budget?.amount),
    currency: budget?.currency?.trim() || "NGN",
    location: location?.trim() || "Location not specified",
    duration: formatJobTimeline(job),
    applicants: Math.max(0, toNumber(job.applicantsCount)),
    level: job.experienceLevel?.trim() || "Not specified",
    isLiked: Boolean(job.liked),
    ownerId: poster?._id || (typeof job.userId === "string" ? job.userId : ""),
    ownerName: poster?.fullName?.trim() || poster?.userName?.trim() || "Job poster",
    ownerImage: poster?.profileImage?.trim() || "",
    ownerRating: Math.max(0, toNumber(job.posterRating?.averageRating)),
    ownerReviewCount: Math.max(0, toNumber(job.posterRating?.totalReviews)),
    urgency: urgencyLabels[job.jobUrgency] || job.jobUrgency,
    description: description.split(/\n+/).filter(Boolean),
    images: (job.jobFiles ?? job.files ?? job.images ?? []).map(getImageUrl).filter(Boolean),
    milestones: (job.milestones ?? []).map((milestone, index) => ({
      id: milestone._id || milestone.id || `milestone-${index + 1}`,
      title: milestone.achievement?.trim() || milestone.title?.trim() || `Milestone ${index + 1}`,
      duration: formatDuration(milestone.timeFrame ?? milestone.duration) || "Timeline unavailable",
      amount: toNumber(milestone.amount),
      currency: milestone.currency?.trim() || budget?.currency?.trim() || "NGN",
      details: milestone.details?.trim() || milestone.description?.trim() || milestone.achievement?.trim() || "No milestone details provided.",
      isExpanded: true,
    })),
  };
};
