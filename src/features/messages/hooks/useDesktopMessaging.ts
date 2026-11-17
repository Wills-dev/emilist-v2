import { useSyncExternalStore } from "react";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia("(min-width: 768px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
const snapshot = () => window.matchMedia("(min-width: 768px)").matches;
export const useDesktopMessaging = () => useSyncExternalStore(subscribe, snapshot, () => false);
