import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CheckoutWrapper from "@/features/materials/components/CheckoutWrapper/CheckoutWrapper";

export const metadata = createPageMetadata({"title": "Dashboard", "description": "Dashboard on Emilist.", "index": false});



const DashboardCheckoutPage = () => (
  <DashboardLayout>
    <CheckoutWrapper isDashboard />
  </DashboardLayout>
);

export default DashboardCheckoutPage;
