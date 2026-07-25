import { use } from "react";

import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import RelatedMaterialsPageWrapper from "@/features/materials/components/RelatedMaterialsPageWrapper/RelatedMaterialsPageWrapper";

const SimilarMaterialsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

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
        type="similar"
        variant="public"
      />
    </MainLayout>
  );
};

export default SimilarMaterialsPage;
