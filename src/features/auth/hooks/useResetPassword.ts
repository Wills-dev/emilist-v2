import { ChangeEvent, SubmitEvent, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";

import { toast } from "sonner";
import { resetPassword } from "../api";
import { useStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/helpers/routes";

export const useResetPassword = () => {
  const router = useRouter();

  const otpEmail = useStore((state) => state.otpEmail);
  const openModal = useStore((state) => state.openModal);
  const isModalFlow = useStore((state) => state.isModalFlow);
  const clearOtpEmail = useStore((state) => state.clearOtpEmail);

  const [inputType, setInputType] = useState<"text" | "password">("password");
  const [password, setPassword] = useState({
    new: "",
    confirm: "",
  });

  const isNewPasswordFilled = password.new.trim() !== "";
  const isConfirmPasswordFilled = password.confirm.trim() !== "";

  const isMatch =
    isNewPasswordFilled &&
    isConfirmPasswordFilled &&
    password.new === password.confirm;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const toggleInputType = () => {
    setInputType((prev) => (prev === "password" ? "text" : "password"));
  };

  const resetForm = () => {
    setPassword({
      new: "",
      confirm: "",
    });

    setInputType("password");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successful", {
        description:
          "Your password has been updated successfully. You can now sign in using your new password.",
      });
      resetForm();
      clearOtpEmail();
      if (isModalFlow) {
        openModal("login");
      } else {
        router.push(routes?.login);
      }
    },
    onError: (error: ApiErrorResponse) => {
      console.log("error resetting password", error);
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.new.trim() === "") {
      toast.error("Please enter new password.");
      return;
    } else if (password.new !== password.confirm) {
      toast.error("Confirm password doesn't match new password");
      return;
    }
    if (!otpEmail) {
      toast.error("Please provide your email");
      return;
    }

    mutate({ email: otpEmail, newPassword: password.new });
  };

  return {
    toggleInputType,
    inputType,
    handleChange,
    isPending,
    password,
    handleSubmit,
    isMatch,
    isConfirmPasswordFilled,
    isNewPasswordFilled,
  };
};
