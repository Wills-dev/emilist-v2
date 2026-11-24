import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import OrdersWrapper from "@/features/orders/components/OrdersWrapper/OrdersWrapper";
import OrderCardSkeleton from "@/features/orders/components/OrderCardSkeleton/OrderCardSkeleton";

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
