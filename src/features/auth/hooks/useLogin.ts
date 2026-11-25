import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";

import { login } from "../api";
import { routes } from "@/lib/helpers/routes";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useAuthState } from "./useAuthState";
import { safeAuthDestination } from "@/lib/helpers/authRedirect";
import { clearClear } from "@/lib/helpers/cookie";
import { clearGoogleAuthContext, SESSION_AUTH_COOKIE } from "@/lib/helpers/authSession";
import { useLoginContinuation } from "./useLoginContinuation";
import { useSaveAuthSession } from "./useSaveAuthSession";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const continueLogin = useLoginContinuation();
  const saveSession = useSaveAuthSession();

  const { inputType, userInfo, handleChange, toggleInputType, resetForm } =
    useAuthState();

  const { redirectPath, isModalFlow } = useStore(
    useShallow((state) => ({
      redirectPath: state.redirectPath,
      isModalFlow: state.isModalFlow,
    })),
  );

  const setOtpEmail = useStore((state) => state.setOtpEmail);
  const setOtpCountDown = useStore((state) => state.setOtpCountDown);
  const openModal = useStore((state) => state.openModal);

  const queryRedirect = searchParams.get("redirect");

  const destination = safeAuthDestination(queryRedirect || redirectPath);

  const { mutate, isPending: isLogging } = useMutation({
    mutationFn: (credentials: Parameters<typeof login>[0]) => {
      clearGoogleAuthContext();
      clearClear(SESSION_AUTH_COOKIE);
      return login(credentials);
    },
    onSuccess: async (data) => {
      let user;
      try { user = await saveSession(data); }
      catch (error) { toast.error((error as Error).message); return; }
      toast.success("Login successful!");
      resetForm();
      continueLogin(user, destination);
    },
    onError: (error: ApiErrorResponse, variables) => {
      const message = error.response?.data?.message;
      if (
        typeof message === "string" &&
        message.startsWith("Kindly verify your email!")
      ) {
        setOtpEmail(variables.email);
        setOtpCountDown(300);
        toast.info(message);
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
