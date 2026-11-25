import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { useSaveAuthSession } from "./useSaveAuthSession";
import { safeAuthDestination } from "@/lib/helpers/authRedirect";
import { useAuthState } from "./useAuthState";
import { register } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";

export const useSignUp = () => {
  const router = useRouter();
  const saveSession = useSaveAuthSession();
  const searchParams = useSearchParams();

  const { redirectPath, isModalFlow, termsAccepted } = useStore(
    useShallow((state) => ({
      redirectPath: state.redirectPath,
      isModalFlow: state.isModalFlow,
      termsAccepted: state.termsAccepted,
    })),
  );

  const setOtpEmail = useStore((state) => state.setOtpEmail);
  const openModal = useStore((state) => state.openModal);
  const setPendingFlow = useStore((state) => state.setPendingFlow);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);
  const setTermsAccepted = useStore((state) => state.setTermsAccepted);

  const { inputType, userInfo, handleChange, toggleInputType } = useAuthState();

  const { mutate, isPending: isRegistering } = useMutation({
    mutationFn: register,
    onSuccess: async (data) => {
      let user;
      try { user = await saveSession(data); }
      catch (error) { toast.error((error as Error).message); return; }
      toast.success("Sign up successful!", {
        description:
          "An OTP was sent to your email, enter the OTP to verify your email address.",
      });
      setOtpEmail(user.email);
      setOtpCountDown(300);

      const queryRedirect = searchParams.get("redirect");

      if (queryRedirect && !redirectPath) {
        setPendingFlow(null, {}, safeAuthDestination(queryRedirect), isModalFlow);
      }

      if (isModalFlow) {
        openModal("verify-otp");
        return;
      }

      const destination = safeAuthDestination(redirectPath || queryRedirect);
      router.push(
        `${routes.verifyEmail}?redirect=${encodeURIComponent(destination)}`,
      );
    },
    onError: (error: ApiErrorResponse) => {
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
    } else if (!termsAccepted) {
      toast.error("Almost There!", {
        description:
          "Please review and accept the Terms & Conditions and Privacy Policy before creating your account.",
      });
      return;
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
    termsAccepted,
    setTermsAccepted,
  };
};
