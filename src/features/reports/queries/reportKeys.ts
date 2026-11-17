import type { FetchReportInput } from "../types/api";
export const reportKeys = {
  all: ["reports"] as const,
  report: (userId: string, filters: FetchReportInput) => [...reportKeys.all, userId, "report", filters] as const,
  target: (userId: string, filters: FetchReportInput) => [...reportKeys.all, userId, "target", filters] as const,
};
