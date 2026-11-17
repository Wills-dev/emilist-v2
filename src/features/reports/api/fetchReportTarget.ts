import { axiosInstance } from "@/lib/axiosInstance";
import type { ApiResponse, FetchReportInput, ReportTarget, ReportFilters } from "../types/api";
import { reportParams } from "../helpers/reportParams";
import { validateTarget } from "../helpers/validateReport";
export const fetchReportTarget = async (filters: FetchReportInput, signal?: AbortSignal) => {
  const { data } = await axiosInstance.get<ApiResponse<{ filters: ReportFilters; target: ReportTarget }>>("/reports/targets", { params: reportParams(filters), signal });
  const target = validateTarget(data?.data?.target);
  if (filters.currency && target.currency !== filters.currency) throw new Error("The target currency does not match the selected currency.");
  return target;
};
