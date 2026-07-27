"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import PackageIcon from "@/components/atoms/icons/PackageIcon";
import { sortOptions } from "@/lib/constants/filter";
import OrderCard from "../OrderCard/OrderCard";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { usePagination } from "@/lib/hooks/usePagination";
import ListHeader from "@/components/molecules/ListHeader/ListHeader";

const OrdersWrapper = () => {
  const { currentPage, setCurrentPage, next, prev } = usePagination();

  return (
    <Container variant="small">
      <div className="pt-6 pb-15 space-y-10">
        <DashboardTitle title="Orders" icon={<PackageIcon />} />
        <BackButton isDashboard />
        <div className="bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] border border-[#F1F2F9] rounded-[12.75px] space-y-5 px-5 py-6">
          <ListHeader
            title="3 Orders"
            options={sortOptions}
            ariaLabel="Sort orders"
          />
          <div className="space-y-3.5">
            <OrderCard trackingStatus="confirmed" />
            <OrderCard trackingStatus="out_for_delivery" />
            <OrderCard trackingStatus="delivered" isLast />
          </div>
          <PaginationPanel
            page={currentPage}
            totalPages={3}
            onPrev={prev}
            onNext={next}
            onPageChange={setCurrentPage}
            variant="centered"
          />
        </div>
      </div>
    </Container>
  );
};

export default OrdersWrapper;
