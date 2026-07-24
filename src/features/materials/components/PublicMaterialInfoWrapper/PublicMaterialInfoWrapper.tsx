"use client";

import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";
import MaterialInfoSkeleton from "../MaterialInfoWrapper/MaterialInfoSkeleton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PublicSellersOtherMaterials from "../PublicSellersOtherMaterials/PublicSellersOtherMaterials";

import { useGetMaterialInfo } from "../../hooks/useGetMaterialInfo";
import { useGetMaterialReviews } from "../../hooks/useGetMaterialReviews";
import { routes } from "@/lib/helpers/routes";

const PublicMaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  const { data, isLoading } = useGetMaterialInfo(materialId);
  const { data: reviews, isLoading: isFetching } = useGetMaterialReviews({
    materialId,
    limit: 3,
  });

  return (
    <>
      <div className="pt-6 pb-15">
        <Container variant="center">
          {isLoading || isFetching ? (
            <MaterialInfoSkeleton variant="public" />
          ) : !data ? (
            <EmptyState
              title="Material not found"
              description="This material may have been removed or is no longer available."
            />
          ) : (
            <div className="w-full flex justify-between flex-wrap  gap-6">
              <div className="max-w-202 w-full">
                <MaterialMainInfo material={data} />
              </div>
              <div className="max-w-96.75 w-full">
                <MaterialReviewSummary
                  reviewLink={routes.marketplace.materialInfoReviews(
                    materialId,
                  )}
                  reviews={reviews}
                  variant="primary"
                />
              </div>
            </div>
          )}
        </Container>
      </div>
      <PublicSellersOtherMaterials />
    </>
  );
};

export default PublicMaterialInfoWrapper;
