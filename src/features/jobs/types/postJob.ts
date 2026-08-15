export type PostJobStep = 1 | 2;

export type JobUrgency = "right_now" | "in_future" | "regularly";

export type JobDurationUnit = "days" | "weeks" | "months";

export type JobFrequency = "weekly" | "biweekly" | "monthly";

export type JobExperienceLevel =
  | "apprentice"
  | "junior"
  | "intermediate"
  | "senior";

export type OneToFive = 1 | 2 | 3 | 4 | 5;

export interface PostJobOption<TValue extends string = string> {
  label: string;
  value: TValue;
}

export interface JobMoney {
  currency: string;
  amount: number;
}

export interface RecurringJobMoney extends JobMoney {
  period: JobFrequency;
}

export interface JobLocation {
  address: string;
  lat?: number;
  lng?: number;
}

export interface JobDuration {
  value: number;
  unit: JobDurationUnit;
}

export interface JobSchedule {
  startDate: string;
  endDate: string;
}

export interface JobMilestoneWriteDto {
  timeFrame: {
    number: number;
    period: JobDurationUnit;
  };
  achievement: string;
  amount: number;
  currency: string;
}

export interface PostJobWriteDto<TFile = File> {
  jobCategory: string;
  service: string;
  title: string;
  description: string;
  jobUrgency: JobUrgency;
  location: JobLocation;
  milestones: JobMilestoneWriteDto[];
  files?: TFile[];
  expertId?: string;
  allowBidding?: boolean;
  experienceLevel?: JobExperienceLevel;
  totalBudget?: JobMoney;
  estimatedBudget?: JobMoney;
  recurringBudget?: RecurringJobMoney;
  jobDuration?: JobDuration;
  jobSchedule?: JobSchedule;
  jobFrequency?: JobFrequency;
  startDate?: string;
  endDate?: string;
}

export interface PostJobDraftBudget {
  currency: string;
  amount: string;
}

export interface PostJobDraftDuration {
  value: string;
  unit: JobDurationUnit;
}

export interface PostJobMilestoneDraft {
  id: string;
  timeFrame: {
    number: string;
    period: JobDurationUnit;
  };
  achievement: string;
  amount: string;
  isExpanded: boolean;
}

export interface PostJobDraft {
  step: PostJobStep;
  jobCategory: string;
  service: string;
  title: string;
  description: string;
  jobUrgency: JobUrgency;
  budget: PostJobDraftBudget;
  jobDuration: PostJobDraftDuration;
  jobSchedule: JobSchedule;
  jobFrequency: JobFrequency;
  startDate: string;
  endDate: string;
  location: {
    address: string;
    lat: number | null;
    lng: number | null;
  };
  allowBidding: boolean;
  experienceLevel: JobExperienceLevel;
  expertId: string;
  milestones: PostJobMilestoneDraft[];
}

export interface PostJobTransientUploads<TFile = File> {
  files: TFile[];
  previews: string[];
}

export interface PostJobFormData<TFile = File> {
  draft: PostJobDraft;
  uploads: PostJobTransientUploads<TFile>;
}
