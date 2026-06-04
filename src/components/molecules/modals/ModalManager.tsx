"use client";

import { useStore } from "@/store/authStore";

import LoginModal from "./LoginModal/LoginModal";
import SignUpModal from "./SignUpModal/SignUpModal";
import VerifyEmailModal from "./VerifyEmailModal/VerifyEmailModal";
import CompleteProfileModal from "./CompleteProfileModal/CompleteProfileModal";

export const ModalManager = () => {
  const activeModal = useStore((state) => state.activeModal);

  if (!activeModal) return null;

  return (
    <>
      {activeModal === "login" && <LoginModal />}
      {activeModal === "register" && <SignUpModal />}
      {activeModal === "verify-otp" && <VerifyEmailModal />}
      {activeModal === "complete-profile" && <CompleteProfileModal />}
    </>
  );
};
