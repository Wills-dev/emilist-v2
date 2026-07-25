import { use } from "react";

import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import RelatedMaterialsPageWrapper from "@/features/materials/components/RelatedMaterialsPageWrapper/RelatedMaterialsPageWrapper";

const SellerMaterialsPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sellerName?: string }>;
}) => {
  const { id } = use(params);
  const { sellerName } = use(searchParams);

  return (
    <MainLayout variant="secondary">
      <MarketplaceBanner
        bgText="verified merchants &"
        endText="materials for your projects"
        src="/assets/images/materials.svg"
        type="jobs"
        className="bg-[#1A201B]"
      />
      <RelatedMaterialsPageWrapper
        resourceId={id}
        type="seller"
        variant="public"
        sellerName={sellerName}
      />
    </MainLayout>
  );
};

export default SellerMaterialsPage;
