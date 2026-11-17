import type { ReportCurrency } from "../types/api";
export type { ReportCurrency } from "../types/api";
export const formatReportCurrency = (amount: number, currency: ReportCurrency) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 2 }).format(amount);
