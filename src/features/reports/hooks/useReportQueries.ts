import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store/authStore";
import { fetchReports } from "../api/fetchReports";
import { fetchReportTarget } from "../api/fetchReportTarget";
import { reportKeys } from "../queries/reportKeys";
import { reportParams } from "../helpers/reportParams";
import type { FetchReportInput } from "../types/api";
export const useReportQuery = (input: FetchReportInput) => {
  const userId = useStore((state) => state.currentUser?._id) ?? "";
  const filters = reportParams(input);
  return useQuery({ queryKey: reportKeys.report(userId, filters), queryFn: ({ signal }) => fetchReports(filters, signal), enabled: Boolean(userId), staleTime: 30_000, retry: 1 });
};
export const useReportTargetQuery = (input: FetchReportInput, enabled: boolean) => {
  const userId = useStore((state) => state.currentUser?._id) ?? "";
  const filters = reportParams(input);
  return useQuery({ queryKey: reportKeys.target(userId, filters), queryFn: ({ signal }) => fetchReportTarget(filters, signal), enabled: enabled && Boolean(userId), staleTime: 0, retry: 1 });
};
