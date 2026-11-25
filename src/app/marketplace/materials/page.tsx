import { createPageMetadata } from "@/lib/seo/metadata";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import MarketplaceMaterialWrapper from "@/features/materials/components/MarketplaceMaterialWrapper/MarketplaceMaterialWrapper";

export const metadata = createPageMetadata({"title": "Shop Materials", "description": "Browse materials and supplies from merchants on Emilist. Compare products and find what you need for your next project.", "index": true, "path": "/marketplace/materials"});

const page = () => {
  return (
    <MainLayout variant="secondary">
      <MarketplaceMaterialWrapper />
    </MainLayout>
  );
};

export default page;
