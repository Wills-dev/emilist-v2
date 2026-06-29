import { useState } from "react";

import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { getGoogleAuthUrl } from "../api";

export const useGoogleAuth = () => {
  const [showTerms, setShowTerms] = useState(false);

  const { termsAccepted, isModalFlow, pendingFlow, redirectPath } = useStore(
    useShallow((state) => ({
      termsAccepted: state.termsAccepted,
      isModalFlow: state.isModalFlow,
      pendingFlow: state.pendingFlow,
      redirectPath: state.redirectPath,
    })),
  );

  const setTermsAccepted = useStore((state) => state.setTermsAccepted);

  const { mutate: fetchAndRedirect, isPending } = useMutation({
    mutationFn: getGoogleAuthUrl,
    onSuccess: (data) => {
      // All state (pendingFlow, pendingFormData, redirectPath, isModalFlow)
      // is already in localStorage via Zustand persist.
      // Nothing extra needed — just redirect.
      //   window.location.href = data?.url;
    },
  });

  const initiateGoogleAuth = () => {
    if (!termsAccepted) {
      setShowTerms(true);
      return;
    }
    fetchAndRedirect();
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTerms(false);
    fetchAndRedirect();
  };

  const handleDeclineTerms = () => {
    setShowTerms(false);
  };

  return {
    initiateGoogleAuth,
    handleAcceptTerms,
    handleDeclineTerms,
    showTerms,
    termsAccepted,
    isPending,
  };
};
