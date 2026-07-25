"use client";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";
import SellersMaterialCardWrap from "../SellersMaterialCardWrap/SellersMaterialCardWrap";
import { useGetSimilarMaterials } from "../../hooks/useGetSimilarMaterials";
import { routes } from "@/lib/helpers/routes";

const PublicSimilarMaterials = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useGetSimilarMaterials({
    productId,
    limit: 4,
  });

  return (
    <div className="md:py-20 py-10 space-y-6 bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB]">
      <Container>
        <div className="space-y-6">
          <div className="sm:space-y-6 space-y-4 flex items-center justify-between gap-4">
            <SectionTitle title="Explore similar products" />
            <SeeAllBtn link={routes.marketplace.similarMaterials(productId)} />
          </div>
          <SellersMaterialCardWrap
            materials={data?.similarProducts ?? []}
            isLoading={isLoading}
            emptyDescription="No similar products found."
          />
        </div>
      </Container>
    </div>
  );
};

export default PublicSimilarMaterials;
