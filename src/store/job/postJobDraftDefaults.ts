import { PostJobDraft, PostJobMilestoneDraft } from "@/features/jobs/types/postJob";

export const createMilestoneId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? `milestone-${crypto.randomUUID()}`
    : `milestone-${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const createMilestone = (id = "milestone-1"): PostJobMilestoneDraft => ({
  id,
  timeFrame: { number: "", period: "weeks" },
  achievement: "",
  amount: "",
  isExpanded: true,
});

export const createDefaultJobDraft = (): PostJobDraft => ({
  step: 1,
  jobCategory: "",
  service: "",
  title: "",
  description: "",
  jobUrgency: "right_now",
  budget: { currency: "NGN", amount: "" },
  jobDuration: { value: "", unit: "weeks" },
  jobSchedule: { startDate: "", endDate: "" },
  jobFrequency: "weekly",
  startDate: "",
  endDate: "",
  location: { address: "", lat: null, lng: null },
  allowBidding: true,
  experienceLevel: "senior",
  expertId: "",
  milestones: [createMilestone()],
});
