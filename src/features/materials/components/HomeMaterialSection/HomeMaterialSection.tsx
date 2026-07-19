"use client";

import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import MaterialCard from "../MaterialCard/MaterialCard";
import MaterialCardSkeleton from "../MaterialCard/MaterialCardSkeleton";

import { useGetAllMaterials } from "../../hooks/useGetAllMaterials";

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
              price={material?.finalPrice}
              unit={material?.priceMetric}
              location="Alapere, Ketu"
              createdAt={material?.createdAt}
              isLiked={true}
              currency={material?.currency}
              imgUrl={material?.image || "/assets/images/default-job-image.svg"}
              profileImg={material?.seller?.image}
              fullName={material?.seller?.name}
              rating={material?.averageRating}
              noOfReviews={material?.reviewCount}
              sellerId={material?.seller?._id ?? material?.seller?.id}
            />
          ))}
    </SectionWrapper>
  );
};

export default HomeMaterialSection;
