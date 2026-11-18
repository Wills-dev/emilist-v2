"use client";
import { useStore } from "@/store/authStore";
import { useComparisonStore } from "@/store/comparisonStore";
import type { ComparisonType } from "../types";

const empty: Array<{ id: string; name: string }> = [];
export const useSelectedComparisons = (type: ComparisonType) => {
  const userId = useStore((state) => state.currentUser?._id);
  const selections = useComparisonStore((state) => state.selections);
  return { userId, items: userId ? selections[userId]?.[type] ?? empty : empty };
};
