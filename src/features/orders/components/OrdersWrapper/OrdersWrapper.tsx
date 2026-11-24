"use client";

import { useState } from "react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import PackageIcon from "@/components/atoms/icons/PackageIcon/PackageIcon";
import Select from "@/components/atoms/Select/Select";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { usePagination } from "@/lib/hooks/usePagination";
import { useStore } from "@/store/authStore";
import OrderCard from "../OrderCard/OrderCard";
import OrderCardSkeleton from "../OrderCardSkeleton/OrderCardSkeleton";
import { useGetOrders } from "../../hooks/useGetOrders";
import type { OrderSort } from "../../types/order";

const orderSortOptions = [
  { label: "Latest", value: "latest" },
  { label: "Oldest", value: "oldest" },
  { label: "Price: High to Low", value: "total_high_low" },
  { label: "Price: Low to High", value: "total_low_high" },
];

const OrdersWrapper = () => {
  const { currentPage, setCurrentPage, next, prev } = usePagination();
  const [sortBy, setSortBy] = useState<OrderSort | "">("");
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const currentUser = useStore((state) => state.currentUser);
  const query = useGetOrders({
    page: currentPage,
    limit: 10,
    sortBy: sortBy || "latest",
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
    }
  };

  return (
    <Container variant="small">
      <div className="space-y-10 pt-6 pb-15">
        <DashboardTitle title="Orders" icon={<PackageIcon />} />
        <BackButton isDashboard />
        <div className="space-y-5 rounded-[12.75px] border border-[#F1F2F9] bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] px-5 py-6">
          <div className="flex items-center justify-between gap-4 border-b border-[#F1F2F9] pb-4">
            <p className="font-exo text-sm font-semibold">
              {query.data?.pagination.total ?? 0} Orders
            </p>
            <div className="w-full max-w-37.5">
              <Select
                options={orderSortOptions}
                value={sortBy}
                onChange={(event) => changeSort(event.target.value)}
                variant="secondary"
                fontSize="14px"
                placeholder="Sort by"
                aria-label="Sort orders"
              />
            </div>
          </div>

          {!isAuthInitialized || (currentUser && query.isLoading) ? (
            <div
              role="status"
              aria-label="Loading orders"
              aria-busy="true"
              className="space-y-3.5"
            >
              {[0, 1, 2].map((item) => (
                <OrderCardSkeleton key={item} isLast={item === 2} />
              ))}
            </div>
          ) : !currentUser ? (
            <p className="py-8 text-center text-sm text-[#737774]">
              Sign in to view your orders.
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
              <div className="space-y-3.5">
                {orders.map((order, index) => (
                  <OrderCard
                    key={order._id}
                    order={order}
                    isLast={index === orders.length - 1}
                  />
                ))}
              </div>
              {totalPages > 1 && (
                <PaginationPanel
                  page={currentPage}
                  totalPages={totalPages}
                  hasMore={query.data?.pagination.hasNext ?? false}
                  onPrev={prev}
                  onNext={next}
                  onPageChange={setCurrentPage}
                  variant="centered"
                />
              )}
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

export default OrdersWrapper;
