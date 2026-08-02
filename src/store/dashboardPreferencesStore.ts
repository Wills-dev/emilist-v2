import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const DEFAULT_QUICK_ACTIONS = [
  "post-job",
  "hire-expert",
  "offer-service",
  "sell-materials",
  "listed-items",
  "orders",
];

interface DashboardPreferencesState {
  quickActionsByUser: Record<string, string[]>;
  setQuickActionIds: (userId: string, ids: string[]) => void;
}

export const useDashboardPreferencesStore =
  create<DashboardPreferencesState>()(
    persist(
      (set) => ({
        quickActionsByUser: {},
        setQuickActionIds: (userId, ids) =>
          set((state) => ({
            quickActionsByUser: {
              ...state.quickActionsByUser,
              [userId]: ids,
            },
          })),
      }),
      {
        name: "emilist-dashboard-preferences",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
