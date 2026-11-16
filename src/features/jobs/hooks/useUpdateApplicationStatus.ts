"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { updateApplicationStatus } from "../api/updateApplicationStatus";
import { jobKeys } from "../queries/jobKeys";
import type { UpdateApplicationStatus } from "../types/updateApplicationStatus";

const messages: Record<UpdateApplicationStatus, string> = {
  applied: "Application submitted successfully.",
  accepted: "Application accepted.",
  rejected: "Application rejected.",
  pause: "Job paused.",
  unpause: "Job resumed.",
};
export const useUpdateApplicationStatus = (onSuccess?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateApplicationStatus,
    retry: false,
    onSuccess: async (_response, { status }) => {
      await queryClient.invalidateQueries({ queryKey: jobKeys.all });
      toast.success(messages[status]);
      onSuccess?.();
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to update application status.");
    },
  });
};
