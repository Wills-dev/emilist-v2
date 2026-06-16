import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

import { ScheduledSlice } from "../types/enterprise";

export const useScheduledStore = create<ScheduledSlice>()(
  persist(
    (set) => ({
      scheduledForm: {
        email: "",
        firstName: "",
        lastName: "",
        mobile: "",
        countryCode: "",
        title: "",
        services: [],
        country: "",
        locations: [],
        description: "",
        startDate: "",
        endDate: "",
        currency: "",
        amount: "",
        rateUnit: "",
        level: "",
        expertId: "",
      },
      scheduleImages: [],
      schedulePreviews: [],

      updateScheduleForm: (key, value) =>
        set((state) => ({
          scheduledForm: { ...state.scheduledForm, [key]: value },
        })),

      toggleService: (value) =>
        set((state) => {
          const exists = state.scheduledForm.services.includes(value);

          return {
            scheduledForm: {
              ...state.scheduledForm,
              services: exists
                ? state.scheduledForm.services.filter((v) => v !== value)
                : [...state.scheduledForm.services, value],
            },
          };
        }),

      toggleLocation: (value) =>
        set((state) => {
          const exists = state.scheduledForm.locations.includes(value);

          return {
            scheduledForm: {
              ...state.scheduledForm,
              locations: exists
                ? state.scheduledForm.locations.filter((v) => v !== value)
                : [...state.scheduledForm.locations, value],
            },
          };
        }),

      addScheduleImages: (files, preview) =>
        set((state) => ({
          scheduleImages: [...state.scheduleImages, ...files],
          schedulePreviews: [...state.schedulePreviews, ...preview],
        })),

      removeScheduleImage: (index) =>
        set((state) => ({
          scheduleImages: state.scheduleImages.filter((_, i) => i !== index),
          schedulePreviews: state.schedulePreviews.filter(
            (_, i) => i !== index,
          ),
        })),

      resetSchedule: () =>
        set({
          scheduledForm: {
            email: "",
            firstName: "",
            lastName: "",
            mobile: "",
            countryCode: "",
            title: "",
            services: [],
            locations: [],
            country: "",
            description: "",
            startDate: "",
            endDate: "",
            currency: "",
            amount: "",
            rateUnit: "",
            level: "",
            expertId: "",
          },
          scheduleImages: [],
          schedulePreviews: [],
        }),
    }),
    {
      name: "emilist-scheduled-request",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        scheduledForm: state.scheduledForm,
      }),
      onRehydrateStorage: (state) => {
        state.scheduleImages = [];
        state.schedulePreviews = [];
      },
    },
  ),
);
