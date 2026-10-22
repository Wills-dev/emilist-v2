"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { applyJob } from "../api/applyJob";
import { jobKeys } from "../queries/jobKeys";

export const useApplyJob = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: applyJob,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: jobKeys.all });
      toast.success("Application submitted successfully.");
      onSuccess();
    },
    onError: promiseErrorFunction,
  });
};
