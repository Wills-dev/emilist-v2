"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import ResetPasswordForm from "../../forms/ResetPasswordForm/ResetPasswordForm";

const ResetPasswordModal = () => {
  const { activeModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "reset-password"}
      onClose={closeAllModals}
      title="Create Password"
      className=" max-w-157! w-full sm:p-8 p-6"
      description="Your identity has been verified. Enter a new password below to regain access to your account."
    >
      <GrayedLogo />
      <ResetPasswordForm />
    </ModalWrapper>
  );
};

export default ResetPasswordModal;
