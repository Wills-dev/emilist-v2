import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface NotificationPreferences { allowNewMessages: boolean; allowEmail: boolean }
interface NotificationPreferencesState {
  byUser: Record<string, NotificationPreferences>;
  setPreference: (userId: string, key: keyof NotificationPreferences, value: boolean) => void;
}
export const useNotificationPreferencesStore = create<NotificationPreferencesState>()(persist((set) => ({
  byUser: {},
  setPreference: (userId, key, value) => {
    if (!userId) return;
    set((state) => ({ byUser: { ...state.byUser, [userId]: {
      ...(state.byUser[userId] ?? { allowNewMessages: true, allowEmail: true }), [key]: value,
    } } }));
  },
}), { name: "emilist-notification-preferences", storage: createJSONStorage(() => localStorage) }));

export const messageNotificationsEnabled = (userId: string) =>
  useNotificationPreferencesStore.getState().byUser[userId]?.allowNewMessages !== false;
