"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import ForgotPasswordForm from "../../forms/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPasswordModal = () => {
  const { activeModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "forgot-password"}
      onClose={closeAllModals}
      title="Forgot Password"
      className=" max-w-157! w-full sm:p-8 p-6"
      description="Enter the email address associated with your account, and we'll send you an otp to reset your password"
    >
      <GrayedLogo />
      <ForgotPasswordForm />
    </ModalWrapper>
  );
};

export default ForgotPasswordModal;
