"use client";

import Container from "@/components/atoms/Container/Container";
import MaterialMainInfo from "../MaterialMainInfo/MaterialMainInfo";
import MaterialReviewSummary from "../MaterialReviewSummary/MaterialReviewSummary";
import { useGetMaterialInfo } from "../../hooks/useGetMaterialInfo";
import OtherSellersMaterials from "../OtherSellersMaterials/OtherSellersMaterials";
import MaterialInfoSkeleton from "./MaterialInfoSkeleton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { useGetMaterialReviews } from "../../hooks/useGetMaterialReviews";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/helpers/routes";

const MaterialInfoWrapper = ({ materialId }: { materialId: string }) => {
  const pathname = usePathname();
  const isDashboardMaterialPage = pathname.startsWith("/dashboard");
  const reviewLink = isDashboardMaterialPage
    ? routes.dashboardLinks.materialInfoReviews(materialId)
    : routes.marketplace.materialInfoReviews(materialId);
  const { data, isLoading } = useGetMaterialInfo(materialId);
  const { data: reviews, isLoading: isFetching } = useGetMaterialReviews({
    materialId,
    limit: 3,
  });

  return (
    <>
      <div className="pt-6 pb-15">
        <Container variant={isDashboardMaterialPage ? "small" : "center"}>
          {isLoading || isFetching ? (
            <MaterialInfoSkeleton
              variant={isDashboardMaterialPage ? "dashboard" : "public"}
            />
          ) : !data ? (
            <EmptyState
              title="Material not found"
              description="This material may have been removed or is no longer available."
            />
          ) : (
            <div
              className={`w-full flex justify-between flex-wrap ${isDashboardMaterialPage ? "gap-2" : "gap-6"}`}
            >
              <div
                className={
                  isDashboardMaterialPage
                    ? "max-w-202 w-full"
                    : "max-w-197.75 w-full"
                }
              >
                <MaterialMainInfo material={data} />
              </div>
              <div
                className={
                  isDashboardMaterialPage
                    ? "max-w-68 w-full"
                    : "max-w-96.75 w-full"
                }
              >
                <MaterialReviewSummary
                  reviewLink={reviewLink}
                  reviews={reviews}
                  variant={isDashboardMaterialPage ? "tertiary" : "primary"}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
      <OtherSellersMaterials variant="dashboard" />
    </>
  );
};

export default MaterialInfoWrapper;
