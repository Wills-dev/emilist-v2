import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CartBreakdown from "@/features/materials/components/CartBreakdown/CartBreakdown";

const page = () => {
  return (
    <DashboardLayout>
      <CartBreakdown isDashboard />
    </DashboardLayout>
  );
};

export default page;
