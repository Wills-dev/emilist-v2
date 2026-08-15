import {
  convertDurationToDays,
  parseFormattedAmount,
  summarizeMilestoneAmounts,
  summarizeMilestoneDurations,
} from "./postJobMilestones";
import {
  PostJobDraft,
  PostJobMilestoneDraft,
} from "../types/postJob";
import { MAX_POST_JOB_MILESTONES } from "../constants/postJob";

export interface PostJobDetailsErrors {
  jobCategory?: string;
  service?: string;
  title?: string;
  description?: string;
  jobDuration?: string;
  jobSchedule?: string;
  jobFrequency?: string;
  recurringDates?: string;
  budget?: string;
  location?: string;
  experienceLevel?: string;
}

export interface PostJobMilestoneFieldErrors {
  achievement?: string;
  amount?: string;
  timeFrame?: string;
}

export interface PostJobDetailsValidation {
  isValid: boolean;
  errors: PostJobDetailsErrors;
  firstError?: string;
}

export interface PostJobMilestonesValidation {
  isValid: boolean;
  errors: Record<string, PostJobMilestoneFieldErrors>;
  allocationError?: string;
  durationError?: string;
  firstError?: string;
}

const getPlainText = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const toLocalDateValue = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const firstMessage = (errors: object) =>
  Object.values(errors).find((message): message is string => Boolean(message));

export const validatePostJobDetails = (
  draft: PostJobDraft,
  today = new Date(),
): PostJobDetailsValidation => {
  const errors: PostJobDetailsErrors = {};
  const budget = parseFormattedAmount(draft.budget.amount);
  const currentDate = toLocalDateValue(today);

  if (!draft.jobCategory.trim()) {
    errors.jobCategory = "Select a job category.";
  }
  if (!draft.service.trim()) {
    errors.service = "Select the service you need.";
  }
  if (!draft.title.trim()) {
    errors.title = "Enter a title for your job.";
  }
  if (!getPlainText(draft.description)) {
    errors.description = "Describe the work you need completed.";
  }
  if (budget === null || budget <= 0) {
    errors.budget = "Enter a budget greater than zero.";
  }
  if (!draft.location.address.trim()) {
    errors.location = "Enter the location where the job will take place.";
  }
  if (!draft.expertId.trim() && !draft.experienceLevel) {
    errors.experienceLevel = "Select the experience level you need.";
  }

  if (draft.jobUrgency === "right_now") {
    if (convertDurationToDays(draft.jobDuration) === null) {
      errors.jobDuration = "Enter a whole-number project duration.";
    }
  }

  if (draft.jobUrgency === "in_future") {
    const { startDate, endDate } = draft.jobSchedule;
    if (!startDate || !endDate) {
      errors.jobSchedule = "Select both a start date and an end date.";
    } else if (startDate < currentDate) {
      errors.jobSchedule = "The start date cannot be in the past.";
    } else if (endDate < startDate) {
      errors.jobSchedule = "The end date must be on or after the start date.";
    }
  }

  if (draft.jobUrgency === "regularly") {
    if (!draft.jobFrequency) {
      errors.jobFrequency = "Select how often the job should repeat.";
    }
    if (!draft.startDate) {
      errors.recurringDates = "Select a start date for the recurring job.";
    } else if (draft.startDate < currentDate) {
      errors.recurringDates = "The start date cannot be in the past.";
    } else if (draft.endDate && draft.endDate < draft.startDate) {
      errors.recurringDates = "The end date must be on or after the start date.";
    }
  }

  const firstError = firstMessage(errors);
  return { isValid: !firstError, errors, firstError };
};

const getMilestoneErrors = (
  errors: Record<string, PostJobMilestoneFieldErrors>,
  milestone: PostJobMilestoneDraft,
) => {
  errors[milestone.id] ??= {};
  return errors[milestone.id];
};

export const validatePostJobMilestones = (
  draft: PostJobDraft,
): PostJobMilestonesValidation => {
  const errors: Record<string, PostJobMilestoneFieldErrors> = {};
  let allocationError: string | undefined;
  let durationError: string | undefined;

  if (draft.milestones.length === 0) {
    return {
      isValid: false,
      errors,
      firstError: "Add at least one milestone.",
    };
  }

  if (draft.milestones.length > MAX_POST_JOB_MILESTONES) {
    return {
      isValid: false,
      errors,
      firstError: `Use no more than ${MAX_POST_JOB_MILESTONES} milestones.`,
    };
  }

  draft.milestones.forEach((milestone) => {
    if (!milestone.achievement.trim()) {
      getMilestoneErrors(errors, milestone).achievement =
        "Describe what must be achieved for this milestone.";
    }
  });

  const amountSummary = summarizeMilestoneAmounts(
    draft.milestones,
    draft.budget.amount,
  );
  amountSummary.invalidIndexes.forEach((index) => {
    const milestone = draft.milestones[index];
    if (milestone) {
      getMilestoneErrors(errors, milestone).amount =
        "Enter an amount greater than zero.";
    }
  });

  if (amountSummary.excess > 0) {
    allocationError = `Milestones exceed the budget by ${draft.budget.currency} ${amountSummary.excess.toLocaleString()}. Reduce an earlier milestone.`;
  } else if (amountSummary.finalAmount === null) {
    allocationError =
      amountSummary.invalidIndexes.length > 0
        ? "Complete the earlier milestone amounts so the final balance can be calculated."
        : "Leave a positive balance for the final milestone.";
  }

  if (draft.jobUrgency === "right_now") {
    const durationSummary = summarizeMilestoneDurations(
      draft.milestones,
      draft.jobDuration,
    );
    durationSummary.invalidIndexes.forEach((index) => {
      const milestone = draft.milestones[index];
      if (milestone) {
        getMilestoneErrors(errors, milestone).timeFrame =
          "Enter a whole-number duration greater than zero.";
      }
    });

    if (durationSummary.excessDays > 0) {
      durationError = `Milestones exceed the project duration by ${durationSummary.excessDays} day${durationSummary.excessDays === 1 ? "" : "s"}. Reduce an earlier milestone.`;
    } else if (durationSummary.finalDuration === null) {
      durationError =
        durationSummary.invalidIndexes.length > 0
          ? "Complete the earlier milestone durations so the final duration can be calculated."
          : "Leave time for the final milestone.";
    }
  } else {
    draft.milestones.forEach((milestone) => {
      if (convertDurationToDays(milestone.timeFrame) === null) {
        getMilestoneErrors(errors, milestone).timeFrame =
          "Enter a whole-number duration greater than zero.";
      }
    });
  }

  const fieldError = Object.values(errors).flatMap((error) =>
    Object.values(error),
  )[0];
  const firstError = fieldError || allocationError || durationError;

  return {
    isValid: !firstError,
    errors,
    allocationError,
    durationError,
    firstError,
  };
};
