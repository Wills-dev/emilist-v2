"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { respondToBid } from "../api/respondToBid";
import { jobKeys } from "../queries/jobKeys";

export const useRespondCounterBid = (onSuccess: () => void) => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: respondToBid,
    retry: false,
    onSuccess: async (_, { action, hasCounterOffer }) => {
      await client.invalidateQueries({ queryKey: jobKeys.all });
      toast.success(action === "accept" ? "Bid accepted. The job is now active." : hasCounterOffer ? "Bid rejected. The preceding offer has been restored." : "Application rejected.");
      onSuccess();
    },
    onError: (error) => {
      promiseErrorFunction(error);
      void client.invalidateQueries({ queryKey: jobKeys.all });
    },
  });
};
