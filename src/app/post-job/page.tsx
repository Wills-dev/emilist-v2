import { createPageMetadata } from "@/lib/seo/metadata";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";
import PostJobForm from "@/features/jobs/components/PostJobForm/PostJobForm";

export const metadata = createPageMetadata({"title": "Post a Job", "description": "Post a Job on Emilist.", "index": false, "path": "/post-job"});


const PostJobPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ expertId?: string | string[] }>;
}) => {
  const params = await searchParams;
  const expertId = Array.isArray(params.expertId)
    ? params.expertId[0]
    : params.expertId;

  return (
    <CenteredFormLayout>
      <PostJobForm initialExpertId={expertId} />
    </CenteredFormLayout>
  );
};

export default PostJobPage;
