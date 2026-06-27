import { useRef, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { verifyForgotPasswordOtp } from "../api";
import { useStore } from "@/store/authStore";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useVerifyPasswordResetOtp = () => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpEmail = useStore((state) => state.otpEmail);
  const openModal = useStore((state) => state.openModal);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (updated.every(Boolean)) handleSubmit(updated.join(""));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: verifyForgotPasswordOtp,
    onSuccess: () => {
      toast.success(`OTP Verified`, {
        description: `Verification completed successfully. Proceed to reset your password.`,
      });
      openModal("reset-password");
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error verifying otp", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (code?: string) => {
    const finalOtp = code || otp.join("");

    if (!otpEmail) {
      toast.error("Please provide email address associated with your account");
      return;
    } else if (finalOtp.length !== 6) {
      toast.error("Please provide OTP sent to your email");
      return;
    }
    mutate({ email: otpEmail, otp: finalOtp });
  };

  return {
    isSubmitting: isPending,
    handleSubmit,
    otp,
    setOtp,
    handleChange,
    handleKeyDown,
    inputRefs,
  };
};
