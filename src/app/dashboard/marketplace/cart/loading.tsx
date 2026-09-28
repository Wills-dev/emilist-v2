import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import CartPageSkeleton from "@/features/materials/components/CartPageSkeleton/CartPageSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <CartPageSkeleton dashboard />
    </DashboardLayout>
  );
}
