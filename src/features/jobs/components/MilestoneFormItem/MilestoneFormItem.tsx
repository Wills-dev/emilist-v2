"use client";

import { ChevronDown, ChevronUp, X } from "lucide-react";

import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import Textarea from "@/components/atoms/TextArea/Textarea";
import FormField from "@/components/molecules/FormField/FormField";
import { currencies } from "@/lib/constants/currencies";
import {
  formatInputTextNumber,
  formatInputTextNumberWithCommas,
} from "@/lib/helpers/formatNumbers";
import { usePostJobStore } from "@/store/job/postJobStore";
import { POST_JOB_DURATION_OPTIONS } from "../../constants/postJob";
import { PostJobMilestoneFieldErrors } from "../../helpers/validatePostJob";
import {
  JobDurationUnit,
  PostJobMilestoneDraft,
} from "../../types/postJob";

const MilestoneFormItem = ({
  currency,
  derivedAmount,
  derivedDuration,
  errors,
  index,
  isFinal,
  isRightNow,
  milestone,
  milestoneCount,
}: {
  currency: string;
  derivedAmount: number | null;
  derivedDuration: { number: number; period: JobDurationUnit } | null;
  errors?: PostJobMilestoneFieldErrors;
  index: number;
  isFinal: boolean;
  isRightNow: boolean;
  milestone: PostJobMilestoneDraft;
  milestoneCount: number;
}) => {
  const removeMilestone = usePostJobStore((state) => state.removeMilestone);
  const toggleMilestone = usePostJobStore((state) => state.toggleMilestone);
  const updateMilestone = usePostJobStore((state) => state.updateMilestone);
  const autoDuration = isFinal && isRightNow;
  const duration = autoDuration ? derivedDuration : milestone.timeFrame;
  const amountValue = isFinal
    ? derivedAmount === null
      ? ""
      : formatInputTextNumberWithCommas(String(derivedAmount))
    : milestone.amount;
  const itemNumber = index + 1;

  return (
    <article
      className={`space-y-6 ${index > 0 ? "border-t border-[#E5E5E5] pt-6" : ""}`}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-exo font-semibold">Milestone {itemNumber}</h3>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => toggleMilestone(milestone.id)}
            aria-expanded={milestone.isExpanded}
            aria-controls={`${milestone.id}-fields`}
            className="inline-flex items-center gap-1 text-xs text-[#737774] hover:text-[#303632]"
          >
            {milestone.isExpanded ? "Hide" : "Show"}
            {milestone.isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => removeMilestone(milestone.id)}
            disabled={milestoneCount === 1}
            aria-label={`Remove milestone ${itemNumber}`}
            className="text-[#FF5D7A] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>

      {milestone.isExpanded && (
        <div id={`${milestone.id}-fields`} className="space-y-6">
          <FormField
            htmlFor={`${milestone.id}-duration`}
            label="Milestone duration"
            error={errors?.timeFrame}
            helperText={
              autoDuration
                ? "Automatically set to the remaining project duration."
                : undefined
            }
          >
            <div className="grid grid-cols-[minmax(0,2fr)_minmax(112px,1fr)] gap-2.5">
              <Input
                id={`${milestone.id}-duration`}
                name={`${milestone.id}-duration`}
                value={duration?.number ?? ""}
                type="text"
                inputMode="numeric"
                readOnly={autoDuration}
                placeholder={autoDuration ? "Auto-calculated" : "Duration"}
                onChange={(event) =>
                  updateMilestone(milestone.id, {
                    timeFrame: {
                      ...milestone.timeFrame,
                      number: formatInputTextNumber(event.target.value),
                    },
                  })
                }
                aria-invalid={Boolean(errors?.timeFrame)}
                aria-describedby={
                  errors?.timeFrame || autoDuration
                    ? `${milestone.id}-duration-description`
                    : undefined
                }
              />
              <Select
                id={`${milestone.id}-duration-unit`}
                name={`${milestone.id}-duration-unit`}
                value={duration?.period ?? milestone.timeFrame.period}
                options={POST_JOB_DURATION_OPTIONS}
                disabled={autoDuration}
                onChange={(event) =>
                  updateMilestone(milestone.id, {
                    timeFrame: {
                      ...milestone.timeFrame,
                      period: event.target.value as JobDurationUnit,
                    },
                  })
                }
                aria-label={`Milestone ${itemNumber} duration unit`}
              />
            </div>
          </FormField>

          <FormField
            htmlFor={`${milestone.id}-achievement`}
            label="Add details of what's to be achieved"
            error={errors?.achievement}
          >
            <Textarea
              id={`${milestone.id}-achievement`}
              name={`${milestone.id}-achievement`}
              value={milestone.achievement}
              maxLength={1000}
              onChange={(event) =>
                updateMilestone(milestone.id, {
                  achievement: event.target.value,
                })
              }
              placeholder="Describe the checkpoint and expected result"
              className="min-h-35"
              aria-invalid={Boolean(errors?.achievement)}
              aria-describedby={
                errors?.achievement
                  ? `${milestone.id}-achievement-description`
                  : undefined
              }
            />
          </FormField>

          <FormField
            htmlFor={`${milestone.id}-amount`}
            label="Milestone payment"
            error={errors?.amount}
            helperText={
              isFinal
                ? "Automatically set to the remaining budget. Its currency is locked to the job budget."
                : "Currency is locked to the job budget."
            }
          >
            <div className="grid grid-cols-[minmax(82px,1fr)_minmax(0,3fr)] gap-2.5">
              <Select
                id={`${milestone.id}-currency`}
                name={`${milestone.id}-currency`}
                value={currency}
                options={currencies.filter((item) => item.value === currency)}
                variant="tertiary"
                disabled
                aria-label={`Milestone ${itemNumber} currency`}
              />
              <Input
                id={`${milestone.id}-amount`}
                name={`${milestone.id}-amount`}
                value={amountValue}
                type="text"
                inputMode="decimal"
                readOnly={isFinal}
                placeholder={isFinal ? "Auto-calculated balance" : "Enter amount"}
                onChange={(event) =>
                  updateMilestone(milestone.id, {
                    amount: formatInputTextNumberWithCommas(
                      event.target.value,
                    ),
                  })
                }
                aria-invalid={Boolean(errors?.amount)}
                aria-describedby={`${milestone.id}-amount-description`}
              />
            </div>
          </FormField>
        </div>
      )}
    </article>
  );
};

export default MilestoneFormItem;
