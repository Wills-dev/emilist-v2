"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { createPromotion } from "../api/createPromotion";

export const useCreatePromotion = (onClose: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createPromotion,
    retry: false,
    onSuccess: () => {
      toast.success("Promotion campaign created successfully.");
      onClose();
      for (const key of ["reports", "wallets", "wallet-transactions", "wallet-overview", "dashboard-overview", "jobs", "businesses", "materials", "material info"]) void client.invalidateQueries({ queryKey: [key] });
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to create campaign.");
    },
  });
};
