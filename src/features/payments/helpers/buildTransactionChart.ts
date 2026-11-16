import type { MonthlyTransaction, Transaction } from "../types";

export const buildTransactionChart = (transactions: Transaction[], now = new Date()): MonthlyTransaction[] => {
  const months = Array.from({ length: 12 }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 11 + index, 1));
    return { key: `${date.getUTCFullYear()}-${date.getUTCMonth()}`, month: date.toLocaleDateString("en-GB", { month: "short", timeZone: "UTC" }), inflow: 0, outflow: 0 };
  });
  for (const transaction of transactions) {
    if (transaction.status !== "successful" || !transaction.createdAt || transaction.type === "unknown") continue;
    const date = new Date(transaction.createdAt);
    const month = months.find((item) => item.key === `${date.getUTCFullYear()}-${date.getUTCMonth()}`);
    if (month) month[transaction.type] += transaction.amount;
  }
  return months.map(({ month, inflow, outflow }) => ({ month, inflow, outflow }));
};
