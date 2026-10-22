export type ApplyJobPayload = {
  jobId: string;
  businessId: string;
} & (
  | { type: "regular" }
  | {
      type: "biddable";
      maximumPrice: number;
      milestones: { milestoneId: string; amount: number; achievement: string }[];
    }
);
