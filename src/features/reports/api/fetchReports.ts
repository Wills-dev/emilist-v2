import { axiosInstance } from "@/lib/axiosInstance";
import type { ApiResponse, FetchReportInput, UserReport } from "../types/api";
import { reportParams } from "../helpers/reportParams";
import { validateReport } from "../helpers/validateReport";
export const fetchReports = async (filters: FetchReportInput, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<ApiResponse<UserReport>>("/reports", { params: reportParams(filters), signal });
  const report = validateReport(data?.data);
  if (filters.currency && report.finance.currency !== filters.currency) throw new Error("The report currency does not match the selected currency.");
  return report;
};
