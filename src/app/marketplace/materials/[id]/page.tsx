import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PublicMaterialInfoWrapper from "@/features/materials/components/PublicMaterialInfoWrapper/PublicMaterialInfoWrapper";
import PublicSimilarMaterials from "@/features/materials/components/PublicSimilarMaterials/PublicSimilarMaterials";

import { use } from "react";

const GeneralMaterialInfoPage = ({
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
      <PublicMaterialInfoWrapper materialId={id} />
      <PublicSimilarMaterials productId={id} />
    </MainLayout>
  );
};

export default GeneralMaterialInfoPage;
