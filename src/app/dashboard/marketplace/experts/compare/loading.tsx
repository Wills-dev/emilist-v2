import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ComparisonSkeleton from "@/components/molecules/PageSkeleton/ComparisonSkeleton/ComparisonSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <ComparisonSkeleton />
    </DashboardLayout>
  );
}
