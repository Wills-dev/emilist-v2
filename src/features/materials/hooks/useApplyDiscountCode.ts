import { useCallback, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { applyDiscountCode } from "../api/cart";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { ApiErrorResponse } from "@/lib/types/error";
import { useStore } from "@/store/authStore";

export const useApplyDiscountCode = () => {
  const [code, setCode] = useState("");
  const queryClient = useQueryClient();
  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const { mutate, isPending } = useMutation({
    mutationFn: applyDiscountCode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      setCode("");
      toast.success("Discount code applied.");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleCodeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCode(event.target.value.toUpperCase());
    },
    [],
  );

  const handleApplyDiscount = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!currentUser) {
        setIsModalFlow(true);
        openModal("login");
        return;
      }

      const trimmedCode = code.trim();

      if (!trimmedCode) {
        toast.error("Enter a discount code to continue.");
        return;
      }

      mutate({ code: trimmedCode });
    }, [code, currentUser, mutate, openModal, setIsModalFlow],
  );

  return {
    code,
    handleApplyDiscount,
    handleCodeChange,
    isApplyingDiscount: isPending,
  };
};
