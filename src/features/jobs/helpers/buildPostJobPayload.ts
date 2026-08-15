import {
  getActiveBudget,
  parseFormattedAmount,
  summarizeMilestoneAmounts,
  summarizeMilestoneDurations,
} from "./postJobMilestones";
import {
  JobMilestoneWriteDto,
  PostJobFormData,
  PostJobWriteDto,
} from "../types/postJob";
import {
  MAX_POST_JOB_FILES,
  MAX_POST_JOB_MILESTONES,
} from "../constants/postJob";

export const buildPostJobPayload = (
  formData: PostJobFormData,
): PostJobWriteDto => {
  const { draft, uploads } = formData;

  if (
    draft.milestones.length < 1 ||
    draft.milestones.length > MAX_POST_JOB_MILESTONES
  ) {
    throw new Error(
      `A job must have between 1 and ${MAX_POST_JOB_MILESTONES} milestones.`,
    );
  }
  if (uploads.files.length > MAX_POST_JOB_FILES) {
    throw new Error(`You can upload up to ${MAX_POST_JOB_FILES} images.`);
  }

  const activeBudget = getActiveBudget(draft);
  const amountSummary = summarizeMilestoneAmounts(
    draft.milestones,
    draft.budget.amount,
  );
  const durationSummary =
    draft.jobUrgency === "right_now"
      ? summarizeMilestoneDurations(draft.milestones, draft.jobDuration)
      : null;

  if (amountSummary.finalAmount === null) {
    throw new Error("The milestone budget allocation is incomplete.");
  }
  if (
    draft.jobUrgency === "right_now" &&
    !durationSummary?.finalDuration
  ) {
    throw new Error("The milestone duration allocation is incomplete.");
  }

  const milestones: JobMilestoneWriteDto[] = draft.milestones.map(
    (milestone, index) => {
      const isFinal = index === draft.milestones.length - 1;
      const amount = isFinal
        ? amountSummary.finalAmount!
        : (parseFormattedAmount(milestone.amount) ?? 0);
      const timeFrame =
        isFinal && durationSummary
          ? durationSummary.finalDuration!
          : {
              number: Number(milestone.timeFrame.number),
              period: milestone.timeFrame.period,
            };

      return {
        timeFrame,
        achievement: milestone.achievement.trim(),
        amount,
        currency: activeBudget.currency,
      };
    },
  );

  const location = {
    address: draft.location.address.trim(),
    ...(draft.location.lat !== null && draft.location.lng !== null
      ? { lat: draft.location.lat, lng: draft.location.lng }
      : {}),
  };
  const expertId = draft.expertId.trim();

  const payload: PostJobWriteDto = {
    jobCategory: draft.jobCategory,
    service: draft.service,
    title: draft.title.trim(),
    description: draft.description,
    jobUrgency: draft.jobUrgency,
    location,
    milestones,
    ...(uploads.files.length > 0 ? { files: uploads.files } : {}),
    ...(expertId
      ? { expertId }
      : {
          allowBidding: draft.allowBidding,
          experienceLevel: draft.experienceLevel,
        }),
  };

  if (draft.jobUrgency === "right_now") {
    payload.jobDuration = {
      value: Number(draft.jobDuration.value),
      unit: draft.jobDuration.unit,
    };
    payload.totalBudget = activeBudget;
  } else if (draft.jobUrgency === "in_future") {
    payload.jobSchedule = { ...draft.jobSchedule };
    payload.estimatedBudget = activeBudget;
  } else {
    payload.jobFrequency = draft.jobFrequency;
    payload.startDate = draft.startDate;
    if (draft.endDate) payload.endDate = draft.endDate;
    payload.recurringBudget = {
      ...activeBudget,
      period: draft.jobFrequency,
    };
  }

  return payload;
};
