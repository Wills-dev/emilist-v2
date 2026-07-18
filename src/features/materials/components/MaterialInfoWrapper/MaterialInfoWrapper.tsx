"use client";

import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";
import { useGetMaterialInfo } from "../../hooks/useGetMaterialInfo";
import OtherSellersMaterials from "../OtherSellersMaterials/OtherSellersMaterials";
import MaterialInfoSkeleton from "./MaterialInfoSkeleton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";

const MaterialInfoWrapper = ({
  materialId,
  reviewLink,
}: {
  materialId: string;
  reviewLink: string;
}) => {
  const { data, isLoading } = useGetMaterialInfo(materialId);

  console.log("data", data);

  return (
    <>
      <div className="pt-6 pb-15">
        <Container>
          {isLoading ? (
            <MaterialInfoSkeleton />
          ) : !data ? (
            <EmptyState
              title="Material not found"
              description="This material may have been removed or is no longer available."
            />
          ) : (
            <div className="w-full flex justify-between flex-wrap gap-6">
              <div className="max-w-197.75 w-full">
                <MaterialMainInfo material={data} />
              </div>
              <div className="max-w-96.75 w-full">
                <MaterialReviewSummary reviewLink={reviewLink} />
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
