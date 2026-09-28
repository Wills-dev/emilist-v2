import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";
import { resolveManageJobsTab } from "@/features/jobs/helpers/manageJobs";

export default async function JobApplicantReviewsPage({
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
      <DashboardExpertReviews
        expertId={expertId}
        jobContext={{ jobId: id, tab }}
      />
    </DashboardLayout>
  );
}
