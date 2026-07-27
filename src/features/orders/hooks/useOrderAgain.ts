"use client";

import { useState } from "react";

export interface OrderAgainProduct {
  id: string;
  name: string;
  image?: string;
  brand: string;
  category: string;
  price: number;
  currency: string;
  unit: string;
}

export const useOrderAgain = ({
  product,
  onOrderAgain,
}: {
  product: OrderAgainProduct;
  onOrderAgain?: (payload: {
    productId: string;
    quantity: number;
  }) => Promise<void>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleModalChange = (open: boolean) => {
    if (!open) setQuantity(1);
    setIsOpen(open);
  };

  const handlePurchase = async () => {
    if (!onOrderAgain) return;
    setIsSubmitting(true);
    try {
      await onOrderAgain({ productId: product.id, quantity });
      handleModalChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    quantity,
    isSubmitting,
    openModal: () => setIsOpen(true),
    handleModalChange,
    increment: () => setQuantity((current) => current + 1),
    decrement: () => setQuantity((current) => Math.max(1, current - 1)),
    handlePurchase,
  };
};
