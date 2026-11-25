import { createPageMetadata } from "@/lib/seo/metadata";
import { use } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import RelatedMaterialsPageWrapper from "@/features/materials/components/RelatedMaterialsPageWrapper/RelatedMaterialsPageWrapper";

export const metadata = createPageMetadata({"title": "Similar Materials", "description": "Similar Materials on Emilist.", "index": false});



const SimilarMaterialsPage = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);

  return (
    <DashboardLayout>
      <RelatedMaterialsPageWrapper
        resourceId={id}
        type="similar"
        variant="dashboard"
      />
    </DashboardLayout>
  );
};

export default SimilarMaterialsPage;
