"use client";

import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { toast } from "sonner";
import { formatInputTextNumberWithCommas } from "@/lib/helpers/formatNumbers";
import { buildCompleteMilestonePayload } from "../helpers/buildCompleteMilestonePayload";
import { useUpdateMilestoneStatus } from "./useUpdateMilestoneStatus";

export interface CompleteMilestoneFormParams {
  jobId: string;
  milestoneId: string;
  currency: string;
  onClose: () => void;
}

export const useCompleteMilestoneForm = ({ jobId, milestoneId, onClose }: CompleteMilestoneFormParams) => {
  const [additionalAmount, setAdditionalAmount] = useState("");
  const [note, setNote] = useState("");
  const mutation = useUpdateMilestoneStatus(onClose);
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => setAdditionalAmount(formatInputTextNumberWithCommas(event.target.value));
  const handleNoteChange = (event: ChangeEvent<HTMLTextAreaElement>) => setNote(event.target.value);
  const handleCancel = () => { if (!mutation.isPending) onClose(); };
  const handleOpenChange = (open: boolean) => { if (!open) handleCancel(); };
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (mutation.isPending || !jobId || !milestoneId) return;
    try {
      const payload = buildCompleteMilestonePayload(note, additionalAmount);
      mutation.mutate({ jobId, milestoneId, payload });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Check the milestone completion details.");
    }
  };
  return { additionalAmount, note, isSubmitting: mutation.isPending, handleAmountChange, handleNoteChange, handleCancel, handleOpenChange, handleSubmit };
};
