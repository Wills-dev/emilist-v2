import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import JobInfoSkeleton from "@/features/jobs/components/JobInfoSkeleton/JobInfoSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <JobInfoSkeleton variant="dashboard" />
    </DashboardLayout>
  );
}
