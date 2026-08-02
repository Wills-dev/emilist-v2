"use client";

import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import MaterialCard from "../MaterialCard/MaterialCard";
import MaterialCardSkeleton from "../MaterialCard/MaterialCardSkeleton";

import { useGetAllMaterials } from "../../hooks/useGetAllMaterials";
import { routes } from "@/lib/helpers/routes";

const HomeMaterialSection = () => {
  const { materials, isLoading } = useGetAllMaterials({ limit: 10 });

  return (
    <SectionWrapper className="no-scrollbar ">
      {isLoading
        ? Array.from({ length: 4 }, (_, index) => (
            <MaterialCardSkeleton key={index} />
          ))
        : materials?.map((material) => (
            <MaterialCard
              key={material?.id}
              id={material?.id}
              productName={material?.name}
              price={material?.price}
              unit={material?.unit}
              location={
                [material.delivery?.city, material.delivery?.state]
                  .filter(Boolean)
                  .join(", ") || "Delivery location not specified"
              }
              createdAt={material?.createdAt}
              isLiked={material?.isLiked ?? false}
              currency={material?.currency}
              imgUrl={
                material.thumbnail ||
                material.images?.[0]?.url ||
                "/assets/images/default-job-image.svg"
              }
              profileImg={material.merchant.logo ?? undefined}
              fullName={
                material.merchant.businessName ||
                material.merchant.displayName ||
                "Merchant"
              }
              rating={material.merchant.rating ?? material.averageRating}
              noOfReviews={
                material.merchant.totalReviews ?? material.reviewCount
              }
              sellerId={material.merchant.id}
              reviewsHref={routes.marketplace.materialInfoReviews(material.id)}
            />
          ))}
    </SectionWrapper>
  );
};

export default HomeMaterialSection;
