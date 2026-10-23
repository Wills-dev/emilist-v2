export interface CounterOfferPayload {
  maximumPrice: number;
  message: string;
  milestones: { milestoneId: string; amount: number; achievement: string }[];
}
export interface CounterOfferSummary {
  maxPerParty: number;
  jobOwnerUsed: number;
  applicantUsed: number;
  jobOwnerRemaining: number;
  applicantRemaining: number;
}
