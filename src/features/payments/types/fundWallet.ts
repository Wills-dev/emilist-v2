import type { PaymentCheckoutResponse } from "@/lib/helpers/paymentRedirect";

export interface FundWalletPayload {
  currency: string;
  amount: number;
  paymentMethod: "Card";
  walletId: string;
  redirectUrl: string;
}

export type FundWalletResponse = PaymentCheckoutResponse;
