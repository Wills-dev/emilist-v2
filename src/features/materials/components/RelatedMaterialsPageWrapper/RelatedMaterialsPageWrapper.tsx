"use client";

import { useMemo, useState } from "react";

import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import SellersMaterialCardWrap from "../SellersMaterialCardWrap/SellersMaterialCardWrap";
import DashboardMaterialsHeader from "../DashboardMaterialsHeader/DashboardMaterialsHeader";
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
  const [, setSearch] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const visibleMaterials = useMemo(() => {
    const materials =
      type === "seller"
        ? sellerQuery.data?.pages.flatMap((page) => page.products) ?? []
        : similarQuery.data?.pages.flatMap((page) => page.similarProducts) ??
          [];
    const query = submittedQuery.trim().toLowerCase();
    if (!query) return materials;

    return materials.filter((material) =>
      [
        material.name,
        material.merchantName,
        "storeName" in material ? material.storeName : "",
      ].some((value) => value?.toLowerCase().includes(query)),
    );
  }, [sellerQuery.data, similarQuery.data, submittedQuery, type]);
  const title =
    type === "seller"
      ? `Other products from ${sellerName || "this seller"}`
      : "Similar materials";

  return (
    <Container variant={variant === "dashboard" ? "small" : "center"}>
      <div className="space-y-8 py-10">
        {variant === "dashboard" && (
          <DashboardMaterialsHeader
            title={title}
            setSearch={setSearch}
            onSearchSubmit={(query) => {
              setSearch(query);
              setSubmittedQuery(query);
            }}
          />
        )}
        <div className="space-y-4">
          <BackButton />
          {variant === "public" && (
            <div>
              <h1 className="font-exo text-2xl font-semibold sm:text-[32px]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-[#5E625F]">
                {type === "seller"
                  ? "Explore more products available from this merchant."
                  : "Explore more materials related to this product."}
              </p>
            </div>
          )}
        </div>
        <SellersMaterialCardWrap
          materials={visibleMaterials}
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
