import { createPageMetadata } from "@/lib/seo/metadata";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ApplicantProfilePage from "@/features/jobs/components/ApplicantProfilePage/ApplicantProfilePage";
import { resolveManageJobsTab } from "@/features/jobs/helpers/manageJobs";

export const metadata = createPageMetadata({"title": "Applicant Reviews", "description": "Applicant Reviews on Emilist.", "index": false});



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
      <ApplicantProfilePage
        expertId={expertId}
        jobId={id}
        tab={tab}
        reviewsPage
      />
    </DashboardLayout>
  );
}
