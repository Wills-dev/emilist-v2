"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { useDebouncedValue } from "@/lib/hooks/useDebouncedValue";
import { useStore } from "@/store/authStore";
import SubscriptionPlansModal from "@/features/settings/components/SubscriptionPlansModal/SubscriptionPlansModal";
import { useGetListedJobs } from "../../hooks/useGetListedJobs";
import { useGetJobsByStatus } from "../../hooks/useGetJobsByStatus";
import {
  mapListedJobRow,
  mapOverdueJobRow,
  mapPausedJobRow,
  mapActiveJobRow,
  mapCompletedJobRow,
  isListedJobStatus,
  normalizeJobStatus,
  resolveManageJobsTab,
} from "../../helpers/manageJobs";
import type { ManageJobsTab } from "../../types/manageJobs";
import LeadsCategoryToggle, {
  LeadsCategory,
} from "../LeadsPanel/LeadsCategoryToggle/LeadsCategoryToggle";
import LeadsPanel from "../LeadsPanel/LeadsPanel";
import ManageJobsHeader from "../ManageJobsHeader/ManageJobsHeader";
import ManageJobsTable from "./ManageJobsTable/ManageJobsTable";
import { activeJobsColumns } from "./activeJobsColumns";
import { completedJobsColumns } from "./completedJobsColumns";
import { listedJobsColumns } from "./listedJobsColumns";
import { overdueJobsColumns } from "./overdueJobsColumns";
import { pausedJobsColumns } from "./pausedJobsColumns";

const PAGE_LIMIT = 10;

const ManageJobsPanel = () => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab = resolveManageJobsTab(searchParams.get("tab"));
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [leadsCategory, setLeadsCategory] = useState<LeadsCategory>("jobs");
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const handleTabChange = (nextTab: ManageJobsTab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTab === "listed") params.delete("tab");
    else params.set("tab", nextTab);
    router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
      scroll: false,
    });
    setPage(1);
  };

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  const debouncedSearch = useDebouncedValue(search, 400);

  const isSearching = Boolean(debouncedSearch.trim());
  const emptySearchProps = isSearching
    ? {
        emptyTitle: "No jobs match your search",
        emptyDescription:
          "Try a different search term or clear the search box.",
      }
    : undefined;

  const listedQuery = useGetListedJobs({
    query: { search: debouncedSearch.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "listed",
  });

  const listedRows = useMemo(
    () =>
      (listedQuery.data?.jobs ?? [])
        .filter((job) => isListedJobStatus(job.status))
        .map((job) => mapListedJobRow(job, currentUserId)),
    [listedQuery.data?.jobs, currentUserId],
  );

  const overdueQuery = useGetJobsByStatus({
    status: "overdue",
    query: { search: debouncedSearch.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "overdue",
  });
  const overdueRows = useMemo(
    () => (overdueQuery.data?.jobs ?? []).map(mapOverdueJobRow),
    [overdueQuery.data?.jobs],
  );

  const pausedQuery = useGetJobsByStatus({
    status: "paused",
    query: { search: debouncedSearch.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "paused",
  });
  const pausedRows = useMemo(
    () => (pausedQuery.data?.jobs ?? []).map(mapPausedJobRow),
    [pausedQuery.data?.jobs],
  );

  const activeQuery = useGetJobsByStatus({
    status: "active",
    query: { search: debouncedSearch.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "active",
  });
  const activeRows = useMemo(
    () => (activeQuery.data?.jobs ?? []).map(mapActiveJobRow),
    [activeQuery.data?.jobs],
  );

  const completedQuery = useGetJobsByStatus({
    status: "completed",
    query: { search: debouncedSearch.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "completed",
  });
  const completedRows = useMemo(
    () => (completedQuery.data?.jobs ?? []).map(mapCompletedJobRow),
    [completedQuery.data?.jobs],
  );

  return (
    <div className="overflow-hidden rounded-xl border border-[#F1F2F9]">
      <div
        className={
          tab === "leads"
            ? "bg-linear-to-b from-[#25C269] to-[#125C32]"
            : undefined
        }
      >
        <ManageJobsHeader
          tab={tab}
          search={search}
          onTabChange={handleTabChange}
          onSearchChange={handleSearchChange}
        />

        {tab === "leads" && (
          <div className="px-5 py-5">
            <LeadsCategoryToggle
              value={leadsCategory}
              onChange={setLeadsCategory}
            />
          </div>
        )}
      </div>

      {tab === "listed" && (
        <ManageJobsTable
          data={listedRows}
          columns={listedJobsColumns}
          rowClassName={(row) =>
            normalizeJobStatus(row.statusRaw) === "rejected"
              ? "bg-[#F2F3F4] [&_td]:text-[#989D9A] [&_td_*]:text-[#989D9A]"
              : "odd:bg-[#FBFCFB] even:bg-white"
          }
          isLoading={listedQuery.isLoading}
          isError={listedQuery.isError}
          page={page}
          totalPages={listedQuery.data?.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "overdue" && (
        <ManageJobsTable
          data={overdueRows}
          columns={overdueJobsColumns}
          isLoading={overdueQuery.isLoading}
          isError={overdueQuery.isError}
          page={page}
          totalPages={overdueQuery.data?.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "paused" && (
        <ManageJobsTable
          data={pausedRows}
          columns={pausedJobsColumns}
          isLoading={pausedQuery.isLoading}
          isError={pausedQuery.isError}
          page={page}
          totalPages={pausedQuery.data?.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "active" && (
        <ManageJobsTable
          data={activeRows}
          columns={activeJobsColumns}
          isLoading={activeQuery.isLoading}
          isError={activeQuery.isError}
          page={page}
          totalPages={activeQuery.data?.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "completed" && (
        <ManageJobsTable
          data={completedRows}
          columns={completedJobsColumns}
          isLoading={completedQuery.isLoading}
          isError={completedQuery.isError}
          page={page}
          totalPages={completedQuery.data?.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "leads" && (
        <LeadsPanel
          page={page}
          onPageChange={setPage}
          category={leadsCategory}
          search={search}
          onSubscribe={() => setSubscribeModalOpen(true)}
        />
      )}

      {subscribeModalOpen && (
        <SubscriptionPlansModal
          open={subscribeModalOpen}
          onClose={setSubscribeModalOpen}
        />
      )}
    </div>
  );
};

export default ManageJobsPanel;
