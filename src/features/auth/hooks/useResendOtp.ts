import { useStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";

import { toast } from "sonner";
import { resendOtp } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useResendOtp = () => {
  const otpEmail = useStore((state) => state.otpEmail);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);

  const { mutate, isPending } = useMutation({
    mutationFn: resendOtp,
    onSuccess: () => {
      toast.success("OTP resent successful.");
      setOtpCountDown(300);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error resending otp", error);
      promiseErrorFunction(error);
    },
  });

  const handleSendOtp = () => {
    if (!otpEmail) {
      toast.error("No email to resend OTP to.");
      return;
    }
    mutate({ email: otpEmail });
  };

  return {
    handleSendOtp,
    isResending: isPending,
  };
};
