import type {
  JobDurationUnit,
  JobExperienceLevel,
  JobFrequency,
  JobUrgency,
} from "./postJob";

export interface JobListLocationDto {
  address?: string;
  lat?: number;
  lng?: number;
}

export interface JobListPosterDto {
  _id: string;
  uniqueId?: string;
  userName?: string;
  fullName?: string;
  profileImage?: string;
  level?: string;
}

export interface JobListMoneyDto {
  amount?: number | string;
  currency?: string;
  period?: string;
}

export interface JobListDurationDto {
  value?: number | string;
  number?: number | string;
  unit?: JobDurationUnit | string;
  period?: JobDurationUnit | string;
}

export interface JobListScheduleDto {
  startDate?: string;
  endDate?: string;
}

export interface JobListMediaDto {
  id?: string;
  _id?: string;
  url?: string;
  secureUrl?: string;
  src?: string;
}

/**
 * The canonical list shape documented by GET /jobs/fetch-all-jobs.
 * Budget, timeline, media and timestamp fields are optional extensions because
 * they are not present in the documented list response, but some deployments
 * may already return the corresponding create-job fields.
 */
export interface FetchAllJobsItemDto {
  _id: string;
  title: string;
  description: string;
  jobCategory: string;
  category?: string;
  service: string;
  jobUrgency: JobUrgency;
  location: JobListLocationDto | string;
  type: string;
  status: string;
  userId: JobListPosterDto | string | null;
  applicantsCount: number;
  milestonesCount: number;
  liked: boolean;
  posterRating: {
    averageRating: number;
    totalReviews: number;
  };
  budget?: JobListMoneyDto | string | number;
  totalBudget?: JobListMoneyDto | string;
  estimatedBudget?: JobListMoneyDto | string;
  recurringBudget?: JobListMoneyDto | string;
  jobDuration?: JobListDurationDto | string;
  jobSchedule?: JobListScheduleDto | string;
  jobFrequency?: JobFrequency | string;
  files?: Array<string | JobListMediaDto>;
  jobFiles?: Array<string | JobListMediaDto>;
  images?: Array<string | JobListMediaDto>;
  createdAt?: string;
}

export interface FetchAllJobsPage {
  currentPage: number;
  totalPages: number;
  totalJobs: number;
  jobs: FetchAllJobsItemDto[];
}

export interface FetchAllJobsEnvelope {
  message: string;
  data: FetchAllJobsPage;
}

export interface FetchAllJobsQuery {
  page: number;
  limit: number;
  search?: string;
  title?: string;
  location?: string;
  category?: string;
  service?: string;
  userId?: string;
  categories?: readonly string[];
  locations?: readonly string[];
  minBudget?: number;
  maxBudget?: number;
  jobUrgency?: JobUrgency;
  experienceLevel?: readonly JobExperienceLevel[];
  minRating?: number;
}

export type FetchAllJobsListQuery = Omit<FetchAllJobsQuery, "page">;

export interface FetchAllJobsWireParams {
  page: number;
  limit: number;
  search?: string;
  title?: string;
  location?: string;
  category?: string;
  service?: string;
  userId?: string;
  categories?: string;
  locations?: string;
  minBudget?: number;
  maxBudget?: number;
  jobUrgency?: JobUrgency;
  experienceLevel?: string;
  minRating?: number;
}

export interface JobCardViewModel {
  id: string;
  posterId: string;
  category: string;
  title: string;
  description: string;
  budgetAmount: number | null;
  currency: string | null;
  location: string;
  timeline: string | null;
  applicants: number;
  isLiked: boolean;
  posterName: string;
  posterRating: number;
  posterReviewCount: number;
  posterProfileImage: string | null;
  imageUrl: string | null;
  createdAt: string | null;
}
