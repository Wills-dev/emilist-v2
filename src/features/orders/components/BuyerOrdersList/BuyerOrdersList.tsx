"use client";

import { useState } from "react";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { usePagination } from "@/lib/hooks/usePagination";
import { useStore } from "@/store/authStore";
import { useGetOrders } from "../../hooks/useGetOrders";
import type { OrderSort } from "../../types/order";
import OrderCard from "../OrderCard/OrderCard";
import OrderListPanel from "../OrderListPanel/OrderListPanel";
import OrderListState from "../OrderListState/OrderListState";

export default function BuyerOrdersList() {
  const { currentPage, setCurrentPage, next, prev } = usePagination();
  const [sortBy, setSortBy] = useState<OrderSort>("latest");
  const initialized = useStore((state) => state.isAuthInitialized);
  const userId = useStore((state) => state.currentUser?._id);
  const query = useGetOrders({ page: currentPage, limit: 10, sortBy });
  const orders = query.data?.orders ?? [];
  const pagination = query.data?.pagination;

  return (
    <OrderListPanel title="Orders" total={pagination?.total ?? 0} sortBy={sortBy} onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}>
      <OrderListState label="orders" loading={!initialized || Boolean(userId && query.isPending)} signedIn={Boolean(userId)} error={query.isError} empty={!orders.length} onRetry={() => void query.refetch()}>
        <div className="space-y-3.5">
          {orders.map((order, index) => <OrderCard key={order._id} order={order} isLast={index === orders.length - 1} />)}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <PaginationPanel page={currentPage} totalPages={pagination.totalPages} hasMore={pagination.hasNext} onPrev={prev} onNext={next} onPageChange={setCurrentPage} variant="centered" />
        )}
      </OrderListState>
    </OrderListPanel>
  );
}

