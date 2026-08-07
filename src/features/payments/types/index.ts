export type TransactionStatus = "pending" | "failed" | "successful";
export type TransactionFilter = "all" | TransactionStatus;
export type PaymentModalType = "add-wallet" | "fund" | "withdraw" | "statement";

export interface Wallet {
  id: string;
  name: string;
  currency: "NGN" | "USD" | "EUR" | "CAD";
  balance: number;
  bank: string;
  accountNumber: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  counterparty: string;
  type: "inflow" | "outflow";
  status: TransactionStatus;
  year: number;
}

export interface MonthlyTransaction {
  month: string;
  inflow: number;
  outflow: number;
}
