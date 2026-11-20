"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";

import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { bulkCancelOrders } from "../api/orders";
import { orderKeys } from "../queries/orderKeys";

export const useBulkCancelOrders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkCancelOrders,
    onSuccess: async (results) => {
      await queryClient.invalidateQueries({ queryKey: orderKeys.lists() });
      const failures = results.filter((result) => !result.success);
      if (failures.length > 0) {
        toast.error(failures.map((result) => result.message).join(" "));
      } else {
        toast.success("Selected orders canceled.");
      }
    },
    onError: (error) => {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to cancel selected orders.");
    },
  });
};
