import { StateCreator } from "zustand";
import { InsuranceSlice } from "../types/expert";

export const createInsuranceSlice: StateCreator<InsuranceSlice> = (set) => ({
  insurances: [],
  insuranceView: [],

  addInsurance: () =>
    set((state) => ({
      insurances: [
        ...state.insurances,
        { issuingOrganisation: "", coverage: "", description: "" },
      ],
    })),

  updateInsurance: (i, key, value) =>
    set((state) => {
      const arr = [...state.insurances];
      arr[i] = { ...arr[i], [key]: value };
      return { insurances: arr };
    }),

  removeInsurance: (i) =>
    set((state) => ({
      insurances: state.insurances.filter((_, idx) => idx !== i),
    })),
  toggleInsuranceView: (i) =>
    set((state) => {
      const view = [...state.insuranceView];
      view[i] = !view[i];
      return { insuranceView: view };
    }),

  resetInsurance: () =>
    set({
      insurances: [],
      insuranceView: [],
    }),
});
