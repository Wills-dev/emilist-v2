import { StateCreator } from "zustand";

export type TabSlice = {
  tab: "profile" | "business-profile" | "experiences";
  setTab: (tab: TabSlice["tab"]) => void;
};

export const createTabSlice: StateCreator<TabSlice> = (set) => ({
  tab: "profile",
  setTab: (tab) => set({ tab }),
});
