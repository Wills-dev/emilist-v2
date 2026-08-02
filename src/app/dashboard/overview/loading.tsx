import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import OverviewSkeleton from "@/features/overview/components/OverviewSkeleton/OverviewSkeleton";

const OverviewLoading = () => (
  <DashboardLayout>
    <OverviewSkeleton />
  </DashboardLayout>
);

export default OverviewLoading;

