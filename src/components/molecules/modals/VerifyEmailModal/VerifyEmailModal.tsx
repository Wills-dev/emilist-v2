"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import VerifyEmailForm from "../../forms/VerifyEmailForm/VerifyEmailForm";

const VerifyEmailModal = () => {
  const { activeModal, otpEmail } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
      otpEmail: state.otpEmail,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "verify-otp"}
      onClose={closeAllModals}
      titleClassName="text-center"
      descClassName="text-center"
      title="Verify your email"
      className=" max-w-157! w-full sm:p-8 p-6"
      description="We sent an one time password to your email"
    >
      <GrayedLogo />
      {otpEmail && (
        <div className="flex justify-center items-center">
          <p className="bg-[#F4F7F5] text-[#5E625F] text-center rounded-[8px] py-1 px-4 font-exo sm:text-[20px] font-semibold">
            {otpEmail}
          </p>
        </div>
      )}
      <VerifyEmailForm />
    </ModalWrapper>
  );
};

export default VerifyEmailModal;
