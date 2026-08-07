"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

import { useResetPassword } from "@/features/auth/hooks/useResetPassword";
import { useStore } from "@/store/authStore";

const ResetPasswordForm = () => {
  const {
    toggleInputType,
    inputType,
    handleChange,
    isPending,
    password,
    handleSubmit,
    isMatch,
    isConfirmPasswordFilled,
    isNewPasswordFilled,
  } = useResetPassword();

  const startPasswordReset = useStore((state) => state.startPasswordReset);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const openForgotPassword = () => {
    setIsModalFlow(true);
    startPasswordReset();
  };

  const showGuide = isNewPasswordFilled && isConfirmPasswordFilled;

  return (
    <form onSubmit={handleSubmit} className="sm:space-y-10 space-y-8 font-exo">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="new" title="Enter New Password" />
          <Input
            id="new"
            name="new"
            value={password.new}
            onChange={handleChange}
            placeholder="**************"
            type={inputType}
            showPassword={inputType}
            onTogglePassword={toggleInputType}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="confirm" title="Confirm New Password" />
          <Input
            id="confirm"
            name="confirm"
            value={password.confirm}
            onChange={handleChange}
            placeholder="**************"
            type={inputType}
            showPassword={inputType}
            onTogglePassword={toggleInputType}
          />
          {showGuide && (
            <p
              className={`text-xs ${isMatch ? "text-green-500" : "text-red-500"}`}
            >
              {isMatch ? "Password matched." : "Confirm password didn't match."}
            </p>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <Button
          type="submit"
          className="w-full h-11"
          variant="primary"
          loading={isPending}
          disabled={!isMatch || isPending}
        >
          Proceed
        </Button>
        <Button
          className="w-full h-11"
          variant="default"
          onClick={openForgotPassword}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Go Back
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
