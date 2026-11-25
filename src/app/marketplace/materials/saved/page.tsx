import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PublicSavedMaterialWrapper from "@/features/materials/components/PublicSavedMaterialWrapper/PublicSavedMaterialWrapper";

export const metadata = createPageMetadata({"title": "Saved Materials", "description": "Saved Materials on Emilist.", "index": false, "path": "/marketplace/materials/saved"});

const page = () => {
  return (
    <MainLayout variant="secondary">
      <PublicSavedMaterialWrapper />
    </MainLayout>
  );
};

export default page;
