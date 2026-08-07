"use client";

import AuthPrompt from "@/components/atoms/AuthPrompt/AuthPrompt";
import Button from "@/components/atoms/Button/Button";
import GoogleAuth from "@/components/atoms/GoogleAuth/GoogleAuth";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

import { useLogin } from "@/features/auth/hooks/useLogin";
import { areAllFieldsFilled } from "@/lib/helpers/areAllFieldsFilled";
import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

const LoginForm = ({ variant = "modal" }: { variant?: "modal" | "page" }) => {
  const {
    userInfo,
    handleChange,
    inputType,
    toggleInputType,
    handleLogin,
    isLogging,
  } = useLogin();

  const isFormFilled = areAllFieldsFilled(userInfo);

  const { openModal, setIsModalFlow, startPasswordReset } = useStore(
    useShallow((state) => ({
      openModal: state.openModal,
      setIsModalFlow: state.setIsModalFlow,
      startPasswordReset: state.startPasswordReset,
    })),
  );

  const openForgotPasswordModal = () => {
    setIsModalFlow(true);
    startPasswordReset();
  };

  const openSignUpModal = () => {
    setIsModalFlow(true);
    openModal("register");
  };

  return (
    <form className="sm:space-y-10 space-y-8 font-exo" onSubmit={handleLogin}>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" title="Enter Email" />
          <Input
            id="email"
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="paulshotolu@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" title="Enter Password" />
          <Input
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="**************"
            type={inputType}
            showPassword={inputType}
            onTogglePassword={toggleInputType}
          />
          <div className="flex justify-end w-full">
            <button
              type="button"
              onClick={openForgotPasswordModal}
              className="text-[#303632] font-semibold max-sm:text-sm hover:text-[#25C269] transition-all duration-300 cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        {variant === "page" ? (
          <>
            <div className="h-px w-full bg-[#D9D9D9]" />
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="order-2 sm:order-1">
                <GoogleAuth actionText="Sign In" />
              </div>
              <Button
                type="submit"
                className="order-1 h-11 w-full sm:order-2"
                variant="primary"
                loading={isLogging}
                disabled={!isFormFilled}
              >
                Sign In
              </Button>
            </div>
          </>
        ) : (
          <>
            <Button
              type="submit"
              className="h-11 w-full"
              variant="primary"
              loading={isLogging}
              disabled={!isFormFilled}
            >
              Sign In
            </Button>
            <div className="h-px w-full bg-[#D9D9D9]" />
            <GoogleAuth actionText="Sign In" />
          </>
        )}
        <AuthPrompt
          onClick={openSignUpModal}
          text="Don’t have an EmiList account?"
          actionText="Sign Up"
        />
      </div>
    </form>
  );
};

export default LoginForm;
