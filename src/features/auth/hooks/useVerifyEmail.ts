import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { verifyEmail } from "../api";
import { safeAuthDestination } from "@/lib/helpers/authRedirect";
import { useSaveAuthSession } from "./useSaveAuthSession";
import { useLoginContinuation } from "./useLoginContinuation";
import { useShallow } from "zustand/react/shallow";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";

export const useVerifyEmail = () => {
  const saveSession = useSaveAuthSession();
  const continueLogin = useLoginContinuation();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const { redirectPath, otpEmail, otpCountDown } =
    useStore(
      useShallow((state) => ({
        redirectPath: state.redirectPath,
        otpEmail: state.otpEmail,
        otpCountDown: state.otpCountDown,
      })),
    );

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

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const digits = event.clipboardData.getData("text").replace(/\s/g, "");
    if (!/^\d+$/.test(digits)) return;

    const start = digits.length >= otp.length ? 0 : index;
    const pastedDigits = digits.slice(0, otp.length - start);
    const updated = [...otp];
    for (let offset = 0; offset < pastedDigits.length; offset++) {
      updated[start + offset] = pastedDigits[offset];
    }
    setOtp(updated);
    inputRefs.current[Math.min(start + pastedDigits.length, otp.length - 1)]?.focus();
    if (updated.every(Boolean)) handleVerify(updated.join(""));
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: async (data) => {
      let user;
      try { user = await saveSession(data, true); }
      catch (error) { toast.error((error as Error).message); return; }
      toast.success("Email successfully verified!");
      clearOtpEmail();
      setOtpCountDown(0);
      setOtp(["", "", "", "", "", ""]);
      continueLogin(user, safeAuthDestination(redirectPath));
    },
    onError: (error: ApiErrorResponse) => {
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
    handlePaste,
    otpCountDown,
    inputRefs,
  };
};
