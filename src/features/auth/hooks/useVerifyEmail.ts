import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useStore } from "@/store/authStore";
import { verifyEmail } from "../api";
import { routes } from "@/lib/helpers/routes";

export const useVerifyEmail = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown === 0) return;
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const { setCurrentUser, clearOtpEmail, otpEmail, pendingFlow, redirectPath } =
    useStore((state) => ({
      setCurrentUser: state.setCurrentUser,
      clearOtpEmail: state.clearOtpEmail,
      otpEmail: state.otpEmail,
      pendingFlow: state.pendingFlow,
      redirectPath: state.redirectPath,
    }));

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

      setOtp("");

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
  });

  const handleVerify = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otpEmail) mutate({ otp, email: otpEmail });
  };

  return {
    handleVerify,
    isPending,
    otp,
    setOtp,
    countdown,
  };
};
