import { createPageMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ManagedJobInfo from "@/features/jobs/components/ManagedJobInfo/ManagedJobInfo";
import JobInfoSkeleton from "@/features/jobs/components/JobInfoSkeleton/JobInfoSkeleton";

export const metadata = createPageMetadata({"title": "Job Details", "description": "Job Details on Emilist.", "index": false});



export default async function JobInfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <DashboardLayout>
      <Suspense fallback={<JobInfoSkeleton variant="dashboard" />}>
        <ManagedJobInfo jobId={id} />
      </Suspense>
    </DashboardLayout>
  );
}
