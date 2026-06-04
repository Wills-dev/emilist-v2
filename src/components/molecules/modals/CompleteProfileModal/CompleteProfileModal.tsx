"use client";

import { useStore } from "@/store/authStore";
import { useShallow } from "zustand/react/shallow";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import CompleteProfileForm from "../../forms/CompleteProfileForm/CompleteProfileForm";

const CompleteProfileModal = () => {
  const { activeModal } = useStore(
    useShallow((state) => ({
      activeModal: state.activeModal,
    })),
  );

  const closeAllModals = useStore((state) => state.closeAllModals);

  return (
    <ModalWrapper
      open={activeModal === "complete-profile"}
      onClose={closeAllModals}
      title="Update profile"
      className=" max-w-165! w-full sm:p-8 p-6"
      description="Setup your profile on Emilist"
    >
      <CompleteProfileForm />
    </ModalWrapper>
  );
};

export default CompleteProfileModal;
