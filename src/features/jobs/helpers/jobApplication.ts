import { deriveFinalMilestoneAmount, parseAmountToMinorUnits } from "./postJobMilestones";
import type { ApplyJobPayload } from "../types/application";

export interface BidMilestoneDraft {
  milestoneId: string;
  amount: string;
  achievement: string;
}

export const balanceBidMilestones = (milestones: BidMilestoneDraft[], maximumPrice: string) => {
  if (!milestones.length) return milestones;
  const finalAmount = deriveFinalMilestoneAmount(milestones, maximumPrice);
  return milestones.map((item, index) => index === milestones.length - 1
    ? { ...item, amount: finalAmount === null ? "" : String(finalAmount) }
    : item);
};

export const buildJobApplication = ({ jobId, businessId, type, maximumPrice, milestones }: {
  jobId: string;
  businessId: string;
  type?: string;
  maximumPrice: string;
  milestones: BidMilestoneDraft[];
}): ApplyJobPayload => {
  if (!businessId || !jobId) throw new Error("Select a business before applying.");
  if (type === "regular") return { jobId, businessId, type };
  if (type !== "biddable") throw new Error("This job’s application type is unavailable.");
  const price = Number(maximumPrice);
  if (!Number.isFinite(price) || price <= 0) throw new Error("Enter a valid maximum price.");
  if (milestones.some((item) => !item.milestoneId || item.milestoneId.startsWith("milestone-"))) {
    throw new Error("Milestone details are unavailable. Please reload the job and try again.");
  }
  if (milestones.some((item) => !item.achievement.trim() || !Number.isFinite(Number(item.amount)) || Number(item.amount) <= 0)) {
    throw new Error("Enter valid prices and achievements for each milestone.");
  }
  const totalMinorUnits = milestones.reduce((sum, item) => sum + (parseAmountToMinorUnits(item.amount) ?? 0), 0);
  const priceMinorUnits = parseAmountToMinorUnits(maximumPrice);
  if (milestones.length && totalMinorUnits !== priceMinorUnits) {
    throw new Error(`The milestone total is ${totalMinorUnits < (priceMinorUnits ?? 0) ? "less" : "more"} than your bid amount. Milestone prices must add up exactly to your bid amount.`);
  }
  return {
    jobId, businessId, type, maximumPrice: price,
    milestones: milestones.map((item) => ({
      milestoneId: item.milestoneId,
      amount: Number(item.amount),
      achievement: item.achievement.trim(),
    })),
  };
};
