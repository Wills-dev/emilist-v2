import { useState } from "react";

export const usePagination = ({
  initialPage = 1,
}: {
  initialPage?: number;
} = {}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const next = () => setCurrentPage((page) => page + 1);
  const prev = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const reset = () => setCurrentPage(initialPage);

  return {
    currentPage,
    setCurrentPage,
    next,
    prev,
    reset,
    hasPreviousPage: currentPage > 1,
  };
};
