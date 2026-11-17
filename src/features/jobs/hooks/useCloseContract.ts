"use client";

import { useRef, useState, type ChangeEvent, type MouseEvent, type SubmitEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { closeContract } from "../api/closeContract";
import { jobKeys } from "../queries/jobKeys";
import { normalizeJobStatus } from "../helpers/manageJobs";
import type { JobDetailsViewModel } from "../types/jobDetails";

export const useCloseContract = (job: JobDetailsViewModel) => {
  const userId = useStore((state) => state.currentUser?._id);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [rateCommunication, setRateCommunication] = useState(0);
  const [note, setNote] = useState("");
  const [isRecommendVendor, setRecommendVendor] = useState(true);
  const submitting = useRef(false);
  const eligible = Boolean(userId && userId === job.ownerId && job.canCloseContract === true && normalizeJobStatus(job.status) !== "completed");
  const mutation = useMutation({
    mutationFn: closeContract,
    onSuccess: async () => {
      setOpen(false);
      toast.success("Contract closed and review submitted.");
      await queryClient.invalidateQueries({ queryKey: jobKeys.all });
    },
    onError: promiseErrorFunction,
    onSettled: () => { submitting.current = false; },
  });
  const busy = mutation.isPending;
  const handleOpen = () => {
    if (!eligible || busy) return;
    setRating(0);
    setRateCommunication(0);
    setNote("");
    setRecommendVendor(true);
    setOpen(true);
  };
  const handleCancel = () => { if (!busy && !submitting.current) setOpen(false); };
  const handleOpenChange = (nextOpen: boolean) => { if (!nextOpen) handleCancel(); };
  const handleRating = (event: MouseEvent<HTMLButtonElement>) => {
    const value = Number(event.currentTarget.value);
    if (event.currentTarget.name === "rating") setRating(value);
    else setRateCommunication(value);
  };
  const handleNote = (event: ChangeEvent<HTMLTextAreaElement>) => setNote(event.target.value);
  const handleRecommendation = (event: ChangeEvent<HTMLInputElement>) => setRecommendVendor(event.target.checked);
  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (busy || submitting.current) return;
    if (!eligible) { toast.info("This contract is no longer available to close. Refresh the job details."); return; }
    if (![rating, rateCommunication].every((value) => Number.isInteger(value) && value >= 1 && value <= 5) || !note.trim()) {
      toast.error("Add both ratings and a review before closing the contract.");
      return;
    }
    submitting.current = true;
    mutation.mutate({ jobId: job.id, payload: { rating, note: note.trim(), rateCommunication, isRecommendVendor } });
  };
  return { open, eligible, busy, rating, rateCommunication, note, isRecommendVendor, handleOpen, handleCancel, handleOpenChange, handleRating, handleNote, handleRecommendation, handleSubmit };
};
