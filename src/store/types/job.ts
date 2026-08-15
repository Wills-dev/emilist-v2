import {
  JobLocation,
  PostJobDraft,
  PostJobDraftBudget,
  PostJobDraftDuration,
  PostJobFormData,
  PostJobMilestoneDraft,
  PostJobStep,
} from "@/features/jobs/types/postJob";

type PostJobScalarField = Exclude<
  keyof PostJobDraft,
  "step" | "budget" | "jobDuration" | "jobSchedule" | "location" | "milestones"
>;

export interface PostJobStoreState extends PostJobDraft {
  files: File[];
  previews: string[];
  /** Serializable reminder that browser-only File objects were in the draft. */
  savedFileCount: number;
  setStep: (step: PostJobStep) => void;
  setField: <K extends PostJobScalarField>(
    field: K,
    value: PostJobDraft[K],
  ) => void;
  setBudgetField: <K extends keyof PostJobDraftBudget>(
    field: K,
    value: PostJobDraftBudget[K],
  ) => void;
  setDurationField: <K extends keyof PostJobDraftDuration>(
    field: K,
    value: PostJobDraftDuration[K],
  ) => void;
  setScheduleField: (
    field: "startDate" | "endDate",
    value: string,
  ) => void;
  setLocationField: <K extends keyof JobLocation>(
    field: K,
    value: JobLocation[K] | null,
  ) => void;
  addMilestone: () => void;
  updateMilestone: (
    id: string,
    updates: Partial<Omit<PostJobMilestoneDraft, "id">>,
  ) => void;
  removeMilestone: (id: string) => void;
  toggleMilestone: (id: string) => void;
  setFiles: (files: File[], previews: string[]) => void;
  removeFile: (index: number) => void;
  getDraft: () => PostJobDraft;
  getFormData: () => PostJobFormData;
  resetForm: () => void;
}
