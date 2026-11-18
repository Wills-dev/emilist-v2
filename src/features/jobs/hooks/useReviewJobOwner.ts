"use client";

import { useRef, useState, type ChangeEvent, type MouseEvent, type SubmitEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useStore } from "@/store/authStore";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { reviewJobOwner } from "../api/reviewJobOwner";
import { normalizeJobStatus } from "../helpers/manageJobs";
import { jobKeys } from "../queries/jobKeys";
import type { JobDetailsViewModel } from "../types/jobDetails";

export const useReviewJobOwner = (job: JobDetailsViewModel, onClose: () => void) => {
  const userId = useStore((state) => state.currentUser?._id);
  const client = useQueryClient();
  const [rating, setRating] = useState(0);
  const [communication, setCommunication] = useState(0);
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(true);
  const pending = useRef(false);
  const eligible = Boolean(userId && userId !== job.ownerId && job.hasReviewedJobOwner !== true && normalizeJobStatus(job.status) === "completed");
  const mutation = useMutation({
    mutationFn: reviewJobOwner,
    onSuccess: async () => {
      toast.success("Job owner review submitted.");
      onClose();
      await client.invalidateQueries({ queryKey: jobKeys.all });
    },
    onError: promiseErrorFunction,
    onSettled: () => { pending.current = false; },
  });
  const cancel = () => { if (!pending.current) onClose(); };
  const changeOpen = (open: boolean) => { if (!open) cancel(); };
  const changeRating = (event: MouseEvent<HTMLButtonElement>) => {
    const value = Number(event.currentTarget.value);
    if (event.currentTarget.name === "rating") setRating(value);
    else setCommunication(value);
  };
  const changeComment = (event: ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);
  const changeRecommendation = (event: ChangeEvent<HTMLInputElement>) => setRecommend(event.target.checked);
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current || !eligible) return;
    if (![rating, communication].every((value) => Number.isInteger(value) && value >= 1 && value <= 5) || !comment.trim()) {
      toast.error("Add both ratings and a review before submitting.");
      return;
    }
    pending.current = true;
    mutation.mutate({ jobId: job.id, payload: { rating, comment: comment.trim(), rateCommunication: communication, isRecommendOwner: recommend } });
  };
  return { rating, communication, comment, recommend, eligible, busy: mutation.isPending, cancel, changeOpen, changeRating, changeComment, changeRecommendation, submit };
};
