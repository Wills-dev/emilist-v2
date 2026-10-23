import { axiosInstance } from "@/lib/axiosInstance";
import type { CounterOfferPayload } from "../types/counterOffer";

export const counterBid = async ({ projectId, payload }: { projectId: string; payload: CounterOfferPayload }) => {
  const { data } = await axiosInstance.patch(`/jobs/counter-bid/${encodeURIComponent(projectId)}`, payload);
  return data;
};
