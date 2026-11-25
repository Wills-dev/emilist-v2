"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useGetCurrentUser } from "@/features/auth/hooks/useGetCurrentUser";
import { useLoginContinuation } from "@/features/auth/hooks/useLoginContinuation";
import GoogleAuthStatus from "@/features/auth/components/GoogleAuthStatus/GoogleAuthStatus";
import { clearGoogleAuthContext, readGoogleAuthContext, SESSION_AUTH_COOKIE, usesCookieSession } from "@/lib/helpers/authSession";
import { clearClear } from "@/lib/helpers/cookie";
import { loginRedirectUrl } from "@/lib/helpers/authRedirect";
import { useStore } from "@/store/authStore";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const query = useGetCurrentUser();
  const continueLogin = useLoginContinuation();
  const router = useRouter();
  const pathname = usePathname();
  const user = useStore((state) => state.currentUser);
  const isSigningOut = useStore((state) => state.isSigningOut);
  const initialized = useStore((state) => state.isAuthInitialized);
  const handled = useRef(false);
  const protectedPage = pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  useEffect(() => {
    if (isSigningOut || query.authMode !== "google" || !query.isSuccess || handled.current) return;
    const context = readGoogleAuthContext();
    if (!context) return;
    handled.current = true;
    clearGoogleAuthContext();
    toast.success("Google sign-in successful!");
    continueLogin(query.data, context.destination, true);
  }, [query.authMode, query.isSuccess, query.data, continueLogin, isSigningOut]);

  useEffect(() => {
    if (isSigningOut || !protectedPage || !query.ready || !initialized || user || query.authMode === "google") return;
    if (query.authMode && !query.isError) return;
    if (query.isError && usesCookieSession(query.authMode)) return;
    router.replace(loginRedirectUrl(`${window.location.pathname}${window.location.search}${window.location.hash}`));
  }, [protectedPage, query.ready, initialized, user, query.authMode, query.isError, router, isSigningOut]);

  const backToLogin = () => {
    const destination = readGoogleAuthContext()?.destination || `${window.location.pathname}${window.location.search}`;
    clearGoogleAuthContext();
    clearClear(SESSION_AUTH_COOKIE);
    clearClear("emilistToken");
    router.replace(loginRedirectUrl(destination));
  };
  if (isSigningOut) return <GoogleAuthStatus message="Signing out…" />;
  if (query.authMode === "google" || (protectedPage && query.isError && usesCookieSession(query.authMode))) {
    return <GoogleAuthStatus message="Signing you in…" error={query.isError} onRetry={() => void query.refetch()} onCancel={backToLogin} />;
  }
  if (protectedPage && (!query.ready || !initialized || !user)) return <GoogleAuthStatus />;
  return children;
}
