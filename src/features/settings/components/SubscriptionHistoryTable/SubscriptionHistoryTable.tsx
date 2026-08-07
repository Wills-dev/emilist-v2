"use client";

import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import DataTable from "@/components/organisms/DataTable/DataTable";
import { usePagination } from "@/lib/hooks/usePagination";
import { SubscriptionHistoryItem } from "../../types/subscription";
import { subscriptionHistoryColumns } from "./columns";

const PAGE_SIZE = 3;

const SubscriptionHistoryTable = ({
  data,
}: {
  data: SubscriptionHistoryItem[];
}) => {
  const pagination = usePagination();
  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const pageData = data.slice(
    (pagination.currentPage - 1) * PAGE_SIZE,
    pagination.currentPage * PAGE_SIZE,
  );
  return (
    <section className="bg-white p-4 max-sm:p-2">
      <DataTable data={pageData} columns={subscriptionHistoryColumns} />
      <div className="w-full pt-1">
        <PaginationPanel
          page={pagination.currentPage}
          totalPages={totalPages}
          onPrev={pagination.prev}
          onNext={pagination.next}
          onPageChange={pagination.setCurrentPage}
        />
      </div>
    </section>
  );
};

export default SubscriptionHistoryTable;
