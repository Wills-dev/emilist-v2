import type { Transaction, TransactionStatus } from "../types";

const record = (value: unknown): Record<string, unknown> => value && typeof value === "object" ? value as Record<string, unknown> : {};
const text = (value: unknown) => typeof value === "string" ? value : "";
export const normalizeTransactionStatus = (value: unknown): TransactionStatus => {
  const status = text(value).toLowerCase();
  return status === "pending" || status === "processing" || status === "successful" || status === "failed" ? status : "unknown";
};
export const transactionRecord = (response: unknown) => {
  const data = record(response).data ?? response;
  return record(record(data).transaction ?? data);
};
export const normalizeTransaction = (value: unknown, currency: string): Transaction => {
  const item = record(value);
  const id = text(item.transactionId) || text(item._id) || text(item.id);
  const amount = item.amount === null || item.amount === undefined || item.amount === "" ? NaN : Number(item.amount);
  if (!id || !Number.isFinite(amount) || amount < 0) throw new Error("A transaction is missing its ID or amount.");
  const createdAt = text(item.createdAt) || text(item.date);
  const date = new Date(createdAt);
  const validDate = Number.isFinite(date.getTime());
  const rawType = (text(item.transactionType) || text(item.type)).toLowerCase();
  const balance = (typeof item.balance === "number" || typeof item.balance === "string") && String(item.balance).trim() ? Number(item.balance) : undefined;
  return {
    id,
    shortTransactionId: text(item.shortTransactionId),
    formattedAmount: text(item.formattedAmount),
    walletId: text(item.walletId),
    paymentMethod: text(item.paymentMethod),
    balance: balance !== undefined && Number.isFinite(balance) && balance >= 0 ? balance : undefined,
    reference: text(item.reference),
    currency: text(item.currency) || currency,
    date: validDate ? date.toLocaleDateString("en-GB", { timeZone: "UTC" }) : "—",
    createdAt,
    amount,
    counterparty: text(item.counterparty) || text(item.description) || "—",
    type: rawType === "credit" || rawType === "inflow" ? "inflow" : rawType === "debit" || rawType === "outflow" ? "outflow" : "unknown",
    status: normalizeTransactionStatus(item.status),
    year: validDate ? date.getUTCFullYear() : 0,
  };
};
export const normalizeTransactionPage = (response: unknown, walletCurrency: string, page: number, limit: number) => {
  const data = record(response).data ?? response;
  const metadata = record(data);
  const items = Array.isArray(data) ? data : metadata.transactions;
  if (!Array.isArray(items)) throw new Error("The transactions response did not include a valid list.");
  const totalPages = Number(metadata.totalPages);
  const total = Number(metadata.totalTransactions);
  const hasMore = Number.isFinite(totalPages) ? page < totalPages : Number.isFinite(total) ? page * limit < total : items.length === limit;
  return { transactions: items.map((item) => normalizeTransaction(item, walletCurrency)), nextPage: hasMore ? page + 1 : undefined };
};
