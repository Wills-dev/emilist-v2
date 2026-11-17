import { useSyncExternalStore } from "react";
import { useStore } from "@/store/authStore";
import { AUTH_COOKIE_CHANGE_EVENT, readCookie } from "@/lib/helpers/cookie";
const subscribe = (callback: () => void) => {
  window.addEventListener(AUTH_COOKIE_CHANGE_EVENT, callback);
  return () => window.removeEventListener(AUTH_COOKIE_CHANGE_EVENT, callback);
};
const snapshot = (): string | null => readCookie("emilistToken") || null;
const serverSnapshot = () => null;
export const useMessagingAuth = () => {
  const userId = useStore((state) => state.currentUser?._id) ?? "";
  const token = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return { userId, token, enabled: Boolean(userId && token) };
};
