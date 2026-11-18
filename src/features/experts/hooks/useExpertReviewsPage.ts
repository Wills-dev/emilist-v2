import { useState } from "react";
import { toast } from "sonner";
import type { SubmitEvent } from "react";
import type { Review } from "@/lib/types/review";
import { useExpertReviewList } from "./useExpertReviewList";

export const useExpertReviewsPage = (expertId: string, initialReviews: Review[], live = false) => {
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(initialReviews);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const list = useExpertReviewList(reviews);
  const resetForm = () => { setRating(0); setComment(""); };
  const handleAddReview = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (live) { toast.info("Submitting expert reviews is not available yet."); return; }
    setReviews((current) => [{
      _id: `expert-${expertId}-${Date.now()}`, rating, comment: comment.trim(),
      createdAt: new Date().toISOString(), user: { _id: "current-user", firstName: "Toks", lastName: "Williams" },
    }, ...current]);
    resetForm(); setIsModalOpen(false);
  };
  const onSearch = (query: string) => { list.setSubmittedQuery(query); setPage(1); };
  const currentPage = Math.min(page, Math.max(1, Math.ceil(list.visibleReviews.length / 5)));
  const onNext = () => setPage(currentPage + 1);
  const onPrev = () => setPage(Math.max(1, currentPage - 1));
  const onAddComment = () => setIsModalOpen(true);
  return { ...list, currentPage, isModalOpen, setIsModalOpen, rating, comment, setRating, setComment,
    resetForm, handleAddReview, onSearch, onNext, onPrev, onAddComment };
};
