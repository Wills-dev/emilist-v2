import type { FetchAllJobsItemDto } from "../types/listJobs";
import type { LeadJobRow } from "../types/manageJobs";
import {
  formatListDate,
  resolveBudgetLabel,
  resolveShortJobId,
} from "./manageJobs";

export const mapJobLeadRow = (job: FetchAllJobsItemDto): LeadJobRow => ({
  id: job._id,
  posted: formatListDate(job.createdAt),
  serviceCategory:
    job.service?.trim() ||
    job.jobCategory?.trim() ||
    job.category?.trim() ||
    "—",
  jobId: resolveShortJobId(job._id),
  jobTitle: job.title?.trim() || "Untitled job",
  budget: resolveBudgetLabel(job),
  location:
    (typeof job.location === "string"
      ? job.location.trim()
      : job.location?.address?.trim()) || "Location not specified",
  applicants: Math.max(0, Number(job.applicantsCount) || 0),
});
