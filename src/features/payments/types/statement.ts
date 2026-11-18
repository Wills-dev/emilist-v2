export interface StatementQuery {
  format: "pdf" | "csv";
  currency?: string;
  walletId?: string;
  startDate?: string;
  endDate?: string;
  status?: "all" | "pending" | "failed" | "successful";
}
