import type { PaymentCheckoutResponse } from "@/lib/helpers/paymentRedirect";

interface FundingBase {
  currency: string;
  amount: number;
  walletId: string;
}
export type FundWalletPayload = FundingBase & (
  | { paymentMethod: "Card"; redirectUrl: string }
  | { paymentMethod: "BankTransfer"; image: File }
);
export interface FundingCheckoutData extends NonNullable<PaymentCheckoutResponse["data"]> {
  reference?: string;
  transactionId?: string;
  status?: string;
}
export type FundWalletResponse = Omit<PaymentCheckoutResponse, "data"> & { data?: FundingCheckoutData | string };
export interface StoredWalletFunding {
  userId: string;
  walletId: string;
  transactionId: string;
  reference: string;
}
