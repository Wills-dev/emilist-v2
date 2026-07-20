import { useState } from "react";

export const useQuantity = ({
  initialQuantity = 1,
  min = 0,
  max = Number.POSITIVE_INFINITY,
}: {
  initialQuantity?: number;
  min?: number;
  max?: number;
} = {}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    setQuantity((current) => Math.min(current + 1, max));
  };

  const decrement = () => {
    setQuantity((current) => Math.max(current - 1, min));
  };

  return { quantity, increment, decrement };
};
