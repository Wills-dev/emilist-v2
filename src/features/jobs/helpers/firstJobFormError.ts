import type { PostJobDetailsValidation, PostJobMilestonesValidation } from "./validatePostJob";
import type { PostJobDraft } from "../types/postJob";

export const firstJobDetailsError = (validation: PostJobDetailsValidation) => {
  const fields = [
    ["jobCategory", "job-category"], ["service", "job-service"], ["title", "job-title"], ["description", "job-description"],
    ["jobDuration", "job-duration"], ["jobSchedule", "job-schedule-start"], ["jobFrequency", "job-frequency"], ["recurringDates", "recurring-start-date"],
    ["budget", "job-budget"], ["location", "job-location"], ["experienceLevel", "experienceLevel"],
  ] as const;
  const field = fields.find(([key]) => validation.errors[key]);
  return field ? { selector: `[id="${field[1]}"], [name="${field[1]}"]`, message: validation.errors[field[0]] } : undefined;
};

export const firstJobMilestoneError = (draft: PostJobDraft, validation: PostJobMilestonesValidation) => {
  for (const milestone of draft.milestones) {
    const error = validation.errors[milestone.id];
    for (const [key, suffix] of [["timeFrame", "duration"], ["achievement", "achievement"], ["amount", "amount"]] as const) {
      if (error?.[key]) return { selector: `[id="${milestone.id}-${suffix}"]`, message: error[key] };
    }
  }
  const first = draft.milestones[0];
  return { selector: first ? `[id="${first.id}-${validation.durationError ? "duration" : "amount"}"]` : "#milestones-title", message: validation.firstError };
};
