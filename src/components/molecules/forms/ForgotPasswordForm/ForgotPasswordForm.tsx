"use client";

import Button from "@/components/atoms/Button/Button";
import Label from "@/components/atoms/Label/Label";

import { useRequestPasswordReset } from "@/features/auth/hooks/useRequestPasswordReset";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useVerifyPasswordResetOtp } from "@/features/auth/hooks/useVerifyPasswordResetOtp";
import { useStore } from "@/store/authStore";

const ForgotPasswordForm = () => {
  const { handleSendOtp: resendingOtp, isResending } = useResendOtp();

  const { handleSendOtp, isPending, otpEmail, setOtpEmail, otpCountDown } =
    useRequestPasswordReset();

  const {
    isSubmitting,
    handleSubmit,
    otp,
    handleChange,
    handleKeyDown,
    inputRefs,
  } = useVerifyPasswordResetOtp();

  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const minutes = Math.floor((otpCountDown ?? 0) / 60);
  const seconds = (otpCountDown ?? 0) % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const finalOtp = otp.join("");
  const disallow = !otpEmail || otpEmail.trim() === "" || isPending;

  const openLogin = () => {
    setIsModalFlow(true);
    openModal("login");
  };

  return (
    <form className="sm:space-y-10 space-y-8 font-exo">
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" title="Enter Email" />
          <div className="relative flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-11 py-1 px-3">
            <input
              style={{ fontSize: "16px" }}
              name="email"
              id="email"
              type="email"
              value={otpEmail || ""}
              onChange={(e) => setOtpEmail(e.target.value)}
              placeholder="paulshotolu@gmail.com"
              className={`w-full flex-1 bg-inherit h-full placeholder-gray-400 outline-none`}
            />
            <button
              disabled={disallow}
              className={`text-[#6667FF] text-sm font-semibold ${disallow ? "opacity-55 cursor-not-allowed" : "cursor-pointer"}`}
              type="button"
              onClick={handleSendOtp}
            >
              {isPending ? "Verifying" : "Verify"}
            </button>
          </div>
        </div>
        <div className="">
          <Label htmlFor="otp" title="Enter OTP" />
          <div className="relative flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] focus-within:border transition-all focus-within:border-[#25C269]  duration-300 h-11 py-1 px-3">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="outline-none max-w-10 w-10"
                placeholder="*"
              />
            ))}
          </div>
          <div className="flex items-center gap-1">
            <p className="text-[#333E49] text-sm">Didn’t receive it? </p>{" "}
            {otpCountDown > 0 ? (
              <>
                <span className="text-[#333E49] text-sm">Resend code in</span>
                <span className="text-sm text-[#6667FF] font-semibold">
                  {formattedTime}mins
                </span>
              </>
            ) : (
              <button
                onClick={resendingOtp}
                disabled={isResending}
                type="button"
                className="text-sm text-[#6667FF] font-semibold cursor-pointer"
              >
                {isResending ? " Sending..." : " Resend code"}
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <Button
          type="button"
          className="w-full h-11"
          variant="primary"
          loading={isSubmitting}
          onClick={handleSubmit}
          disabled={finalOtp.length !== 6}
        >
          Proceed
        </Button>
        <Button className="w-full h-11" variant="default" onClick={openLogin}>
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

export default ForgotPasswordForm;
