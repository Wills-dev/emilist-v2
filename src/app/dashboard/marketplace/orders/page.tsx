import { createPageMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import OrdersWrapper from "@/features/orders/components/OrdersWrapper/OrdersWrapper";
import OrderCardSkeleton from "@/features/orders/components/OrderCardSkeleton/OrderCardSkeleton";

export const metadata = createPageMetadata({"title": "Orders and Sales", "description": "Orders and Sales on Emilist.", "index": false});



const page = () => {
  return (
    <DashboardLayout>
      <Suspense fallback={<div className="p-6"><OrderCardSkeleton /></div>}>
        <OrdersWrapper />
      </Suspense>
    </DashboardLayout>
  );
};

export default page;
