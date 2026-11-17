"use client";

import { useMemo, useState } from "react";
import { MoreVertical, Printer, Search } from "lucide-react";

import InsightEmptyState from "@/components/atoms/icons/InsightEmptyState/InsightEmptyState";
import CompactPagination from "@/components/molecules/CompactPagination/CompactPagination";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";
import DataTable from "@/components/organisms/DataTable/DataTable";

import { Transaction, TransactionFilter } from "../../types";
import { transactionColumns } from "./columns";

const PAGE_SIZE = 5;
const filters: { value: TransactionFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "failed", label: "Failed" },
  { value: "successful", label: "Successful" },
];

const TransactionHistory = ({
  data,
  onFund,
  onStatement,
  onViewStatus,
  hasMore = false,
  loadingMore = false,
  onLoadMore,
}: {
  data: Transaction[];
  onFund: () => void;
  onStatement: () => void;
  onViewStatus?: (id: string) => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
}) => {
  const [filter, setFilter] = useState<TransactionFilter>("all");
  const [search, setSearch] = useState("");
  const [year, setYear] = useState("all");
  const years = [...new Set(data.map((item) => item.year).filter(Boolean))].sort((a, b) => b - a);
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () =>
      data.filter(
        (item) =>
          (filter === "all" || item.status === filter) &&
          (year === "all" || item.year === Number(year)) &&
          `${item.id} ${item.shortTransactionId ?? ""} ${item.reference ?? ""} ${item.counterparty} ${item.paymentMethod ?? ""} ${item.paymentService ?? ""} ${item.serviceType ?? ""} ${item.jobId ?? ""} ${item.milestoneId ?? ""} ${item.orderId ?? ""}`.toLowerCase().includes(search.toLowerCase()),
      ),
    [data, filter, search, year],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="bg-white">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[#E9EDEB] px-5 py-5">
        <div>
          <h2 className="font-exo text-xl font-semibold text-[#101828]">Transaction History</h2>
          <p className="mt-1 text-sm text-[#667085]">Transactions for the selected wallet. Search and filters apply to loaded transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onStatement} className="flex items-center gap-2 rounded-lg border border-[#E5E7E6] px-4 py-2 text-xs">
            Download Account Statement <Printer className="size-4" />
          </button>
          <select value={year} onChange={(event) => { setYear(event.target.value); setPage(1); }} aria-label="Transaction year" className="h-9 rounded-lg border border-[#E5E7E6] px-3 text-xs">
            <option value="all">All years</option>{years.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
          <button type="button" aria-label="More transaction options" className="rounded-lg border border-[#E5E7E6] p-2"><MoreVertical className="size-4" /></button>
        </div>
      </header>

      <div className="flex flex-col gap-4 border-b border-[#E9EDEB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <SegmentedTabs options={filters} value={filter} onChange={(nextFilter) => { setFilter(nextFilter); setPage(1); }} ariaLabel="Transaction status" responsive={false} size="compact" />
        <label className="flex h-9 w-full items-center gap-2 rounded-full bg-[#F6F7F9] px-4 sm:max-w-64">
          <Search className="size-4" /><input type="search" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search" className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
        </label>
      </div>

      {pageData.length ? (
        <>
          <DataTable data={pageData} columns={transactionColumns(onViewStatus)} minWidth="min-w-400 [&_th]:whitespace-nowrap [&_td]:whitespace-nowrap" />
          <CompactPagination page={page} totalPages={totalPages} onChange={setPage} />
        </>
      ) : (
        <div className="flex min-h-96 flex-col items-center justify-center px-5 text-center">
          <InsightEmptyState />
          <h3 className="mt-5 font-exo font-semibold">No transactions found</h3>
          <p className="mt-2 text-xs text-[#8A8D8B]">{data.length ? "No loaded transactions match your filters." : "Fund your wallet to start enjoying seamless transactions on Emilist"}</p>
          <button type="button" onClick={onFund} className="mt-5 w-full max-w-80 bg-[#25C269] py-2 text-xs font-semibold text-white">Fund Wallet</button>
        </div>
      )}
      {hasMore && <div className="border-t border-[#E9EDEB] p-4 text-center"><button type="button" disabled={loadingMore} onClick={onLoadMore} className="rounded-lg border border-[#DDEBE1] px-4 py-2 text-sm text-[#18A154] disabled:opacity-50">{loadingMore ? "Loading…" : "Load more transactions"}</button></div>}
    </section>
  );
};

export default TransactionHistory;
