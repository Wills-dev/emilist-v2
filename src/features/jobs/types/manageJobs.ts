import type { FetchAllJobsItemDto, FetchAllJobsPage, FetchAllJobsQuery } from "./listJobs";

export type ManageJobsTab =
  | "listed"
  | "overdue"
  | "paused"
  | "active"
  | "completed"
  | "leads";

export type BadgeTone = "success" | "warning" | "danger" | "neutral";

export type ListedJobsQuery = Pick<
  FetchAllJobsQuery,
  "page" | "limit" | "search" | "title" | "location" | "category" | "service"
>;

export type ListedJobsListQuery = Omit<ListedJobsQuery, "page">;

export interface ListedJobsEnvelope {
  message: string;
  data: FetchAllJobsPage;
}

export type ListedJobDto = FetchAllJobsItemDto;

// Statuses accepted by GET /jobs/fetch-jobs-by-status. "pending" is a legacy
// alias the API maps onto "listed", so it isn't one of the manage-jobs tabs.
export type JobStatusFilter =
  | "listed"
  | "pending"
  | "in review"
  | "completed"
  | "active"
  | "paused"
  | "overdue";

export interface JobMilestoneProgressDto {
  completedMilestones?: number;
  totalMilestones?: number;
  currentMilestone?: string;
}

export interface JobsByStatusItemDto extends FetchAllJobsItemDto {
  milestoneProgress?: JobMilestoneProgressDto | string;
  dueDate?: string;
  completedAt?: string;
  isOverdue?: boolean;
}

export interface JobsByStatusPage {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  jobs: JobsByStatusItemDto[];
}

export interface JobsByStatusEnvelope {
  message: string;
  data: JobsByStatusPage;
}

export type JobsByStatusQuery = Pick<
  FetchAllJobsQuery,
  "page" | "limit" | "search" | "title" | "location" | "category" | "service"
> & {
  status: JobStatusFilter;
};

export type JobsByStatusListQuery = Omit<JobsByStatusQuery, "page" | "status">;

export interface ListedJobRow {
  id: string;
  date: string;
  jobType: "Created" | "Applied";
  jobTitle: string;
  jobDuration: string;
  budget: string;
  statusRaw: string;
  isOwner: boolean;
  needsAction: boolean;
}

export interface OverdueJobRow {
  id: string;
  startDate: string;
  jobId: string;
  jobTitle: string;
  duration: string;
  budget: string;
}

export interface PausedJobRow {
  id: string;
  dateCreated: string;
  jobId: string;
  jobTitle: string;
  duration: string;
  budget: string;
}

export interface ActiveJobRow {
  id: string;
  startDate: string;
  jobId: string;
  jobTitle: string;
  budget: string;
  progress: string;
}

export interface CompletedJobRow {
  id: string;
  completedDate: string;
  jobId: string;
  jobTitle: string;
  duration: string;
  budget: string;
}

export interface LeadJobRow {
  id: string;
  posted: string;
  serviceCategory: string;
  jobId: string;
  jobTitle: string;
  budget: string;
  location: string;
  applicants: number;
}

export interface JobStat {
  id: string;
  label: string;
  tone: BadgeTone;
  context: string;
  value: number;
  trend: string;
  day: string;
}
