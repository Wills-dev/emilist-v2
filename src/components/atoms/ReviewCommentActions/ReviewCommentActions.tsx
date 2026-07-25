"use client";

import HandIcon from "../icons/HandIcon";
import { useRateReviewHelpfulness } from "@/features/materials/hooks/useRateReviewHelpfulness";

const ReviewCommentActions = ({
  variant,
  id,
}: {
  variant: "small" | "large";
  id: string;
}) => {
  const variants = {
    small: "text-xs",
    large: "sm:text-sm text-xs",
  };

  const styles = variants[variant];
  const { rateHelpfulness, isPending, pendingValue } =
    useRateReviewHelpfulness(id);

  return (
    <div className="flex items-center gap-6">
      <button
        type="button"
        onClick={() => rateHelpfulness(true)}
        disabled={isPending}
        aria-busy={isPending && pendingValue === true}
        className="flex items-center gap-2 text-[#25C269] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-xl">
          <HandIcon />
        </span>
        <span className={`${styles}`}>Helpful</span>
      </button>
      <button
        type="button"
        onClick={() => rateHelpfulness(false)}
        disabled={isPending}
        aria-busy={isPending && pendingValue === false}
        className="flex items-center gap-2 text-[#FF5D7A] disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="text-xl rotate-180">
          <HandIcon />
        </span>
        <span className={`${styles}`}>Not Helpful</span>
      </button>
    </div>
  );
};

export default ReviewCommentActions;
