export interface CompleteMilestonePayload {
  status: "completed";
  note?: string;
  additionalAmount?: number;
}

export interface UpdateMilestoneStatusParams {
  jobId: string;
  milestoneId: string;
  payload: CompleteMilestonePayload;
}
