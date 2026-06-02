import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "../api";
import { routes } from "@/lib/helpers/routes";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";
import { useAuthState } from "./useAuthState";

export const useLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const {
    isOpen,
    setIsOpen,
    inputType,
    userInfo,
    handleChange,
    toggleInputType,
    onCancel,
    resetForm,
  } = useAuthState();

  const { setCurrentUser, pendingFlow, redirectPath } = useStore((state) => ({
    setCurrentUser: state.setCurrentUser,
    pendingFlow: state.pendingFlow,
    redirectPath: state.redirectPath,
  }));

  const { mutate, isPending: isLogging } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success("Login successful!");

      setCurrentUser(data.user);

      queryClient.setQueryData(["currentUser"], data.user);

      resetForm();

      const queryRedirect = searchParams.get("redirect");

      const destination = redirectPath || queryRedirect;

      if (!data.user.profileComplete) {
        if (pendingFlow === "register-expert" && redirectPath) {
          router.push(redirectPath);
          return;
        } else if (destination) {
          router.push(
            `${routes.completeProfile}?redirect=${encodeURIComponent(destination)}`,
          );
          return;
        } else {
          router.push(
            `${routes.completeProfile}?redirect=${encodeURIComponent(routes?.dashboard)}`,
          );
        }
      }
      if (destination) {
        router.push(destination);
        return;
      }
      router.push(routes.dashboard);
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error logging in", error);
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
    onCancel,
    isOpen,
    setIsOpen,
    isLogging,
  };
};
