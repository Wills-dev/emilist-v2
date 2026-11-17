export type TransactionStatus = "pending" | "processing" | "failed" | "successful" | "unknown";
export type TransactionFilter = "all" | TransactionStatus;
export type PaymentModalType = "add-wallet" | "fund" | "withdraw" | "statement";

export interface Wallet {
  id: string;
  name?: string;
  currency: string;
  balance?: number;
  isDefault?: boolean;
  bank?: string;
  accountNumber?: string;
}

export interface Transaction {
  id: string;
  shortTransactionId?: string;
  formattedAmount?: string;
  walletId?: string;
  balance?: number;
  paymentMethod?: string;
  paymentService?: string;
  serviceType?: string;
  jobId?: string;
  milestoneId?: string;
  orderId?: string;
  date: string;
  amount: number;
  counterparty: string;
  type: "inflow" | "outflow" | "unknown";
  currency?: string;
  reference?: string;
  createdAt?: string;
  status: TransactionStatus;
  year: number;
}

export interface MonthlyTransaction {
  month: string;
  inflow: number;
  outflow: number;
}
