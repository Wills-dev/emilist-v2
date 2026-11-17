"use client";

import { useState, type ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useReportFilters } from "./useReportFilters";
import { useReportQuery } from "./useReportQueries";
import { downloadReportsCsv } from "../api/downloadReportsCsv";
import { mapCoreReports } from "../helpers/mapCoreReports";
import { mapInsightReports } from "../helpers/mapInsightReports";
import { reportTabs } from "../constants/options";
import type { ReportTab } from "../types";
export const useReports = () => {
  const filters = useReportFilters();
  const query = useReportQuery(filters.input);
  const [tab, setTab] = useState<ReportTab>("jobs");
  const [search, setSearch] = useState("");
  const [targetModal, setTargetModal] = useState<"set" | "review" | null>(null);
  const download = useMutation({ mutationFn: () => downloadReportsCsv(filters.input), onError: () => toast.error("Unable to download your report. Please try again."), retry: false });
  const clearFilters = () => { filters.clear(); setSearch(""); };
  const changeTab = (value: ReportTab) => { setTab(value); setSearch(""); };
  const changeSearch = (event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value);
  const tabs = reportTabs.filter((item) => item.label.toLowerCase().includes(search.trim().toLowerCase()) || ({ jobs: "jobs applications", finance: "earnings expenses", trade: "orders sales", insights: "overview promotions clicks targets" }[item.value]).includes(search.trim().toLowerCase()));
  const visibleTab = tabs.some((item) => item.value === tab) ? tab : tabs[0]?.value;
  const reports = query.data ? [...mapCoreReports(query.data), ...mapInsightReports(query.data)] : [];
  const cards = reports.filter((item) => item.tab === visibleTab);
  const setTargets = () => setTargetModal(query.data?.insights.targets.configured ? "review" : "set");
  const editTargets = () => setTargetModal("review");
  const closeTargets = (open: boolean) => { if (!open) setTargetModal(null); };
  const retry = () => { void query.refetch(); };
  const exportCsv = () => { if (!download.isPending && query.data) download.mutate(); };
  return { filters, query, tab: visibleTab ?? tab, search, tabs, cards, visibleTab,
    changeTab, changeSearch, clearFilters, targetModal, setTargets, editTargets, closeTargets, retry, exportCsv, downloading: download.isPending };
};
export type ReportsController = ReturnType<typeof useReports>;
