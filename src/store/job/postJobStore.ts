import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { MAX_POST_JOB_MILESTONES } from "@/features/jobs/constants/postJob";
import {
  deriveFinalMilestoneAmount,
  deriveFinalMilestoneDuration,
} from "@/features/jobs/helpers/postJobMilestones";
import {
  PostJobDraft,
  PostJobMilestoneDraft,
} from "@/features/jobs/types/postJob";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { PostJobStoreState } from "@/store/types/job";

const createMilestone = (id = "milestone-1"): PostJobMilestoneDraft => ({
  id,
  timeFrame: { number: "", period: "weeks" },
  achievement: "",
  amount: "",
  isExpanded: true,
});

const defaultDraft: PostJobDraft = {
  step: 1,
  jobCategory: "",
  service: "",
  title: "",
  description: "",
  jobUrgency: "right_now",
  budget: { currency: "NGN", amount: "" },
  jobDuration: { value: "", unit: "weeks" },
  jobSchedule: { startDate: "", endDate: "" },
  jobFrequency: "weekly",
  startDate: "",
  endDate: "",
  location: { address: "", lat: null, lng: null },
  allowBidding: true,
  experienceLevel: "senior",
  expertId: "",
  milestones: [createMilestone()],
};

const pickDraft = (state: PostJobStoreState): PostJobDraft => ({
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
  expertId: state.expertId,
  milestones: state.milestones,
});

const pickPersistedDraft = (state: PostJobStoreState): PostJobDraft => ({
  ...pickDraft(state),
  // A direct-hire target must be supplied again by its entry route or user.
  expertId: "",
});

const createMilestoneId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `milestone-${crypto.randomUUID()}`
    : `milestone-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const usePostJobStore = create<PostJobStoreState>()(
  persist(
    (set, get) => ({
      ...defaultDraft,
      files: [],
      previews: [],
      savedFileCount: 0,

      setStep: (step) => set({ step }),
      setField: (field, value) => set({ [field]: value }),
      setBudgetField: (field, value) =>
        set((state) => ({ budget: { ...state.budget, [field]: value } })),
      setDurationField: (field, value) =>
        set((state) => ({
          jobDuration: { ...state.jobDuration, [field]: value },
        })),
      setScheduleField: (field, value) =>
        set((state) => ({
          jobSchedule: { ...state.jobSchedule, [field]: value },
        })),
      setLocationField: (field, value) =>
        set((state) => ({
          location: { ...state.location, [field]: value },
        })),

      addMilestone: () =>
        set((state) => {
          if (state.milestones.length >= MAX_POST_JOB_MILESTONES) return state;

          const milestones = state.milestones.map((milestone) => ({
            ...milestone,
            timeFrame: { ...milestone.timeFrame },
          }));
          const previousFinal = milestones.at(-1);
          const finalAmount = deriveFinalMilestoneAmount(
            milestones,
            state.budget.amount,
          );

          if (previousFinal && finalAmount !== null) {
            previousFinal.amount = formatInputTextNumberWithCommas(
              String(finalAmount),
            );
          }

          if (previousFinal && state.jobUrgency === "right_now") {
            const finalDuration = deriveFinalMilestoneDuration(
              milestones,
              state.jobDuration,
            );
            if (finalDuration) {
              previousFinal.timeFrame = {
                number: String(finalDuration.number),
                period: finalDuration.period,
              };
            }
          }

          return {
            milestones: [...milestones, createMilestone(createMilestoneId())],
          };
        }),
      updateMilestone: (id, updates) =>
        set((state) => ({
          milestones: state.milestones.map((milestone) =>
            milestone.id === id
              ? {
                  ...milestone,
                  ...updates,
                  timeFrame: updates.timeFrame
                    ? { ...updates.timeFrame }
                    : milestone.timeFrame,
                }
              : milestone,
          ),
        })),
      removeMilestone: (id) =>
        set((state) =>
          state.milestones.length === 1
            ? state
            : {
                milestones: state.milestones.filter(
                  (milestone) => milestone.id !== id,
                ),
              },
        ),
      toggleMilestone: (id) =>
        set((state) => ({
          milestones: state.milestones.map((milestone) =>
            milestone.id === id
              ? { ...milestone, isExpanded: !milestone.isExpanded }
              : milestone,
          ),
        })),
      setFiles: (files, previews) =>
        set({ files, previews, savedFileCount: files.length }),
      removeFile: (index) =>
        set((state) => {
          const files = state.files.filter(
            (_, fileIndex) => fileIndex !== index,
          );
          return {
            files,
            savedFileCount: files.length,
            previews: state.previews.filter(
              (_, previewIndex) => previewIndex !== index,
            ),
          };
        }),
      getDraft: () => pickDraft(get()),
      getFormData: () => {
        const state = get();
        return {
          draft: pickDraft(state),
          uploads: { files: state.files, previews: state.previews },
        };
      },
      resetForm: () =>
        set({
          ...defaultDraft,
          milestones: [createMilestone()],
          files: [],
          previews: [],
          savedFileCount: 0,
        }),
    }),
    {
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
    },
  ),
);
