import { materialMetadata } from "@/lib/seo/resourceMetadata";
import MarketplaceBanner from "@/components/molecules/MarketplaceBanner/MarketplaceBanner";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MaterialReviewInfoWrapper from "@/features/materials/components/MaterialReviewInfoWrapper/MaterialReviewInfoWrapper";
import { use } from "react";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return materialMetadata(id, true);
}

const GeneralMaterialReviewsPage = ({
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
      <MaterialReviewInfoWrapper materialId={id} />
    </MainLayout>
  );
};

export default GeneralMaterialReviewsPage;
