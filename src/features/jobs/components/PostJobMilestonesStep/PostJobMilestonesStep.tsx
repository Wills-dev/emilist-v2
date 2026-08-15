"use client";

import { Plus } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import AllocationSummary from "../AllocationSummary/AllocationSummary";
import MilestoneFormItem from "../MilestoneFormItem/MilestoneFormItem";
import { MAX_POST_JOB_MILESTONES } from "../../constants/postJob";
import {
  summarizeMilestoneAmounts,
  summarizeMilestoneDurations,
} from "../../helpers/postJobMilestones";
import { PostJobMilestonesValidation } from "../../helpers/validatePostJob";
import { usePostJobStore } from "@/store/job/postJobStore";

const formatAmount = (currency: string, amount: number) =>
  `${currency} ${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;

const PostJobMilestonesStep = ({
  validation,
}: {
  validation?: PostJobMilestonesValidation;
}) => {
  const {
    addMilestone,
    budget,
    jobDuration,
    jobUrgency,
    milestones,
  } = usePostJobStore(
    useShallow((state) => ({
      addMilestone: state.addMilestone,
      budget: state.budget,
      jobDuration: state.jobDuration,
      jobUrgency: state.jobUrgency,
      milestones: state.milestones,
    })),
  );
  const amountSummary = summarizeMilestoneAmounts(
    milestones,
    budget.amount,
  );
  const durationSummary =
    jobUrgency === "right_now"
      ? summarizeMilestoneDurations(milestones, jobDuration)
      : null;
  const liveAllocationError =
    amountSummary.excess > 0
      ? `Milestones exceed the budget by ${formatAmount(budget.currency, amountSummary.excess)}.`
      : amountSummary.finalAmount === null &&
          amountSummary.invalidIndexes.length === 0
        ? "No budget remains for the final milestone. Reduce an earlier milestone."
      : undefined;
  const liveDurationError =
    durationSummary && durationSummary.excessDays > 0
      ? `Milestones exceed the project duration by ${durationSummary.excessDays} day${durationSummary.excessDays === 1 ? "" : "s"}.`
      : durationSummary &&
          durationSummary.finalDuration === null &&
          durationSummary.invalidIndexes.length === 0
        ? "No time remains for the final milestone. Reduce an earlier milestone duration."
      : undefined;
  const budgetGuide =
    amountSummary.invalidIndexes.length > 0
      ? "Complete each earlier payment to calculate the final balance."
      : `${formatAmount(budget.currency, amountSummary.finalAmount ?? 0)} for the final milestone`;
  const durationGuide = durationSummary
    ? durationSummary.invalidIndexes.length > 0
      ? "Complete each earlier duration to calculate the final balance."
      : `${durationSummary.remainingDays} day${durationSummary.remainingDays === 1 ? "" : "s"} for the final milestone`
    : undefined;

  return (
    <section className="space-y-8" aria-labelledby="milestones-title">
      <div className="space-y-2 border-b border-[#E5E5E5] pb-6">
        <h2
          id="milestones-title"
          tabIndex={-1}
          className="font-exo text-lg font-semibold outline-none"
        >
          Milestones
        </h2>
        <p className="text-sm leading-6 text-[#737774]">
          Set up to 5 checkpoints for review during your project
        </p>
      </div>

      <aside
        className="sticky top-2 z-30 -mx-2 space-y-2 rounded-xl border border-[#DCEFE4] bg-white/95 p-3 shadow-[0_8px_24px_rgba(20,80,45,0.10)] backdrop-blur-md sm:mx-0"
        aria-labelledby="milestone-guide-title"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-0.5">
            <h3
              id="milestone-guide-title"
              className="font-exo text-sm font-semibold text-[#303632]"
            >
              Milestone guide
            </h3>
            <p className="text-xs leading-5 text-[#737774]">
              Review-and-payment checkpoints. Add up to 5; the final one
              balances automatically.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-[#E9F8EF] px-2.5 py-1 text-xs font-semibold text-[#18A154]">
            {milestones.length}/{MAX_POST_JOB_MILESTONES}
          </span>
        </div>

        <div
          className={`grid gap-2 ${durationSummary ? "grid-cols-2" : "grid-cols-1"}`}
        >
          <AllocationSummary
            compact
            title="Budget"
            error={liveAllocationError ?? validation?.allocationError}
            parts={[budgetGuide]}
          />

          {durationSummary && durationGuide && (
            <AllocationSummary
              compact
              title="Time"
              error={liveDurationError ?? validation?.durationError}
              parts={[durationGuide]}
            />
          )}
        </div>
      </aside>

      <div className="space-y-6">
        {milestones.map((milestone, index) => {
          const isFinal = index === milestones.length - 1;
          return (
            <MilestoneFormItem
              key={milestone.id}
              milestone={milestone}
              index={index}
              milestoneCount={milestones.length}
              isFinal={isFinal}
              isRightNow={jobUrgency === "right_now"}
              currency={budget.currency}
              derivedAmount={isFinal ? amountSummary.finalAmount : null}
              derivedDuration={
                isFinal ? (durationSummary?.finalDuration ?? null) : null
              }
              errors={validation?.errors[milestone.id]}
            />
          );
        })}
      </div>

      <div className="border-t border-[#E5E5E5] pt-6">
        <button
          type="button"
          onClick={addMilestone}
          disabled={milestones.length >= MAX_POST_JOB_MILESTONES}
          className="inline-flex items-center gap-1 font-exo text-sm text-[#6667FF] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-4" />
          {milestones.length >= MAX_POST_JOB_MILESTONES
            ? "Maximum 5 milestones reached"
            : "Add Milestone"}
        </button>
      </div>
    </section>
  );
};

export default PostJobMilestonesStep;
