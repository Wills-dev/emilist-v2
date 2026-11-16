import { axiosInstance } from "@/lib/axiosInstance";
import { normalizeTransactionPage, transactionRecord, normalizeTransactionStatus } from "../helpers/normalizeTransactions";

export const fetchWalletTransactions = async (walletId: string, currency: string, page: number, limit = 20, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>("/transaction/fetch-all-user-transactions", { params: { walletId, page, limit }, signal });
  return normalizeTransactionPage(data, currency, page, limit);
};
export const fetchMyTransaction = async (transactionId: string, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<unknown>(`/transaction/fetch-my-transaction/${encodeURIComponent(transactionId)}`, { signal });
  const transaction = transactionRecord(data);
  return { id: transactionId, status: normalizeTransactionStatus(transaction.status), reference: typeof transaction.reference === "string" ? transaction.reference : "" };
};
export const verifyPaystackPayment = async (reference: string) => {
  const { data } = await axiosInstance.get<unknown>(`/transaction/verify-paystack-payment/${encodeURIComponent(reference)}`);
  const result = data as { success?: boolean; status?: boolean | string; message?: string };
  if (result.success === false || result.status === false || result.status === "error" || result.status === "failed") throw new Error(result.message || "Unable to verify this payment.");
  return data;
};
