"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { counterBid } from "../api/counterBid";
import { jobKeys } from "../queries/jobKeys";

export const useCounterBid = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: counterBid,
    onSuccess: () => {
      void client.invalidateQueries({ queryKey: jobKeys.all });
      toast.success("Counteroffer submitted successfully.");
      onSuccess();
    },
    onError: (error) => {
      promiseErrorFunction(error);
      // Refresh negotiation state if the server rejects an outdated turn.
      void client.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
};
