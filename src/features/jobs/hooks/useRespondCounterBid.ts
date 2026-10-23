"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { respondCounterBid } from "../api/respondCounterBid";
import { jobKeys } from "../queries/jobKeys";

export const useRespondCounterBid = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: respondCounterBid,
    onSuccess: async (_, { action }) => {
      await client.invalidateQueries({ queryKey: jobKeys.all });
      toast.success(action === "accept" ? "Bid accepted. The job is now active." : "Bid rejected. The preceding offer has been restored.");
      onSuccess();
    },
    onError: (error) => {
      promiseErrorFunction(error);
      void client.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
};
