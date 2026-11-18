import { formatBudgetAmount } from "@/features/jobs/helpers/manageJobs";
import type { Transaction } from "../types";

export const transactionDetailRows = (item: Transaction) => [
  { label: "Transaction ID", value: item.id, identifier: true },
  { label: "Reference", value: item.reference, identifier: true },
  { label: "Amount", value: item.formattedAmount || formatBudgetAmount(item.amount, item.currency || "NGN") },
  { label: "Currency", value: item.currency },
  { label: "Date", value: item.createdAt && Number.isFinite(new Date(item.createdAt).getTime()) ? new Date(item.createdAt).toLocaleString("en-GB") : item.date },
  { label: "Transaction type", value: item.type },
  { label: "Counterparty / description", value: item.counterparty },
  { label: "Payment method", value: item.paymentMethod },
  { label: "Payment service", value: item.paymentService },
  { label: "Service type", value: item.serviceType },
  { label: "Balance", value: item.balance === undefined ? undefined : formatBudgetAmount(item.balance, item.currency || "NGN") },
  { label: "Wallet ID", value: item.walletId, identifier: true },
  { label: "Job ID", value: item.jobId, identifier: true },
  { label: "Milestone ID", value: item.milestoneId, identifier: true },
  { label: "Order ID", value: item.orderId, identifier: true },
].filter((row) => Boolean(row.value));
