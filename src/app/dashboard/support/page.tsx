import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import SupportWrapper from "@/features/support/components/SupportWrapper/SupportWrapper";

export const metadata = createPageMetadata({"title": "Support", "description": "Support on Emilist.", "index": false});



const SupportPage = () => (
  <DashboardLayout>
    <SupportWrapper />
  </DashboardLayout>
);

export default SupportPage;
