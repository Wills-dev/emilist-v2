import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { useAuthState } from "./useAuthState";
import { register } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";

export const useSignUp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { redirectPath, isModalFlow } = useStore(
    useShallow((state) => ({
      pendingFlow: state.pendingFlow,
      redirectPath: state.redirectPath,
      isModalFlow: state.isModalFlow,
    })),
  );

  const setOtpEmail = useStore((state) => state.setOtpEmail);
  const openModal = useStore((state) => state.openModal);
  const setPendingFlow = useStore((state) => state.setPendingFlow);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);

  const {
    inputType,
    userInfo,
    handleChange,
    toggleInputType,
    acceptTerms,
    setAcceptTerms,
    openPolicy,
    setOpenPolicy,
    openTerms,
    setOpenTerms,
  } = useAuthState();

  const { mutate, isPending: isRegistering } = useMutation({
    mutationFn: register,
    onSuccess: (data, variables) => {
      toast.success("Sign up successful!", {
        description:
          "An OTP was sent to your email, enter the OTP to verify your email address.",
      });
      setOtpEmail(variables.email);
      setOtpCountDown(300);

      const queryRedirect = searchParams.get("redirect");

      if (queryRedirect && !redirectPath) {
        setPendingFlow(null, {}, queryRedirect);
      }

      if (isModalFlow) {
        openModal("verify-otp");
        return;
      }

      const destination = redirectPath || queryRedirect || routes.dashboard;
      router.push(
        `${routes.verifyEmail}?redirect=${encodeURIComponent(destination)}`,
      );
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error signing up", error);
      promiseErrorFunction(error);
    },
  });

  const handleSignup = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = userInfo;
    if (email.trim() === "") {
      toast.error("Please enter your email address");
      return;
    } else if (password.trim() === "") {
      toast.error("Please enter your password");
      return;
    } else if (!acceptTerms) {
      toast.error("Almost There!", {
        description:
          "Please review and accept the Terms & Conditions and Privacy Policy before creating your account.",
      });
    }

    mutate({ email, password });
  };

  return {
    userInfo,
    handleChange,
    handleSignup,
    inputType,
    toggleInputType,
    isRegistering,
    acceptTerms,
    setAcceptTerms,
    openPolicy,
    setOpenPolicy,
    openTerms,
    setOpenTerms,
  };
};
