"use client";

import ArrowUp from "@/components/atoms/icons/ArrowUp";
import Button from "@/components/atoms/Button/Button";
import { Skeleton } from "@/components/ui/skeleton";

import { routes } from "@/lib/helpers/routes";
import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

const NavActions = ({ className = "items-center" }: { className?: string }) => {
  const { openModal, setIsModalFlow, currentUser, isAuthInitialized } = useStore(
    useShallow((state) => ({
      openModal: state.openModal,
      currentUser: state.currentUser,
      setIsModalFlow: state.setIsModalFlow,
      isAuthInitialized: state.isAuthInitialized,
    })),
  );

  const openLoginModal = () => {
    setIsModalFlow(true);
    openModal("login");
  };

  const openSignUpModal = () => {
    setIsModalFlow(true);
    openModal("register");
  };

  return (
    <div className={`flex gap-4 lg:min-w-54 lg:justify-end ${className}`}>
      {!isAuthInitialized ? (
        <Skeleton
          aria-label="Loading account actions"
          className="h-11 w-28 bg-gray-200"
        />
      ) : currentUser ? (
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
