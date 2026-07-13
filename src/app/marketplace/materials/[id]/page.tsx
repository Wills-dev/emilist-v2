import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MaterialInfoWrapper from "@/features/materials/components/MaterialInfoWrapper/MaterialInfoWrapper";

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
      <MaterialInfoWrapper materialId={id} />
    </MainLayout>
  );
};

export default GeneralMaterialInfoPage;
