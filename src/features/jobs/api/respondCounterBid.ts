import { axiosInstance } from "@/lib/axiosInstance";

export type BidResponseAction = "accept" | "reject";

export const respondCounterBid = async ({ projectId, action }: { projectId: string; action: BidResponseAction }) => {
  const { data } = await axiosInstance.patch(`/jobs/respond-counter-bid/${encodeURIComponent(projectId)}`, { action });
  return data;
};
