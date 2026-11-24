"use client";

import { useState } from "react";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { usePagination } from "@/lib/hooks/usePagination";
import { useStore } from "@/store/authStore";
import { useSales } from "../../hooks/useSales";
import type { OrderSort } from "../../types/order";
import OrderListPanel from "../OrderListPanel/OrderListPanel";
import OrderListState from "../OrderListState/OrderListState";
import SaleCard from "../SaleCard/SaleCard";

export default function SalesWrapper() {
  const { currentPage, setCurrentPage, next, prev } = usePagination();
  const [sortBy, setSortBy] = useState<OrderSort>("latest");
  const userId = useStore((state) => state.currentUser?._id);
  const initialized = useStore((state) => state.isAuthInitialized);
  const query = useSales({ page: currentPage, limit: 10, sortBy });
  const sales = query.data?.sales ?? [];
  const pagination = query.data?.pagination;

  return (
    <OrderListPanel title="Sales" total={pagination?.total ?? 0} sortBy={sortBy} onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}>
      <OrderListState label="sales" loading={!initialized || Boolean(userId && query.isPending)} signedIn={Boolean(userId)} error={query.isError} empty={!sales.length} onRetry={() => void query.refetch()}>
        <div>{sales.map((sale) => <SaleCard key={sale.saleId} sale={sale} />)}</div>
        {pagination && pagination.totalPages > 1 && (
          <PaginationPanel page={currentPage} totalPages={pagination.totalPages} hasMore={pagination.hasNextPage ?? pagination.hasNext ?? currentPage < pagination.totalPages} onPrev={prev} onNext={next} onPageChange={setCurrentPage} variant="centered" />
        )}
      </OrderListState>
    </OrderListPanel>
  );
}
