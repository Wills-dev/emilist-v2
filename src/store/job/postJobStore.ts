import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { PostJobStoreState } from "@/store/types/job";
import { createJobDraftStoreBody } from "./createJobDraftStoreBody";

const pickPersistedDraft = (state: PostJobStoreState) => ({
  step: state.step,
  jobCategory: state.jobCategory,
  service: state.service,
  title: state.title,
  description: state.description,
  jobUrgency: state.jobUrgency,
  budget: state.budget,
  jobDuration: state.jobDuration,
  jobSchedule: state.jobSchedule,
  jobFrequency: state.jobFrequency,
  startDate: state.startDate,
  endDate: state.endDate,
  location: state.location,
  allowBidding: state.allowBidding,
  experienceLevel: state.experienceLevel,
  milestones: state.milestones,
  // A direct-hire target must be supplied again by its entry route or user.
  expertId: "",
});

export const usePostJobStore = create<PostJobStoreState>()(
  persist(createJobDraftStoreBody, {
    name: "post-job-form-store",
    storage: createJSONStorage(() => localStorage),
    partialize: (state) => ({
      ...pickPersistedDraft(state),
      savedFileCount: state.savedFileCount,
    }),
    skipHydration: true,
    version: 1,
    migrate: (persistedState) => ({
      ...(persistedState as Partial<PostJobStoreState>),
      expertId: "",
    }),
  }),
);
