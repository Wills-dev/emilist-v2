import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { verifyEmail } from "../api";
import { routes } from "@/lib/helpers/routes";
import { useShallow } from "zustand/react/shallow";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useVerifyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { pendingFlow, redirectPath, isModalFlow, otpEmail, otpCountDown } =
    useStore(
      useShallow((state) => ({
        pendingFlow: state.pendingFlow,
        redirectPath: state.redirectPath,
        isModalFlow: state.isModalFlow,
        otpEmail: state.otpEmail,
        otpCountDown: state.otpCountDown,
      })),
    );

  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const openModal = useStore((state) => state.openModal);
  const closeAllModals = useStore((state) => state.closeAllModals);
  const clearOtpEmail = useStore((state) => state.clearOtpEmail);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);

  useEffect(() => {
    if (!otpCountDown) return;

    const interval = setInterval(() => {
      if (useStore.getState().otpCountDown! > 0) {
        setOtpCountDown(useStore.getState().otpCountDown! - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpCountDown, setOtpCountDown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (updated.every(Boolean)) handleVerify(updated.join(""));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      toast.success("Email successfully verified!", {
        description:
          "Please complete your profile to enjoy full access to Emilist services.",
      });

      setCurrentUser(data.user);

      queryClient.setQueryData(["currentUser"], data.user);
      clearOtpEmail();
      setOtp(["", "", "", "", "", ""]);

      //modal flow
      if (isModalFlow) {
        if (pendingFlow === "register-expert") {
          closeAllModals();
          return;
        }

        openModal("complete-profile");
        return;
      }

      //page flow
      if (pendingFlow === "register-expert" && redirectPath) {
        router.push(redirectPath);
        return;
      }

      if (redirectPath) {
        router.push(
          `${routes.completeProfile}?redirect=${encodeURIComponent(redirectPath)}`,
        );
        return;
      }

      router.push(`${routes?.completeProfile}?redirect=${routes?.dashboard}`);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error verifying email", error);
      promiseErrorFunction(error);
    },
  });

  const handleVerify = (code?: string) => {
    const finalOtp = code || otp.join("");
    if (finalOtp.length !== 6 || !otpEmail) return;
    mutate({ otp: finalOtp, email: otpEmail });
  };

  return {
    handleVerify,
    isPending,
    otp,
    setOtp,
    handleChange,
    handleKeyDown,
    otpCountDown,
    inputRefs,
  };
};
