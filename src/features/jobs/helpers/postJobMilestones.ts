import {
  JobDurationUnit,
  JobMoney,
  PostJobDraft,
  PostJobMilestoneDraft,
  RecurringJobMoney,
} from "../types/postJob";

export type AllocationStatus =
  | "balanced"
  | "remaining"
  | "over"
  | "invalid";

export type AmountInput = string | number | null | undefined;

const MONEY_MINOR_UNIT_FACTOR = 100;

export interface DurationInput {
  value: string | number | null | undefined;
  unit: JobDurationUnit;
}

export interface TimeFrameInput {
  number: string | number | null | undefined;
  period: JobDurationUnit;
}

export interface AmountAllocationSummary {
  status: AllocationStatus;
  budget: number;
  allocatedBeforeFinal: number;
  finalAmount: number | null;
  remaining: number;
  excess: number;
  invalidIndexes: number[];
}

export interface DurationAllocationSummary {
  status: AllocationStatus;
  totalDays: number;
  allocatedDaysBeforeFinal: number;
  finalDuration: { number: number; period: JobDurationUnit } | null;
  remainingDays: number;
  excessDays: number;
  invalidIndexes: number[];
}

/** Fixed factors used by both the UI and payload validation. */
export const DURATION_DAYS_BY_UNIT: Record<JobDurationUnit, number> = {
  days: 1,
  weeks: 7,
  months: 30,
};

export const parseFormattedAmount = (value: AmountInput): number | null => {
  if (value === null || value === undefined || String(value).trim() === "") {
    return null;
  }

  const parsed = Number(String(value).replace(/,/g, ""));
  if (!Number.isFinite(parsed)) return null;

  return (
    Math.round((parsed + Number.EPSILON) * MONEY_MINOR_UNIT_FACTOR) /
    MONEY_MINOR_UNIT_FACTOR
  );
};

/**
 * Keep allocation arithmetic in minor units so values such as 100.10 - 70.05
 * resolve to exactly 30.05 instead of a binary floating-point remainder.
 */
const parseAmountToMinorUnits = (value: AmountInput): number | null => {
  const amount = parseFormattedAmount(value);
  if (amount === null) return null;

  const minorUnits = Math.round(
    (amount + Number.EPSILON) * MONEY_MINOR_UNIT_FACTOR,
  );
  return Number.isSafeInteger(minorUnits) ? minorUnits : null;
};

const minorUnitsToAmount = (minorUnits: number) =>
  minorUnits / MONEY_MINOR_UNIT_FACTOR;

export const convertDurationToDays = (
  duration: DurationInput | TimeFrameInput,
): number | null => {
  const rawValue = "value" in duration ? duration.value : duration.number;
  const unit = "unit" in duration ? duration.unit : duration.period;
  const value = Number(rawValue);

  if (!Number.isFinite(value) || value <= 0 || !Number.isInteger(value)) {
    return null;
  }

  return value * DURATION_DAYS_BY_UNIT[unit];
};

export const canonicalizeDurationDays = (
  days: number,
): { number: number; period: JobDurationUnit } | null => {
  if (!Number.isFinite(days) || days <= 0 || !Number.isInteger(days)) {
    return null;
  }

  if (days % DURATION_DAYS_BY_UNIT.months === 0) {
    return {
      number: days / DURATION_DAYS_BY_UNIT.months,
      period: "months",
    };
  }

  if (days % DURATION_DAYS_BY_UNIT.weeks === 0) {
    return {
      number: days / DURATION_DAYS_BY_UNIT.weeks,
      period: "weeks",
    };
  }

  return { number: days, period: "days" };
};

export const getActiveBudget = (
  draft: PostJobDraft,
): JobMoney | RecurringJobMoney => {
  const amount = parseFormattedAmount(draft.budget.amount) ?? 0;
  const money = { currency: draft.budget.currency, amount };

  return draft.jobUrgency === "regularly"
    ? { ...money, period: draft.jobFrequency }
    : money;
};

