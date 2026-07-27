import { useState } from "react";

export type OrderTrackingStatus =
  | "confirmed"
  | "out_for_delivery"
  | "delivered";

export const useTrackOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  return {
    isOpen,
    openModal: () => setIsOpen(true),
    handleModalChange: setIsOpen,
  };
};
