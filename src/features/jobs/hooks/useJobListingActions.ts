"use client";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { updateJobListing } from "../api/updateJobListing";
import { jobListingActions, jobListingLabels, type JobListingTarget, type JobListingAction } from "../helpers/jobListingActions";

export const useJobListingActions = (job?: JobListingTarget, onDeleted?: () => void) => {
  const userId = useStore((state) => state.currentUser?._id);
  const client = useQueryClient();
  const [action, setAction] = useState<JobListingAction | null>(null);
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const available = jobListingActions(job, userId);
  const close = () => { if (!pending.current) setAction(null); };
  const confirm = async () => {
    if (!job || !action || pending.current) return;
    if (!jobListingActions(job, userId).includes(action)) { setAction(null); toast.info("This action is no longer available. Review the latest job details."); return; }
    pending.current = true; setBusy(true);
    try {
      await updateJobListing({ jobId: job.id, action });
      setAction(null);
      toast.success(action === "delete" ? "Job deleted successfully." : action === "delist" ? "Job hidden from public search." : "Job listed in public search.");
      if (action === "delete") {
        client.removeQueries({ queryKey: ["jobs", "detail", job.id] });
        onDeleted?.();
      }
      void client.invalidateQueries({ queryKey: ["jobs"] });
      void client.invalidateQueries({ queryKey: ["dashboard-overview"] });
    } catch (error) {
      if (isAxiosError(error)) promiseErrorFunction(error);
      else toast.error(error instanceof Error ? error.message : "Unable to update job listing.");
    } finally { pending.current = false; setBusy(false); }
  };
  return { action, busy, close, confirm, menuActions: available.map((item) => ({ label: jobListingLabels[item], disabled: busy, onSelect: () => { if (!pending.current) setAction(item); } })) };
};
