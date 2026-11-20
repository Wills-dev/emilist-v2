"use client";

import { useState } from "react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import PackageIcon from "@/components/atoms/icons/PackageIcon/PackageIcon";
import ListHeader from "@/components/molecules/ListHeader/ListHeader";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { usePagination } from "@/lib/hooks/usePagination";
import { useStore } from "@/store/authStore";
import OrderCard from "../OrderCard/OrderCard";
import { useGetOrders } from "../../hooks/useGetOrders";
import { useBulkCancelOrders } from "../../hooks/useBulkCancelOrders";
import type { OrderDeliveryStatus, OrderSort } from "../../types/order";

const orderSortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Total: high to low", value: "total_high_low" },
  { label: "Total: low to high", value: "total_low_high" },
];

const deliveryStatuses: Array<{ label: string; value: OrderDeliveryStatus }> = [
  { label: "Order confirmed", value: "orderConfirmed" },
  { label: "Out for delivery", value: "outForDelivery" },
  { label: "Delivered", value: "delivered" },
  { label: "Canceled", value: "canceled" },
  { label: "Returned", value: "returned" },
];

const OrdersWrapper = () => {
  const { currentPage, setCurrentPage, next, prev } = usePagination();
  const [sortBy, setSortBy] = useState<OrderSort>("latest");
  const [status, setStatus] = useState<OrderDeliveryStatus | "">("");
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const currentUser = useStore((state) => state.currentUser);
  const bulkCancel = useBulkCancelOrders();
  const query = useGetOrders({
    page: currentPage,
    limit: 10,
    sortBy,
    ...(status ? { status } : {}),
  });
  const orders = query.data?.orders ?? [];
  const totalPages = query.data?.pagination.totalPages ?? 1;

  const changeSort = (value: string) => {
    if (
      value === "latest" ||
      value === "oldest" ||
      value === "total_high_low" ||
      value === "total_low_high"
    ) {
      setSortBy(value);
      setCurrentPage(1);
      setSelectedOrderIds([]);
    }
  };

  const changeStatus = (value: string) => {
    setStatus(
      deliveryStatuses.find((option) => option.value === value)?.value ?? "",
    );
    setCurrentPage(1);
    setSelectedOrderIds([]);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setSelectedOrderIds([]);
  };

  const handlePreviousPage = () => {
    prev();
    setSelectedOrderIds([]);
  };

  const handleNextPage = () => {
    next();
    setSelectedOrderIds([]);
  };

  const handleSelectionChange = (orderId: string, selected: boolean) => {
    setSelectedOrderIds((current) =>
      selected
        ? current.includes(orderId)
          ? current
          : [...current, orderId]
        : current.filter((id) => id !== orderId),
    );
  };

  const handleBulkCancel = async () => {
    if (selectedOrderIds.length === 0 || bulkCancel.isPending) return;
    try {
      const results = await bulkCancel.mutateAsync(selectedOrderIds);
      setSelectedOrderIds(results.filter((result) => !result.success).map((result) => result.orderId));
    } catch {
      return;
    }
  };

  return (
    <Container variant="small">
      <div className="space-y-10 pt-6 pb-15">
        <DashboardTitle title="Orders" icon={<PackageIcon />} />
        <BackButton isDashboard />
        <div className="space-y-5 rounded-[12.75px] border border-[#F1F2F9] bg-linear-to-b from-white to-[#FBFBFB] px-5 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#F1F2F9] pb-4">
            <ListHeader
              title={`${query.data?.pagination.total ?? 0} Orders`}
              options={orderSortOptions}
              value={sortBy}
              onSortChange={changeSort}
              ariaLabel="Sort orders"
            />
            <label className="flex items-center gap-2 text-xs text-[#707471]">
              Delivery status
              <select
                value={status}
                onChange={(event) => changeStatus(event.target.value)}
                className="h-9 rounded-lg border border-[#F1F2F9] bg-white px-2 text-xs"
              >
                <option value="">All statuses</option>
                {deliveryStatuses.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {selectedOrderIds.length > 0 && (
            <div className="flex items-center justify-between gap-3 rounded-lg bg-[#F0FDF5] px-3 py-2">
              <p className="text-xs text-[#303632]">
                {selectedOrderIds.length} paid, confirmed{" "}
                {selectedOrderIds.length === 1 ? "order" : "orders"} selected
              </p>
              <button
                type="button"
                onClick={() => void handleBulkCancel()}
                disabled={bulkCancel.isPending}
                className="text-xs font-semibold text-[#FF5D7A] disabled:opacity-50"
              >
                {bulkCancel.isPending ? "Canceling…" : "Cancel selected"}
              </button>
            </div>
          )}

          {!isAuthInitialized ? (
            <p className="py-8 text-center text-sm text-[#737774]">
              Loading orders…
            </p>
          ) : !currentUser ? (
            <p className="py-8 text-center text-sm text-[#737774]">
              Sign in to view your orders.
            </p>
          ) : query.isLoading ? (
            <p className="py-8 text-center text-sm text-[#737774]">
              Loading orders…
            </p>
          ) : query.isError ? (
            <div className="space-y-3 py-8 text-center">
              <p role="alert" className="text-sm text-[#737774]">
                Unable to load your orders.
              </p>
              <button
                type="button"
                onClick={() => void query.refetch()}
                className="text-sm font-medium text-[#25C269]"
              >
                Try again
              </button>
            </div>
          ) : orders.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#737774]">
              No orders found.
            </p>
          ) : (
            <>
              <div className="space-y-5">
                {orders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    isLast={index === orders.length - 1}
                    selected={selectedOrderIds.includes(order._id)}
                    onSelectionChange={handleSelectionChange}
                  />
                ))}
              </div>
              {query.data?.pagination.totalPages &&
              query.data.pagination.totalPages > 1 ? (
                <PaginationPanel
                  page={currentPage}
                  totalPages={totalPages}
                  hasMore={query.data.pagination.hasNext}
                  onPrev={handlePreviousPage}
                  onNext={handleNextPage}
                  onPageChange={handlePageChange}
                  variant="centered"
                />
              ) : null}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrdersWrapper;
