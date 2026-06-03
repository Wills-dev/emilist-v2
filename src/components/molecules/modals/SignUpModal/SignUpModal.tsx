"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import SignUpForm from "../../forms/SignUpForm/SignUpForm";

const SignUpModal = () => {
  const { activeModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "register"}
      onClose={closeAllModals}
      title="Create a free account"
      className="max-w-157! w-full sm:p-8 p-6"
      description="Join Emilist and unlock opportunities for work, business, and collaboration."
    >
      <GrayedLogo />
      <SignUpForm />
    </ModalWrapper>
  );
};

export default SignUpModal;
