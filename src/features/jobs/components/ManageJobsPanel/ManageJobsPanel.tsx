"use client";

import { useMemo, useState } from "react";

import { useStore } from "@/store/authStore";
import SubscriptionPlansModal from "@/features/settings/components/SubscriptionPlansModal/SubscriptionPlansModal";
import { useGetListedJobs } from "../../hooks/useGetListedJobs";
import { mapListedJobRow } from "../../helpers/manageJobs";
import {
  dummyActiveJobs,
  dummyOverdueJobs,
  dummyPausedJobs,
} from "../../constants/manageJobsDummy";
import type { ManageJobsTab } from "../../types/manageJobs";
import LeadsCategoryToggle, {
  LeadsCategory,
} from "../LeadsPanel/LeadsCategoryToggle";
import LeadsPanel from "../LeadsPanel/LeadsPanel";
import ManageJobsHeader from "../ManageJobsHeader/ManageJobsHeader";
import ManageJobsTable from "./ManageJobsTable";
import { activeJobsColumns } from "./activeJobsColumns";
import { listedJobsColumns } from "./listedJobsColumns";
import { overdueJobsColumns } from "./overdueJobsColumns";
import { pausedJobsColumns } from "./pausedJobsColumns";

const PAGE_LIMIT = 10;

const filterBySearch = <T extends { jobTitle: string }>(
  rows: T[],
  search: string,
) => {
  const normalized = search.trim().toLowerCase();
  if (!normalized) return rows;
  return rows.filter((row) => row.jobTitle.toLowerCase().includes(normalized));
};

const paginate = <T,>(rows: T[], page: number, pageSize: number) => ({
  data: rows.slice((page - 1) * pageSize, page * pageSize),
  totalPages: Math.max(1, Math.ceil(rows.length / pageSize)),
});

const ManageJobsPanel = () => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const [tab, setTab] = useState<ManageJobsTab>("listed");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [leadsCategory, setLeadsCategory] = useState<LeadsCategory>("jobs");
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);

  const handleTabChange = (nextTab: ManageJobsTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (nextSearch: string) => {
    setSearch(nextSearch);
    setPage(1);
  };

  const isSearching = Boolean(search.trim());
  const emptySearchProps = isSearching
    ? {
        emptyTitle: "No jobs match your search",
        emptyDescription:
          "Try a different search term or clear the search box.",
      }
    : undefined;

  const listedQuery = useGetListedJobs({
    query: { search: search.trim() || undefined, limit: PAGE_LIMIT },
    page,
    enabled: tab === "listed",
  });

  const listedRows = useMemo(
    () =>
      (listedQuery.data?.jobs ?? []).map((job) =>
        mapListedJobRow(job, currentUserId),
      ),
    [listedQuery.data?.jobs, currentUserId],
  );

  const overdue = useMemo(
    () => paginate(filterBySearch(dummyOverdueJobs, search), page, PAGE_LIMIT),
    [search, page],
  );
  const paused = useMemo(
    () => paginate(filterBySearch(dummyPausedJobs, search), page, PAGE_LIMIT),
    [search, page],
  );
  const active = useMemo(
    () => paginate(filterBySearch(dummyActiveJobs, search), page, PAGE_LIMIT),
    [search, page],
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
          data={overdue.data}
          columns={overdueJobsColumns}
          page={page}
          totalPages={overdue.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "paused" && (
        <ManageJobsTable
          data={paused.data}
          columns={pausedJobsColumns}
          page={page}
          totalPages={paused.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "active" && (
        <ManageJobsTable
          data={active.data}
          columns={activeJobsColumns}
          page={page}
          totalPages={active.totalPages}
          onPrev={() => setPage((current) => Math.max(1, current - 1))}
          onNext={() => setPage((current) => current + 1)}
          onPageChange={setPage}
          {...emptySearchProps}
        />
      )}

      {tab === "completed" && (
        <ManageJobsTable
          data={[]}
          columns={listedJobsColumns}
          page={1}
          onPrev={() => {}}
          onNext={() => {}}
          onPageChange={() => {}}
          {...emptySearchProps}
        />
      )}

      {tab === "leads" && (
        <LeadsPanel
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
