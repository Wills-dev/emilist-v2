import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CartBreakdown from "@/features/materials/components/CartBreakdown/CartBreakdown";

export const metadata = createPageMetadata({"title": "Dashboard", "description": "Dashboard on Emilist.", "index": false});



const page = () => {
  return (
    <DashboardLayout>
      <CartBreakdown isDashboard />
    </DashboardLayout>
  );
};

export default page;