export const summarizeMilestoneAmounts = (
  milestones: readonly Pick<PostJobMilestoneDraft, "amount">[],
  budgetInput: AmountInput,
): AmountAllocationSummary => {
  const budgetMinorUnits = parseAmountToMinorUnits(budgetInput) ?? 0;
  const editableMilestones = milestones.slice(0, -1);
  const invalidIndexes: number[] = [];
  let allocatedMinorUnitsBeforeFinal = 0;

  editableMilestones.forEach((milestone, index) => {
    const amountMinorUnits = parseAmountToMinorUnits(milestone.amount);
    if (amountMinorUnits === null || amountMinorUnits <= 0) {
      invalidIndexes.push(index);
      return;
    }
    allocatedMinorUnitsBeforeFinal += amountMinorUnits;
  });

  const differenceMinorUnits =
    budgetMinorUnits - allocatedMinorUnitsBeforeFinal;
  const remainingMinorUnits = Math.max(differenceMinorUnits, 0);
  const excessMinorUnits = Math.max(-differenceMinorUnits, 0);
  const finalAmount =
    budgetMinorUnits > 0 &&
    invalidIndexes.length === 0 &&
    differenceMinorUnits > 0
      ? minorUnitsToAmount(differenceMinorUnits)
      : null;

  const status: AllocationStatus =
    budgetMinorUnits <= 0 || invalidIndexes.length > 0
      ? "invalid"
      : excessMinorUnits > 0 || differenceMinorUnits === 0
        ? "over"
        : editableMilestones.length === 0
          ? "balanced"
          : "remaining";

  return {
    status,
    budget: minorUnitsToAmount(budgetMinorUnits),
    allocatedBeforeFinal: minorUnitsToAmount(
      allocatedMinorUnitsBeforeFinal,
    ),
    finalAmount,
    remaining: minorUnitsToAmount(remainingMinorUnits),
    excess: minorUnitsToAmount(excessMinorUnits),
    invalidIndexes,
  };
};

export const deriveFinalMilestoneAmount = (
  milestones: readonly Pick<PostJobMilestoneDraft, "amount">[],
  budgetInput: AmountInput,
) => summarizeMilestoneAmounts(milestones, budgetInput).finalAmount;

export const summarizeMilestoneDurations = (
  milestones: readonly Pick<PostJobMilestoneDraft, "timeFrame">[],
  jobDuration: DurationInput,
): DurationAllocationSummary => {
  const totalDays = convertDurationToDays(jobDuration) ?? 0;
  const editableMilestones = milestones.slice(0, -1);
  const invalidIndexes: number[] = [];
  let allocatedDaysBeforeFinal = 0;

  editableMilestones.forEach((milestone, index) => {
    const days = convertDurationToDays(milestone.timeFrame);
    if (days === null) {
      invalidIndexes.push(index);
      return;
    }
    allocatedDaysBeforeFinal += days;
  });

  const difference = totalDays - allocatedDaysBeforeFinal;
  const remainingDays = Math.max(difference, 0);
  const excessDays = Math.max(-difference, 0);
  const finalDuration =
    totalDays > 0 && invalidIndexes.length === 0
      ? canonicalizeDurationDays(difference)
      : null;

  const status: AllocationStatus =
    totalDays <= 0 || invalidIndexes.length > 0
      ? "invalid"
      : excessDays > 0 || difference === 0
        ? "over"
        : editableMilestones.length === 0
          ? "balanced"
          : "remaining";

  return {
    status,
    totalDays,
    allocatedDaysBeforeFinal,
    finalDuration,
    remainingDays,
    excessDays,
    invalidIndexes,
  };
};

export const deriveFinalMilestoneDuration = (
  milestones: readonly Pick<PostJobMilestoneDraft, "timeFrame">[],
  jobDuration: DurationInput,
) => summarizeMilestoneDurations(milestones, jobDuration).finalDuration;
