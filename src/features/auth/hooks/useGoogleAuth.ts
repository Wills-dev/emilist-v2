"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { getGoogleAuthUrl } from "../api";
import { GOOGLE_AUTH_CONTEXT_KEY, googleAuthDestination } from "../helpers/googleAuth";

export const useGoogleAuth = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const pending = useRef(false);
  const termsAccepted = useStore((state) => state.termsAccepted);
  const setTermsAccepted = useStore((state) => state.setTermsAccepted);

  useEffect(() => {
    const reset = () => { pending.current = false; setIsPending(false); };
    window.addEventListener("pageshow", reset);
    return () => window.removeEventListener("pageshow", reset);
  }, []);

  const redirectToGoogle = () => {
    if (pending.current) return;
    pending.current = true;
    setIsPending(true);
    try {
      const url = getGoogleAuthUrl();
      const { redirectPath, isModalFlow } = useStore.getState();
      const destination = googleAuthDestination(
        new URLSearchParams(window.location.search).get("redirect"),
        redirectPath,
        `${window.location.pathname}${window.location.search}`,
        isModalFlow,
      );
      // Pending forms remain in the existing persisted auth store. Keep the
      // page destination separately for the return from Google.
      sessionStorage.setItem(GOOGLE_AUTH_CONTEXT_KEY, JSON.stringify({ destination, startedAt: Date.now() }));
      window.location.assign(url);
    } catch (error) {
      pending.current = false;
      setIsPending(false);
      toast.error(error instanceof Error ? error.message : "Unable to start Google sign-in.");
    }
  };

  const initiateGoogleAuth = () => {
    if (!termsAccepted) { setShowTerms(true); return; }
    redirectToGoogle();
  };
  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    redirectToGoogle();
  };
  return { initiateGoogleAuth, handleAcceptTerms, handleDeclineTerms: () => setShowTerms(false), showTerms, termsAccepted, isPending };
};
