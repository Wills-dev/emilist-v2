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
