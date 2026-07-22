import { SubmitEvent, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { flagMaterial } from "../api";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";

export const useFlagMaterial = ({
  materialId,
}: {
  materialId: string;
}) => {
  const [reason, setReason] = useState("");
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const resetForm = () => setReason("");

  const openFlagModal = () => setIsFlagModalOpen(true);

  const handleFlagModalChange = (open: boolean) => {
    if (!open) resetForm();
    setIsFlagModalOpen(open);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: () => flagMaterial(materialId, { reason: reason.trim() }),
    onSuccess: () => {
      toast.success("Listing flagged successfully.");
      resetForm();
      setIsFlagModalOpen(false);
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    if (!reason.trim()) return;

    mutate();
  };

  return {
    reason,
    setReason,
    handleSubmit,
    isFlagModalOpen,
    openFlagModal,
    handleFlagModalChange,
    isPending,
  };
};
