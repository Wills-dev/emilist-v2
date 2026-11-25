import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { logout } from "../api";
import { clearGoogleAuthContext } from "@/lib/helpers/authSession";
import { clearAllCookies } from "@/lib/helpers/cookie";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";
import { usePostJobStore } from "@/store/job/postJobStore";

export const useLogout = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const queryClient = useQueryClient();
  const clearCurrentUser = useStore((state) => state.clearCurrentUser);
  const clearPendingFlow = useStore((state) => state.clearPendingFlow);
  const clearOtpEmail = useStore((state) => state.clearOtpEmail);
  const closeAllModals = useStore((state) => state.closeAllModals);
  const setIsAuthInitialized = useStore(
    (state) => state.setIsAuthInitialized,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const clearSession = async () => {
    await queryClient.cancelQueries();
    const jobState = usePostJobStore.getState();
    jobState.previews.forEach((preview) => URL.revokeObjectURL(preview));
    jobState.resetForm();
    setIsConfirmationOpen(false);
    clearGoogleAuthContext();
    clearAllCookies();
    clearCurrentUser();
    clearPendingFlow();
    clearOtpEmail();
    closeAllModals();
    clearCart();
    queryClient.clear();
    setIsAuthInitialized(true);
    window.location.replace(routes.home);
  };

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => toast.success("You have been logged out."),
    onError: () =>
      toast.error("The server could not end the session, but you were logged out locally."),
    onSettled: clearSession,
  });

  return {
    isConfirmationOpen,
    setIsConfirmationOpen,
    openLogoutConfirmation: () => setIsConfirmationOpen(true),
    confirmLogout: () => {
      const auth = useStore.getState();
      if (auth.isSigningOut) return;
      auth.setIsSigningOut(true);
      mutation.mutate();
    },
    isLoggingOut: mutation.isPending,
  };
};
