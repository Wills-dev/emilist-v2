"use client";

import { useMemo, useState } from "react";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import DashboardTitle from "@/components/atoms/DashboardTitle/DashboardTitle";
import Clipboard from "@/components/atoms/icons/Clipboard";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import ListHeader from "@/components/molecules/ListHeader/ListHeader";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import { sortOptions } from "@/lib/constants/filter";
import { usePagination } from "@/lib/hooks/usePagination";
import { useStore } from "@/store/authStore";
import ListedCard from "../ListedCard/ListedCard";
import ListedCardSkeleton from "../ListedCard/ListedCardSkeleton";
import { useGetOtherSellerMaterials } from "../../hooks/useGetOtherSellerMaterials";

const PAGE_LIMIT = 10;

const ListedMaterialsWrapper = () => {
  const currentUserId = useStore((state) => state.currentUser?._id);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const [sortBy, setSortBy] = useState("");
  const { currentPage, setCurrentPage, next, prev } = usePagination();
  const query = useGetOtherSellerMaterials({
    sellerId: currentUserId,
    page: currentPage,
    limit: PAGE_LIMIT,
  });
  const materials = useMemo(() => {
    const products = [...(query.data?.products ?? [])];

    return products.sort((first, second) => {
      if (sortBy === "oldest") {
        return Date.parse(first.createdAt) - Date.parse(second.createdAt);
      }
      if (sortBy === "asc") return first.price - second.price;
      if (sortBy === "desc") return second.price - first.price;
      if (sortBy === "highest_rated" || sortBy === "lowest_rated") {
        const rating = (product: typeof first) =>
          product.reviews.length
            ? product.reviews.reduce(
                (total, review) => total + review.rating,
                0,
              ) / product.reviews.length
            : 0;
        return sortBy === "highest_rated"
          ? rating(second) - rating(first)
          : rating(first) - rating(second);
      }
      return Date.parse(second.createdAt) - Date.parse(first.createdAt);
    });
  }, [query.data?.products, sortBy]);
  const isLoading =
    !isAuthInitialized || query.isLoading || query.isFetching;
  const totalProducts = query.data?.totalProducts ?? 0;
  const totalPages = query.data?.totalPages ?? 0;

  return (
    <Container variant="small">
      <div className="pt-6 pb-15 space-y-10">
        <DashboardTitle title="Listed Items" icon={<Clipboard />} />
        <BackButton isDashboard />
        <div className="bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB] border border-[#F1F2F9] rounded-[12.75px] space-y-5 px-5 py-6">
          <ListHeader
            title={`${totalProducts} Listed ${
              totalProducts === 1 ? "Item" : "Items"
            }`}
            options={sortOptions}
            value={sortBy}
            onSortChange={setSortBy}
            ariaLabel="Sort listed items"
          />

          {isLoading ? (
            <div className="space-y-3.5">
              {Array.from({ length: 3 }, (_, index) => (
                <ListedCardSkeleton key={index} isLast={index === 2} />
              ))}
            </div>
          ) : query.isError ? (
            <EmptyState
              title="Unable to load listed materials"
              description="Please refresh the page and try again."
              className="min-h-56"
            />
          ) : materials.length === 0 ? (
            <EmptyState
              title="No listed materials yet"
              description="Materials you list for sale will appear here."
              className="min-h-56"
            />
          ) : (
            <div className="space-y-3.5">
              {materials.map((material, index) => (
                <ListedCard
                  key={material._id}
                  material={material}
                  isLast={index === materials.length - 1}
                />
              ))}
            </div>
          )}

          {!isLoading && !query.isError && totalPages > 1 && (
            <PaginationPanel
              page={currentPage}
              totalPages={totalPages}
              onPrev={prev}
              onNext={next}
              onPageChange={setCurrentPage}
              variant="centered"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default ListedMaterialsWrapper;
