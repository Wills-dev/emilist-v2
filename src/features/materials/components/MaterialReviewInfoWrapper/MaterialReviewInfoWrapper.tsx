"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import MaterialReviewInfoSkeleton from "./MaterialReviewInfoSkeleton";
import MaterialReviewModal from "../MaterialReviewModal/MaterialReviewModal";

import { useStore } from "@/store/authStore";
import { useGetMaterialReviews } from "../../hooks/useGetMaterialReviews";
import { useGetMaterialInfo } from "../../hooks/useGetMaterialInfo";

const MaterialReviewInfoWrapper = ({ materialId }: { materialId: string }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const pathname = usePathname();
  const isDashboardMaterialPage = pathname.startsWith("/dashboard");
  const currentUser = useStore((state) => state.currentUser);
  const { data: material } = useGetMaterialInfo(materialId);
  const {
    data,
    isLoading,
    currentPage,
    next,
    prev,
    handleSearch,
    setSearch,
    isFetching,
    submittedQuery,
  } = useGetMaterialReviews({ materialId, limit: 10 });

  if (isLoading && !submittedQuery) {
    return (
      <div className="pt-6 pb-15">
        <Container variant={isDashboardMaterialPage ? "small" : "center"}>
          <MaterialReviewInfoSkeleton
            variant={isDashboardMaterialPage ? "dashboard" : "public"}
          />
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-15">
      <Container variant={isDashboardMaterialPage ? "small" : "center"}>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-4">
              <BackButton />
              <FlagActionBtn onClick={() => {}} actionTitle="Flag merchant" />
            </div>
            <div className="flex items-center justify-between  flex-wrap gap-4">
              <div
                className={
                  isDashboardMaterialPage
                    ? "max-w-160 w-full min-w-72.5"
                    : "max-w-197.75 w-full min-w-72.5"
                }
              >
                <ReviewBreakdown
                  totalReviews={data?.numberOfRatings ?? 0}
                  reviewBreakdown={data?.ratingDistribution}
                  variant={isDashboardMaterialPage ? "tertiary" : "primary"}
                />
              </div>
              <div
                className={`w-full min-w-72.5 space-y-6 ${isDashboardMaterialPage ? "max-w-109.75" : "max-w-96.75"}`}
              >
                <FilterSectionWrapper
                  variant={isDashboardMaterialPage ? "tertiary" : "primary"}
                >
                  <FilterTitle title="Merchant profile" />
                  <UserRatingCard
                    id={""}
                    imgUrl={""}
                    fullName={"Arthur Phillips"}
                    rating={4}
                  />
                </FilterSectionWrapper>
                <FilterSectionWrapper
                  variant={isDashboardMaterialPage ? "tertiary" : "primary"}
                >
                  <FilterTitle title="55,000  Items sold" />
                </FilterSectionWrapper>
                <RatingSummary
                  title="Merchant Rating"
                  rating={data?.averageRating ?? 0}
                  variant={isDashboardMaterialPage ? "tertiary" : "primary"}
                />
              </div>
            </div>
          </div>
          <CommentWrapper
            totalComments={data?.numberOfRatings ?? 0}
            variant="large"
            onSubmit={handleSearch}
            setSearch={setSearch}
            reviews={data?.reviews ?? []}
            pagination={{
              page: data?.pagination?.page ?? currentPage,
              hasMore: data?.pagination?.hasMore ?? false,
              onNext: next,
              onPrev: prev,
            }}
            onAddComment={() => setIsReviewModalOpen(true)}
            canAddComment={material?.product?.userId?._id !== currentUser?._id}
            sectionVariant={isDashboardMaterialPage ? "tertiary" : "primary"}
            isLoading={isFetching}
          />
        </div>
      </Container>
      <MaterialReviewModal
        productId={materialId}
        open={isReviewModalOpen}
        onClose={setIsReviewModalOpen}
      />
    </div>
  );
};

export default MaterialReviewInfoWrapper;
