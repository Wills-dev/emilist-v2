import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ListedMaterialsWrapper from "@/features/materials/components/ListedMaterialsWrapper/ListedMaterialsWrapper";

export const metadata = createPageMetadata({"title": "Listed Materials", "description": "Listed Materials on Emilist.", "index": false});



const ListedMaterialsPage = () => (
  <DashboardLayout>
    <ListedMaterialsWrapper />
  </DashboardLayout>
);

export default ListedMaterialsPage;
