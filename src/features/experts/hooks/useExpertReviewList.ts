import { useMemo, useState } from "react";
import type { Review } from "@/lib/types/review";

export const useExpertReviewList = (reviews: Review[]) => {
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [, setSearch] = useState("");
  const visibleReviews = useMemo(() => {
    const query = submittedQuery.trim().toLowerCase();
    if (!query) return reviews;
    return reviews.filter((review) =>
      `${review.user?.firstName ?? ""} ${review.user?.lastName ?? ""} ${review.comment ?? ""}`.toLowerCase().includes(query),
    );
  }, [reviews, submittedQuery]);
  return { submittedQuery, setSubmittedQuery, setSearch, visibleReviews };
};
