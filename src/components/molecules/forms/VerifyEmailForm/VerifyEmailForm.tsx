"use client";

import Button from "@/components/atoms/Button/Button";
import { useResendOtp } from "@/features/auth/hooks/useResendOtp";
import { useVerifyEmail } from "@/features/auth/hooks/useVerifyEmail";
import { useStore } from "@/store/authStore";

const VerifyEmailForm = () => {
  const {
    handleVerify,
    isPending,
    otp,
    handleChange,
    handleKeyDown,
    otpCountDown,
    inputRefs,
  } = useVerifyEmail();

  const { handleSendOtp, isResending } = useResendOtp();

  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const minutes = Math.floor((otpCountDown ?? 0) / 60);
  const seconds = (otpCountDown ?? 0) % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const finalOtp = otp.join("");

  const openSignUpModal = () => {
    setIsModalFlow(true);
    openModal("register");
  };

  return (
    <form className="pt-10 space-y-10 w-full">
      <div className="flex flex-col items-center justify-center w-full space-y-4">
        <h6 className="text-center font-exo text-lg font-medium">Enter OTP</h6>
        <div className="flex justify-center items-center px-8 py-3.75 bg-[#ECECEC] rounded-[10px] gap-8 max-w-69 w-full overflow-hidden h-17">
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
              className="h-full flex-1 w-full outline-none"
              placeholder="*"
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <p className="text-[#333E49] text-sm">Didn’t receive it? </p>{" "}
          {otpCountDown > 0 ? (
            <span className="text-sm text-[#6667FF] font-semibold">
              {formattedTime}
            </span>
          ) : (
            <button
              onClick={handleSendOtp}
              disabled={isResending}
              type="button"
              className="text-sm text-[#6667FF] font-semibold"
            >
              {isResending ? " Sending..." : " Resend code"}
            </button>
          )}
        </div>
      </div>
      <div className="space-y-4">
        <Button
          type="button"
          className="w-full h-11"
          variant="primary"
          loading={isPending}
          onClick={handleVerify}
          disabled={finalOtp.length !== 6}
        >
          Verify your Email
        </Button>
        <Button
          className="w-full h-11"
          variant="default"
          onClick={openSignUpModal}
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

export default VerifyEmailForm;
