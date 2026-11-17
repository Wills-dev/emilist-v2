import { useStore } from "@/store/authStore";
import { clearClear } from "./cookie";
import { loginRedirectUrl } from "./authRedirect";

let redirecting = false;

export const handleExpiredSession = () => {
  if (typeof window === "undefined" || redirecting) return;
  const { pathname, search, hash } = window.location;
  if (pathname !== "/dashboard" && !pathname.startsWith("/dashboard/")) return;
  redirecting = true;
  clearClear("emilistToken");
  const auth = useStore.getState();
  auth.clearCurrentUser();
  auth.clearPendingFlow();
  window.location.replace(loginRedirectUrl(`${pathname}${search}${hash}`));
};
