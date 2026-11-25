"use client";
import { useEffect, useSyncExternalStore } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { AUTH_COOKIE_CHANGE_EVENT, clearClear, createCookie } from "@/lib/helpers/cookie";
import { getBrowserAuthMode, SESSION_AUTH_COOKIE } from "@/lib/helpers/authSession";
import { getCurrentUser } from "../api";
import { getUserFromResponse } from "../helpers/getUserFromResponse";

const subscribe = (onChange: () => void) => {
  window.addEventListener(AUTH_COOKIE_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(AUTH_COOKIE_CHANGE_EVENT, onChange);
};
const clientReady = () => true;
const serverReady = () => false;
const serverMode = () => "" as const;

export const useGetCurrentUser = () => {
  const client = useQueryClient();
  const isSigningOut = useStore((state) => state.isSigningOut);
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const clearCurrentUser = useStore((state) => state.clearCurrentUser);
  const setIsAuthInitialized = useStore((state) => state.setIsAuthInitialized);
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
  const authMode = useSyncExternalStore(subscribe, getBrowserAuthMode, serverMode);
  const query = useQuery({
    queryKey: ["currentUser", authMode],
    queryFn: async ({ signal }) => {
      const user = getUserFromResponse(await getCurrentUser(signal));
      if (!user) throw new Error("Unable to verify your login session.");
      return user;
    },
    enabled: ready && Boolean(authMode) && !isSigningOut,
    staleTime: authMode === "google" ? 0 : 5 * 60 * 1000,
    retry: false,
  });

  useEffect(() => {
    if (!ready || isSigningOut) return;
    if (!authMode) { clearCurrentUser(); setIsAuthInitialized(true); return; }
    if (query.isSuccess) {
      if (authMode === "google") {
        // Cache before writing the routing hint so the session observer can reuse
        // the verified user. The backend session cookie remains the credential.
        client.setQueryData(["currentUser", "session"], query.data);
        createCookie(SESSION_AUTH_COOKIE, "session");
        clearClear("emilistToken");
      }
      setCurrentUser(query.data);
    }
    if (query.isError) clearCurrentUser();
    if (query.isSuccess || query.isError) setIsAuthInitialized(true);
  }, [ready, isSigningOut, authMode, query.isSuccess, query.isError, query.data, client, setCurrentUser, clearCurrentUser, setIsAuthInitialized]);

  return { ...query, authMode, ready };
};
