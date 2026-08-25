import type { FilterState } from "@/lib/hooks/useFilters";
import type {
  FetchAllJobsItemDto,
  FetchAllJobsListQuery,
  JobCardViewModel,
  JobListDurationDto,
  JobListMediaDto,
  JobListMoneyDto,
  JobListScheduleDto,
} from "../types/listJobs";
import type { JobExperienceLevel, JobUrgency } from "../types/postJob";

const JOB_URGENCIES = new Set<JobUrgency>([
  "right_now",
  "in_future",
  "regularly",
]);

const EXPERIENCE_LEVELS = new Set<JobExperienceLevel>([
  "apprentice",
  "junior",
  "intermediate",
  "senior",
]);

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

const parseNonNegativeNumber = (value: unknown) => {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = Number(String(value).replaceAll(",", ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : undefined;
};

const parsePositiveInteger = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? Math.trunc(parsed) : undefined;
};

const normalizeStringArray = (values: readonly string[]) =>
  [...new Set(values.map((value) => value.trim()).filter(Boolean))].sort(
    (left, right) => left.localeCompare(right),
  );

const normalizeJobUrgency = (value: string | null): JobUrgency | undefined =>
  value && JOB_URGENCIES.has(value as JobUrgency)
    ? (value as JobUrgency)
    : undefined;

const normalizeExperienceLevel = (
  value: string | null,
): JobExperienceLevel | undefined => {
  const normalized = value?.trim().toLowerCase() as
    | JobExperienceLevel
    | undefined;
  return normalized && EXPERIENCE_LEVELS.has(normalized)
    ? normalized
    : undefined;
};

export const buildJobsMarketplaceQuery = ({
  filters,
  search,
  viewerId,
  limit,
}: {
  filters: FilterState;
  search: string | null;
  viewerId?: string;
  limit: number;
}): FetchAllJobsListQuery => {
  const minBudget = parseNonNegativeNumber(filters.minPrice);
  const maxBudget = parseNonNegativeNumber(filters.maxPrice);
  const minRating = parseNonNegativeNumber(filters.rating);
  const experienceLevel = normalizeExperienceLevel(filters.level);
  const categories = normalizeStringArray(filters.categories);
  const location = filters.location?.trim();
  const jobUrgency = normalizeJobUrgency(filters.noticePeriod);
  const normalizedLimit =
    Number.isFinite(limit) && limit > 0 ? Math.trunc(limit) : 10;

  return {
    limit: normalizedLimit,
    ...(search?.trim() ? { search: search.trim() } : {}),
    ...(viewerId?.trim() ? { userId: viewerId.trim() } : {}),
    ...(categories.length > 0 ? { categories } : {}),
    ...(location ? { locations: [location] } : {}),
    ...(minBudget !== undefined ? { minBudget } : {}),
    ...(maxBudget !== undefined ? { maxBudget } : {}),
    ...(jobUrgency ? { jobUrgency } : {}),
    ...(experienceLevel ? { experienceLevel: [experienceLevel] } : {}),
    ...(minRating !== undefined && minRating >= 1 && minRating <= 5
      ? { minRating }
      : {}),
  };
};

const parseMoney = (
  value: JobListMoneyDto | string | number | undefined,
): JobListMoneyDto | undefined => {
  if (typeof value === "number") return { amount: value };
  return parseJsonObject<JobListMoneyDto>(value);
};

const getBudget = (job: FetchAllJobsItemDto) => {
  const urgencyBudget =
    job.jobUrgency === "right_now"
      ? job.totalBudget
      : job.jobUrgency === "in_future"
        ? job.estimatedBudget
        : job.recurringBudget;
  const budget = parseMoney(urgencyBudget) ?? parseMoney(job.budget);
  const amount = parseNonNegativeNumber(budget?.amount);

  return {
    amount: amount ?? null,
    currency: budget?.currency?.trim() || null,
  };
};

export const formatDuration = (job: FetchAllJobsItemDto) => {
  const duration = parseJsonObject<JobListDurationDto>(job.jobDuration);
  const amount = parsePositiveInteger(duration?.value ?? duration?.number);
  const unit = duration?.unit ?? duration?.period;
  if (amount && unit) return `${amount} ${unit}`;

  const schedule = parseJsonObject<JobListScheduleDto>(job.jobSchedule);
  if (schedule?.startDate && schedule.endDate) {
    return `${formatScheduleDate(schedule.startDate)} – ${formatScheduleDate(schedule.endDate)}`;
  }
  if (schedule?.startDate) {
    return `Starts ${formatScheduleDate(schedule.startDate)}`;
  }

  if (job.jobFrequency) {
    const frequencyLabels: Record<string, string> = {
      weekly: "Every week",
      biweekly: "Every 2 weeks",
      monthly: "Every month",
    };
    return frequencyLabels[job.jobFrequency] ?? String(job.jobFrequency);
  }

  const urgencyLabels: Record<JobUrgency, string> = {
    right_now: "Right now",
    in_future: "In future",
    regularly: "Recurring",
  };
  return urgencyLabels[job.jobUrgency] ?? null;
};

export const formatScheduleDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(date);
};

const getMediaUrl = (media: string | JobListMediaDto | undefined) => {
  if (!media) return null;
  if (typeof media === "string") return media.trim() || null;
  return media.url?.trim() || media.secureUrl?.trim() || media.src?.trim() || null;
};

export const mapJobListItem = (job: FetchAllJobsItemDto): JobCardViewModel => {
  const poster =
    job.userId && typeof job.userId === "object" ? job.userId : undefined;
  const budget = getBudget(job);
  const location =
    typeof job.location === "string"
      ? job.location.trim()
      : job.location?.address?.trim();
  const media = job.jobFiles?.[0] ?? job.files?.[0] ?? job.images?.[0];

  return {
    id: job._id,
    posterId:
      poster?._id || (typeof job.userId === "string" ? job.userId : ""),
    category: job.jobCategory?.trim() || job.category?.trim() || "Uncategorised",
    title: job.title?.trim() || "Untitled job",
    description: job.description?.trim() || "No job description provided.",
    budgetAmount: budget.amount,
    currency: budget.currency,
    location: location || "Location not specified",
    timeline: formatDuration(job),
    applicants: Math.max(0, Number(job.applicantsCount) || 0),
    isLiked: Boolean(job.liked),
    posterName:
      poster?.fullName?.trim() ||
      poster?.userName?.trim() ||
      poster?.uniqueId?.trim() ||
      "Job poster",
    posterRating: Math.max(0, Number(job.posterRating?.averageRating) || 0),
    posterReviewCount: Math.max(
      0,
      Number(job.posterRating?.totalReviews) || 0,
    ),
    posterProfileImage: poster?.profileImage?.trim() || null,
    imageUrl: getMediaUrl(media),
    createdAt: job.createdAt?.trim() || null,
  };
};
