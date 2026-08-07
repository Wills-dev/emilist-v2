import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { forgotPassword } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";

export const useRequestPasswordReset = () => {
  const [hasRequestedOtp, setHasRequestedOtp] = useState(false);
  const otpEmail = useStore((state) => state.otpEmail);

  const setOtpEmail = useStore((state) => state.setOtpEmail);
  const otpCountDown = useStore((state) => state.otpCountDown);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);

  useEffect(() => {
    if (!hasRequestedOtp || !otpCountDown) return;

    const interval = setInterval(() => {
      if (useStore.getState().otpCountDown! > 0) {
        setOtpCountDown(useStore.getState().otpCountDown! - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasRequestedOtp, otpCountDown, setOtpCountDown]);

  const { mutate, isPending } = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data, variable) => {
      toast.success(`OTP sent successfully!`, {
        description: `otp has been sent to ${variable?.email}`,
      });
      setHasRequestedOtp(true);
      setOtpCountDown(300);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error sending otp for email verification", error);
      promiseErrorFunction(error);
    },
  });

  const handleSendOtp = () => {
    if (!otpEmail) {
      toast.error("Please provide email address associated with your account");
      return;
    }
    mutate({ email: otpEmail });
  };

  return {
    handleSendOtp,
    isPending,
    otpEmail,
    setOtpEmail,
    otpCountDown,
    hasRequestedOtp,
  };
};
