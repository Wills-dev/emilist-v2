"use client";

import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";
import OtherSellersMaterials from "../OtherSellersMaterials/OtherSellersMaterials";
import MaterialInfoSkeleton from "./MaterialInfoSkeleton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";

import { routes } from "@/lib/helpers/routes";
import { useGetMaterialInfo } from "../../hooks/useGetMaterialInfo";

const MaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  const { data, isLoading } = useGetMaterialInfo(materialId);

  return (
    <>
      <div className="pt-6 pb-15">
        <Container variant="small">
          {isLoading ? (
            <MaterialInfoSkeleton variant="dashboard" />
          ) : !data ? (
            <EmptyState
              title="Material not found"
              description="This material may have been removed or is no longer available."
            />
          ) : (
            <div className={`w-full flex justify-between flex-wrap gap-2`}>
              <div className="max-w-182.25 w-full">
                <MaterialMainInfo material={data} />
              </div>
              <div className="max-w-87.75 w-full">
                <MaterialReviewSummary
                  materialId={materialId}
                  reviewLink={routes.dashboardLinks.materialInfoReviews(
                    materialId,
                  )}
                  variant="tertiary"
                />
              </div>
            </div>
          )}
        </Container>
      </div>
      <OtherSellersMaterials />
    </>
  );
};

export default MaterialInfoWrapper;
