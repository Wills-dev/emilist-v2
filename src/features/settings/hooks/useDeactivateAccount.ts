"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { clearAllCookies } from "@/lib/helpers/cookie";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";
import { deactivateUser } from "../api";

export const useDeactivateAccount = () => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearCurrentUser = useStore((state) => state.clearCurrentUser);
  const clearPendingFlow = useStore((state) => state.clearPendingFlow);
  const clearOtpEmail = useStore((state) => state.clearOtpEmail);
  const closeAllModals = useStore((state) => state.closeAllModals);
  const setIsAuthInitialized = useStore(
    (state) => state.setIsAuthInitialized,
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const mutation = useMutation({
    mutationFn: deactivateUser,
    onSuccess: () => {
      setIsConfirmationOpen(false);
      clearAllCookies();
      clearCurrentUser();
      clearPendingFlow();
      clearOtpEmail();
      closeAllModals();
      clearCart();
      queryClient.clear();
      setIsAuthInitialized(true);
      toast.success("Your account has been deactivated.");
      router.replace(routes.home);
      router.refresh();
    },
    onError: promiseErrorFunction,
  });

  return {
    isConfirmationOpen,
    setIsConfirmationOpen,
    openConfirmation: () => setIsConfirmationOpen(true),
    confirmDeactivation: () => mutation.mutate(),
    isDeactivating: mutation.isPending,
  };
};
