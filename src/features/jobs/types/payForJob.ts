import type { PaymentCheckoutResponse } from "@/lib/helpers/paymentRedirect";

export type JobPaymentMethod = "Wallet" | "Card";

export interface PayForJobPayload {
  jobId: string;
  milestoneId: string;
  paymentMethod: JobPaymentMethod;
  currency: string;
  isAdditionalAmount: boolean;
  redirectUrl: string;
}

export type PayForJobResponse = PaymentCheckoutResponse;
