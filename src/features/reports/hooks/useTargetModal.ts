import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { useReportTargetQuery } from "./useReportQueries";
import { saveReportTarget } from "../api/saveReportTarget";
import { reportKeys } from "../queries/reportKeys";
import type { ReportCurrency, ReportTarget } from "../types/api";
import type { TargetNumbers } from "./useTargetForm";
export const useTargetModal = (target: ReportTarget, year: number, month: number, currency: ReportCurrency, onClose: (open: boolean) => void) => {
  const [duration, setDuration] = useState<"monthly" | "yearly">(target.duration);
  const userId = useStore((state) => state.currentUser?._id);
  const client = useQueryClient();
  const query = useReportTargetQuery(duration === "monthly" ? { year, month, currency } : { year, range: "year", currency }, true);
  const mutation = useMutation({
    mutationFn: (values: TargetNumbers) => saveReportTarget({ ...values, duration, year, ...(duration === "monthly" ? { month } : {}), currency }),
    onSuccess: async () => {
      await client.invalidateQueries({ queryKey: [...reportKeys.all, userId] });
      toast.success("Targets saved."); onClose(false);
    },
    onError: () => toast.error("Unable to save targets. Please try again."), retry: false,
  });
  const save = (values: TargetNumbers) => { if (!mutation.isPending) mutation.mutate(values); };
  const close = (open: boolean) => { if (!mutation.isPending) onClose(open); };
  const changeDuration = (value: "monthly" | "yearly") => { if (!mutation.isPending) setDuration(value); };
  const retry = () => { void query.refetch(); };
  return { duration, changeDuration, query, save, close, retry, saving: mutation.isPending };
};
