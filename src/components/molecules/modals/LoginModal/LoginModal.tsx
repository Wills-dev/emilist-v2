"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import LoginForm from "../../forms/LoginForm/LoginForm";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";

const LoginModal = () => {
  const { activeModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "login"}
      onClose={closeAllModals}
      title="Login to Emilist"
      className=" max-w-157! w-full sm:p-8 p-6"
      description="Log in to manage jobs, products, and expert services all in one place."
    >
      <GrayedLogo />
      <LoginForm />
    </ModalWrapper>
  );
};

export default LoginModal;
