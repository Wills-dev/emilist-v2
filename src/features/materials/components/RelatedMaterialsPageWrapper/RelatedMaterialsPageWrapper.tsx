"use client";

import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import SellersMaterialCardWrap from "../SellersMaterialCardWrap/SellersMaterialCardWrap";
import {
  useInfiniteSellerMaterials,
  useInfiniteSimilarMaterials,
} from "../../hooks/useInfiniteRelatedMaterials";

const RelatedMaterialsPageWrapper = ({
  resourceId,
  type,
  variant,
  sellerName,
}: {
  resourceId: string;
  type: "similar" | "seller";
  variant: "public" | "dashboard";
  sellerName?: string;
}) => {
  const sellerQuery = useInfiniteSellerMaterials(
    type === "seller" ? resourceId : undefined,
  );
  const similarQuery = useInfiniteSimilarMaterials(
    type === "similar" ? resourceId : undefined,
  );
  const query = type === "seller" ? sellerQuery : similarQuery;
  const materials =
    type === "seller"
      ? sellerQuery.data?.pages.flatMap((page) => page.products) ?? []
      : similarQuery.data?.pages.flatMap((page) => page.similarProducts) ?? [];

  return (
    <Container variant={variant === "dashboard" ? "small" : "center"}>
      <div className="space-y-8 py-10">
        <div className="space-y-4">
          <BackButton />
          <div>
            <h1 className="font-exo text-2xl font-semibold sm:text-[32px]">
              {type === "seller"
                ? `Other products from ${sellerName || "this seller"}`
                : "Similar materials"}
            </h1>
            <p className="mt-2 text-sm text-[#5E625F]">
              {type === "seller"
                ? "Explore more products available from this merchant."
                : "Explore more materials related to this product."}
            </p>
          </div>
        </div>
        <SellersMaterialCardWrap
          materials={materials}
          isLoading={query.isLoading}
          hasNextPage={Boolean(query.hasNextPage)}
          isFetchingNextPage={query.isFetchingNextPage}
          onLoadMore={query.fetchNextPage}
          emptyDescription={
            type === "seller"
              ? "This seller has no other products."
              : "No similar products found."
          }
          grid
        />
      </div>
    </Container>
  );
};

export default RelatedMaterialsPageWrapper;
