"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { updateMilestoneStatus } from "../api/updateMilestoneStatus";
import { jobKeys } from "../queries/jobKeys";

export const useUpdateMilestoneStatus = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateMilestoneStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: jobKeys.all });
      toast.success("Milestone completed successfully.");
      onSuccess();
    },
    onError: promiseErrorFunction,
  });
};
