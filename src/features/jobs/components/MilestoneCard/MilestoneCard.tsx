"use client";

import InfoRow from "@/components/atoms/InfoRow/InfoRow";
import { getCurrencySign } from "@/lib/helpers/currencySign";
import { formatAmount } from "@/lib/helpers/formatNumbers";

import { AnimatePresence, motion } from "framer-motion";

const MilestoneCard = ({
  toggleCollapse,
  milestoneNumber,
  id,
  isExpanded,
  currency,
  duration,
  amount,
  details,
  title,
  status,
  onReview,
  onComplete,
}: {
  toggleCollapse: (id: string) => void;
  milestoneNumber: number;
  id: string;
  isExpanded: boolean;
  amount: number;
  details: string;
  duration: string;
  currency: string;
  title?: string;
  status?: string;
  onReview?: () => void;
  onComplete?: () => void;
}) => {
  const approved = status === "approved" || status === "completed";
  const tone = approved
    ? "text-[#18A154]"
    : status === "overdue"
      ? "text-[#FF5D7A]"
      : status === "paused" ||
          status === "in-review" ||
          status === "active" ||
          status === "in-progress"
        ? "text-[#FF9C2B]"
        : status
          ? "text-[#737774]"
          : "text-[#25C269]";
  return (
    <div
      className={`w-full md:space-y-8 space-y-6 ${milestoneNumber !== 1 && "border-t border-[#ECECEC] pt-6"}`}
    >
      <div className="flex items-center justify-between text-sm">
        <h6 className={`flex items-center gap-2.5 ${tone}`}>
          <span className="block w-1.5 h-1.5 bg-current rounded-full" />
          <span className="font-exo font-semibold uppercase">
            Milestone {milestoneNumber}
          </span>
        </h6>
        <button
          type="button"
          aria-label={`Toggle milestone ${milestoneNumber}`}
          aria-expanded={isExpanded}
          onClick={() => toggleCollapse(id)}
          className={`${isExpanded ? "rotate-180" : ""} transition-all duration-300`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-[1em] h-[1em]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>
      </div>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            initial={status ? false : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-4 px-2"
          >
            {title && (
              <p className="text-sm font-medium text-[#303632]">{title}</p>
            )}
            <div className="pb-4 border-b border-[#ECECEC] space-y-4">
              <div className="bg-[#EDEEF0] py-2 px-4 rounded-[8px] w-full">
                <div className="w-full flex justify-between items-center">
                  <InfoRow title="Duration:" value={duration} showDot />
                  <InfoRow
                    title={approved ? "Paid:" : "Payment:"}
                    value={`${currency && getCurrencySign(currency)}${amount && formatAmount(amount)}`}
                    showDot
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4 bg-white p-6 max-sm:px-4 rounded-[8px] text-[#5E625F]">
              <p className="text-sm font-exo font-semibold">Details</p>
              <p className="text-sm">{details}</p>
            </div>
            {(status === "active" || status === "in-progress") &&
              onComplete && (
                <button
                  type="button"
                  onClick={onComplete}
                  className="w-full rounded-lg border border-[#25C269] py-2 text-xs text-[#18A154] hover:bg-[#F0FDF5]"
                >
                  Complete Milestone
                </button>
              )}
            {status === "in-review" && onReview ? (
              <button
                type="button"
                onClick={onReview}
                className="w-full rounded-lg border border-[#25C269] py-2 text-xs text-[#18A154] hover:bg-[#F0FDF5]"
              >
                Review Milestone
              </button>
            ) : (
              (approved || status === "paused" || status === "overdue") && (
                <p className={`text-xs ${tone}`}>
                  {approved
                    ? "Approved"
                    : status === "paused"
                      ? "Paused"
                      : "Overdue"}
                </p>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MilestoneCard;
