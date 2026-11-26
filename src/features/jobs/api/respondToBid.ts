import { respondCounterBid, type BidResponseAction } from "./respondCounterBid";
import { updateApplicationStatus } from "./updateApplicationStatus";

export const respondToBid = ({ projectId, action, hasCounterOffer }: { projectId: string; action: BidResponseAction; hasCounterOffer: boolean }) =>
  hasCounterOffer
    ? respondCounterBid({ projectId, action })
    : updateApplicationStatus({ projectId, status: action === "accept" ? "accepted" : "rejected" });
