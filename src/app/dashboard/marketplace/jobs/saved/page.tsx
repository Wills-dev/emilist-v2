import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardJobsWrapper from "@/features/jobs/components/DashboardJobsWrapper/DashboardJobsWrapper";

const DashboardSavedJobsPage = () => (
  <DashboardLayout>
    <DashboardJobsWrapper saved />
  </DashboardLayout>
);

export default DashboardSavedJobsPage;
