import type { PaymentWallet } from "./wallets";

export interface PayoutBank {
  bankCode: string;
  bankName: string;
}

export interface PayoutBankAccount {
  bankAccountId: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  currency: string;
  isDefault: boolean;
}

export interface WalletOverview {
  wallet: PaymentWallet | null;
  wallets: PaymentWallet[];
  bankAccount: PayoutBankAccount | null;
}

export interface WalletOverviewQuery {
  walletId?: string;
  currency?: string;
}

export interface AddBankAccountPayload {
  bankCode: string;
  accountNumber: string;
  currency: "NGN";
}

export interface WithdrawFundsPayload {
  amount: number;
  currency: string;
  walletId: string;
  bankAccountId: string;
}

export interface WalletActionResponse {
  message?: string;
  success?: boolean;
  status?: boolean | string;
}
