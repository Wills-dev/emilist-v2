export interface SubscribePlanPayload {
  planId: string;
  paymentMethod: "Wallet" | "Card";
  currency: string;
  redirectUrl: string;
}

export interface UserSubscription {
  id: string;
  planId: string;
  planName: string;
  status: string;
  startedAt: string;
  expiresAt: string;
  createdAt: string;
  paidAt: string;
  amount?: number;
  currency: string;
  reference: string;
  paymentStatus: string;
}
