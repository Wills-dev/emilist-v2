import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ComparisonItem, ComparisonType } from "@/features/comparison/types";

export const useComparisonStore = create<{
  selections: Record<string, Partial<Record<ComparisonType, ComparisonItem[]>>>;
  add: (userId: string, type: ComparisonType, item: ComparisonItem) => void;
}>()(persist((set) => ({
  selections: {},
  add: (userId, type, item) => set((state) => {
    const user = state.selections[userId] ?? {};
    const items = user[type] ?? [];
    return items.some((entry) => entry.id === item.id) ? state : { selections: { ...state.selections, [userId]: { ...user, [type]: [...items, item] } } };
  }),
}), { name: "emilist-comparisons" }));
