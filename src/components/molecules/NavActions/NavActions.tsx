"use client";

import ArrowUp from "@/components/atoms/icons/ArrowUp";
import Button from "@/components/atoms/Button/Button";

import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

const NavActions = ({ className = "items-center" }: { className?: string }) => {
  const { openModal, setIsModalFlow } = useStore(
    useShallow((state) => ({
      openModal: state.openModal,
      setIsModalFlow: state.setIsModalFlow,
    })),
  );

  const currentUser = useStore((state) => state.currentUser);

  const openLoginModal = () => {
    setIsModalFlow(true);
    openModal("login");
  };

  const openSignUpModal = () => {
    setIsModalFlow(true);
    openModal("register");
  };

  return (
    <div className={`flex  gap-4 ${className}`}>
      {currentUser ? (
        <Button href={routes?.dashboard} variant="primary">
          Dashboard
        </Button>
      ) : (
        <>
          <Button onClick={openLoginModal} variant="secondary">
            Login
          </Button>
          <Button onClick={openSignUpModal} variant="primary">
            <span className="block">Sign Up</span>
            <ArrowUp />
          </Button>
        </>
      )}
    </div>
  );
};

export default NavActions;
