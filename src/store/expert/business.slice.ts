import { StateCreator } from "zustand";
import { BusinessSlice } from "../types/expert";

export const createBusinessSlice: StateCreator<BusinessSlice> = (set) => ({
  business: {
    services: [],
    coverageArea: [],
    businessName: "",
    yearFounded: "",
    numberOfEmployee: "",
    businessAddress: "",
    businessState: "",
    businessCountry: "",
    startingPrice: "",
    currency: "",
    rateUnit: "",
    noticePeriod: "",
    businessDescription: "",
  },

  setBusiness: (value) =>
    set({
      business: value,
    }),

  businessImages: [],

  businessPreviews: [],

  useProfileAddress: false,
  setUseProfileAddress: (value) =>
    set({
      useProfileAddress: value,
    }),

  updateBusiness: (key, value) =>
    set((state) => ({
      business: { ...state.business, [key]: value },
    })),

  toggleService: (value) =>
    set((state) => {
      const exists = state.business.services.includes(value);

      return {
        business: {
          ...state.business,
          services: exists
            ? state.business.services.filter((v) => v !== value)
            : [...state.business.services, value],
        },
      };
    }),

  toggleCoverage: (value) =>
    set((state) => {
      const exists = state.business.coverageArea.includes(value);

      return {
        business: {
          ...state.business,
          coverageArea: exists
            ? state.business.coverageArea.filter((v) => v !== value)
            : [...state.business.coverageArea, value],
        },
      };
    }),

  addBusinessImages: (files, preview) =>
    set((state) => ({
      businessImages: [...state.businessImages, ...files],
      businessPreviews: [...state.businessPreviews, ...preview],
    })),

  removeBusinessImage: (index) =>
    set((state) => ({
      businessImages: state.businessImages.filter((_, i) => i !== index),
      businessPreviews: state.businessPreviews.filter((_, i) => i !== index),
    })),
});
