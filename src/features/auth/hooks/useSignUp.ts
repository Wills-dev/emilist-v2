import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
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

  const { setOtpEmail, redirectPath, setPendingFlow } = useStore((state) => ({
    setOtpEmail: state.setOtpEmail,
    redirectPath: state.redirectPath,
    setPendingFlow: state.setPendingFlow,
    pendingFlow: state.pendingFlow,
    pendingFormData: state.pendingFormData,
  }));

  const {
    isOpen,
    setIsOpen,
    inputType,
    userInfo,
    handleChange,
    toggleInputType,
    onCancel,
  } = useAuthState();

  const { mutate, isPending: isRegistering } = useMutation({
    mutationFn: register,
    onSuccess: (data, variables) => {
      toast.success("Sign up successful!", {
        description:
          "An OTP was sent to your email, enter the OTP to verify your email address.",
      });
      setOtpEmail(variables.email);

      const queryRedirect = searchParams.get("redirect");

      if (queryRedirect && !redirectPath) {
        setPendingFlow(null, {}, queryRedirect);
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
    }
    mutate({ email, password });
  };

  return {
    handleChange,
    isOpen,
    handleSignup,
    setIsOpen,
    inputType,
    toggleInputType,
    onCancel,
    isRegistering,
  };
};
