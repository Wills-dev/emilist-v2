import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import JobsDashboardSkeleton from "@/features/jobs/components/JobsDashboardSkeleton/JobsDashboardSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <JobsDashboardSkeleton />
    </DashboardLayout>
  );
}
