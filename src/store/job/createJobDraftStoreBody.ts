import { StateCreator } from "zustand";

import { MAX_POST_JOB_MILESTONES } from "@/features/jobs/constants/postJob";
import {
  deriveFinalMilestoneAmount,
  deriveFinalMilestoneDuration,
} from "@/features/jobs/helpers/postJobMilestones";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { PostJobStoreState } from "@/store/types/job";
import {
  createDefaultJobDraft,
  createMilestone,
  createMilestoneId,
} from "./postJobDraftDefaults";

const pickDraft = (state: PostJobStoreState) => ({
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

/** Shared zustand body for both the create-job and edit-job draft stores. */
export const createJobDraftStoreBody: StateCreator<PostJobStoreState> = (
  set,
  get,
) => ({
  ...createDefaultJobDraft(),
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
      const files = state.files.filter((_, fileIndex) => fileIndex !== index);
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
      ...createDefaultJobDraft(),
      files: [],
      previews: [],
      savedFileCount: 0,
    }),
});
