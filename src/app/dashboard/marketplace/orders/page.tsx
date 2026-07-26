import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import OrdersWrapper from "@/features/orders/components/OrdersWrapper/OrdersWrapper";

const page = () => {
  return (
    <DashboardLayout>
      <OrdersWrapper />
    </DashboardLayout>
  );
};

export default page;
