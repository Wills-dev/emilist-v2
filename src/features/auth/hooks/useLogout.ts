import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { logout } from "../api";
import { clearAllCookies } from "@/lib/helpers/cookie";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useCartStore } from "@/store/cart/cartStore";

export const useLogout = () => {
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

  const clearSession = () => {
    clearAllCookies();
    clearCurrentUser();
    clearPendingFlow();
    clearOtpEmail();
    closeAllModals();
    clearCart();
    queryClient.clear();
    setIsAuthInitialized(true);
    router.replace(routes.home);
    router.refresh();
  };

  const mutation = useMutation({
    mutationFn: logout,
    onSuccess: () => toast.success("You have been logged out."),
    onError: () =>
      toast.error("The server could not end the session, but you were logged out locally."),
    onSettled: clearSession,
  });

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isPending,
  };
};

