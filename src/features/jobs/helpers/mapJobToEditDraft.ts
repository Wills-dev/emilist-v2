import type {
  JobListDurationDto,
  JobListLocationDto,
  JobListMediaDto,
  JobListMoneyDto,
  JobListScheduleDto,
} from "../types/listJobs";
import type { JobDetailsDto } from "../types/jobDetails";
import type {
  JobDurationUnit,
  PostJobDraft,
  PostJobMilestoneDraft,
} from "../types/postJob";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { createMilestone } from "@/store/job/postJobDraftDefaults";
import type { ExistingJobFile } from "../components/ExistingJobFiles/ExistingJobFiles";

const parseObject = <T extends object>(
  value: T | string | undefined,
): T | undefined => {
  if (!value) return undefined;
  if (typeof value !== "string") return value;

  try {
    const parsed: unknown = JSON.parse(value);
    return parsed && typeof parsed === "object" ? (parsed as T) : undefined;
  } catch {
    return undefined;
  }
};

const parseMoney = (value: JobListMoneyDto | string | number | undefined) => {
  if (typeof value === "number") return { amount: value };
  return parseObject<JobListMoneyDto>(value);
};

const DURATION_UNITS = new Set<JobDurationUnit>(["days", "weeks", "months"]);

const normalizeDurationUnit = (unit: unknown): JobDurationUnit =>
  DURATION_UNITS.has(unit as JobDurationUnit)
    ? (unit as JobDurationUnit)
    : "weeks";

const mapDuration = (value: JobListDurationDto | string | undefined) => {
  const duration = parseObject<JobListDurationDto>(value);
  const amount = duration?.value ?? duration?.number;
  return {
    value: amount !== undefined && amount !== null ? String(amount) : "",
    unit: normalizeDurationUnit(duration?.unit ?? duration?.period),
  };
};

const mapSchedule = (value: JobListScheduleDto | string | undefined) => {
  const schedule = parseObject<JobListScheduleDto>(value);
  return {
    startDate: schedule?.startDate?.slice(0, 10) ?? "",
    endDate: schedule?.endDate?.slice(0, 10) ?? "",
  };
};

const mapLocation = (value: JobListLocationDto | string | undefined) => {
  if (typeof value === "string") {
    return { address: value, lat: null, lng: null };
  }
  return {
    address: value?.address?.trim() ?? "",
    lat: typeof value?.lat === "number" ? value.lat : null,
    lng: typeof value?.lng === "number" ? value.lng : null,
  };
};

const getFileEntry = (
  value: string | JobListMediaDto,
): ExistingJobFile | null => {
  if (typeof value === "string") return null;
  const id = value._id ?? value.id;
  const url = value.url?.trim() || value.secureUrl?.trim() || value.src?.trim();
  if (!id || !url) return null;
  return { id, url };
};

/** Server-hosted job files, keyed by id so they can be removed via the delete-file endpoint. */
export const mapJobExistingFiles = (job: JobDetailsDto): ExistingJobFile[] =>
  (job.jobFiles ?? job.files ?? job.images ?? [])
    .map(getFileEntry)
    .filter((file): file is ExistingJobFile => file !== null);

/** Reverses buildPostJobPayload: turns a fetched job back into an editable draft. */
export const mapJobToEditDraft = (job: JobDetailsDto): PostJobDraft => {
  const selectedBudget =
    job.jobUrgency === "right_now"
      ? job.totalBudget
      : job.jobUrgency === "in_future"
        ? job.estimatedBudget
        : job.recurringBudget;
  const money = parseMoney(selectedBudget) ?? parseMoney(job.budget);

  const milestones: PostJobMilestoneDraft[] =
    job.milestones && job.milestones.length > 0
      ? job.milestones.map((milestone, index) => {
          const timeFrame = parseObject<JobListDurationDto>(
            milestone.timeFrame ?? milestone.duration,
          );
          const amountValue = milestone.amount;

          return {
            id: milestone._id || milestone.id || `milestone-${index + 1}`,
            timeFrame: {
              number: String(timeFrame?.value ?? timeFrame?.number ?? ""),
              period: normalizeDurationUnit(
                timeFrame?.unit ?? timeFrame?.period,
              ),
            },
            achievement: milestone.achievement?.trim() ?? "",
            amount:
              amountValue !== undefined && amountValue !== null
                ? formatInputTextNumberWithCommas(String(amountValue))
                : "",
            isExpanded: true,
          };
        })
      : [createMilestone()];

  return {
    step: 1,
    jobCategory: job.jobCategory?.trim() || job.category?.trim() || "",
    service: job.service?.trim() || "",
    title: job.title ?? "",
    description: job.description ?? "",
    jobUrgency: job.jobUrgency,
    budget: {
      currency: money?.currency?.trim() || "NGN",
      amount:
        money?.amount !== undefined
          ? formatInputTextNumberWithCommas(String(money.amount))
          : "",
    },
    jobDuration: mapDuration(job.jobDuration),
    jobSchedule: mapSchedule(job.jobSchedule),
    jobFrequency: (job.jobFrequency as PostJobDraft["jobFrequency"]) || "weekly",
    startDate: job.startDate?.slice(0, 10) ?? "",
    endDate: job.endDate?.slice(0, 10) ?? "",
    location: mapLocation(job.location),
    allowBidding: true,
    experienceLevel:
      (job.experienceLevel as PostJobDraft["experienceLevel"]) || "senior",
    expertId: "",
    milestones,
  };
};
