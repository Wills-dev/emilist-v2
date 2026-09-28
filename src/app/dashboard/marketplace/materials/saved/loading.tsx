import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import MarketplaceSkeleton from "@/components/molecules/PageSkeleton/MarketplaceSkeleton/MarketplaceSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <MarketplaceSkeleton dashboard kind="materials" />
    </DashboardLayout>
  );
}
