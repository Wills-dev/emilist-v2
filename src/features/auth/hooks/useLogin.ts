import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../api";
import { routes } from "@/lib/helpers/routes";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useAuthState } from "./useAuthState";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const { inputType, userInfo, handleChange, toggleInputType, resetForm } =
    useAuthState();

  const { pendingFlow, redirectPath, isModalFlow } = useStore(
    useShallow((state) => ({
      pendingFlow: state.pendingFlow,
      redirectPath: state.redirectPath,
      isModalFlow: state.isModalFlow,
    })),
  );

  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const setOtpEmail = useStore((state) => state.setOtpEmail);
  const openModal = useStore((state) => state.openModal);
  const closeAllModals = useStore((state) => state.closeAllModals);

  const queryRedirect = searchParams.get("redirect");

  const destination = redirectPath || queryRedirect || routes.dashboard;

  const { mutate, isPending: isLogging } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successful!");

      if (!data.user.emailVerified) {
        setOtpEmail(data.user.email);
        if (isModalFlow) {
          openModal("verify-otp");
        } else {
          router.push(
            `${routes.verifyEmail}?redirect=${encodeURIComponent(destination)}`,
          );
        }
        return;
      }

      setCurrentUser(data.user);

      queryClient.setQueryData(["currentUser"], data.user);

      resetForm();

      const bypassProfileCompletionFlows = ["register-expert"];

      //modal flow
      if (isModalFlow) {
        if (!data.user.profileComplete && pendingFlow !== "register-expert") {
          openModal("complete-profile");
          return;
        }
        // Profile complete or expert flow — close modals, form auto-submits via useEffect
        closeAllModals();
        return;
      }

      //page flow

      if (!data.user.profileComplete) {
        if (
          pendingFlow &&
          bypassProfileCompletionFlows.includes(pendingFlow) &&
          redirectPath
        ) {
          router.push(redirectPath);
          return;
        }

        router.push(
          `${routes.completeProfile}?redirect=${encodeURIComponent(destination)}`,
        );
        return;
      }
      router.push(destination);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error logging in", error);
      if (
        error?.response?.data?.message &&
        error?.response?.data?.message === "Kindly verify your email!"
      ) {
        setOtpEmail(userInfo.email);
        if (isModalFlow) {
          openModal("verify-otp");
        } else {
          router.push(
            `${routes.verifyEmail}?redirect=${encodeURIComponent(destination)}`,
          );
        }
        return;
      }
      promiseErrorFunction(error);
    },
  });

  const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userInfo;
    if (email.trim() === "") {
      toast.error("Please enter your email address");
      return;
    } else if (password.trim() === "") {
      toast.error("Please enter your password");
      return;
    }
    mutate({ email, password });
  };

  return {
    userInfo,
    handleChange,
    inputType,
    toggleInputType,
    handleLogin,
    isLogging,
  };
};
