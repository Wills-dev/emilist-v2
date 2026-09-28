import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";
import { resolveManageJobsTab } from "@/features/jobs/helpers/manageJobs";

export default async function JobApplicantPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; expertId: string }>;
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const [{ id, expertId }, query] = await Promise.all([params, searchParams]);
  const tab = resolveManageJobsTab(
    typeof query.tab === "string" ? query.tab : undefined,
  );
  return (
    <DashboardLayout>
      <DashboardExpertInfoWrapper
        expertId={expertId}
        jobContext={{ jobId: id, tab }}
      />
    </DashboardLayout>
  );
}
