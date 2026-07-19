import { SubmitEvent, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addMaterialReview } from "../api";
import { AddMaterialReviewPayload } from "../types";
import { ApiErrorResponse } from "@/lib/types/error";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { useStore } from "@/store/authStore";

export const useAddMaterialReview = ({
  productId,
  onSuccess,
}: {
  productId: string;
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const currentUser = useStore((state) => state.currentUser);
  const openModal = useStore((state) => state.openModal);
  const setIsModalFlow = useStore((state) => state.setIsModalFlow);

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: AddMaterialReviewPayload) =>
      addMaterialReview(payload),
    onSuccess: (data, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["materias"],
      });
      queryClient.invalidateQueries({
        queryKey: ["material reviews", payload.productId],
      });
      queryClient.invalidateQueries({
        queryKey: ["material info", payload.productId],
      });
      toast.success("Your review has been added.");
      resetForm();
      onSuccess?.();
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      setIsModalFlow(true);
      openModal("login");
      return;
    }

    if (!rating || !comment.trim()) return;

    mutate({ productId, rating, comment: comment.trim() });
  };

  return {
    rating,
    comment,
    setRating,
    setComment,
    handleSubmit,
    resetForm,
    isPending,
  };
};
