"use client";

import { useStore } from "@/store/authStore";
import { useNotificationPreferencesStore } from "@/store/notificationPreferencesStore";

export const useNotificationSettings = () => {
  const userId = useStore((state) => state.currentUser?._id) ?? "";
  const allowNewMessages = useNotificationPreferencesStore((state) => state.byUser[userId]?.allowNewMessages ?? true);
  const allowEmail = useNotificationPreferencesStore((state) => state.byUser[userId]?.allowEmail ?? true);
  const setPreference = useNotificationPreferencesStore((state) => state.setPreference);
  const setAllowNewMessages = (value: boolean) => setPreference(userId, "allowNewMessages", value);
  const setAllowEmail = (value: boolean) => setPreference(userId, "allowEmail", value);
  return { allowNewMessages, allowEmail, setAllowNewMessages, setAllowEmail };
};
