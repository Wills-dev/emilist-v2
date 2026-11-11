export type JobPaymentMethod = "Wallet" | "Card";

export interface PayForJobPayload {
  jobId: string;
  milestoneId: string;
  paymentMethod: JobPaymentMethod;
  currency: string;
  isAdditionalAmount: boolean;
}

export interface PayForJobResponse {
  message?: string;
  status?: boolean | string;
  success?: boolean;
  data?: {
    authorization_url?: string;
    authorizationUrl?: string;
    checkoutUrl?: string;
  };
}
