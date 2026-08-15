import type { Metadata } from "next";

import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";
import PostJobForm from "@/features/jobs/components/PostJobForm/PostJobForm";

export const metadata: Metadata = {
  title: "Post a job",
  description: "Post a job and connect with skilled experts on Emilist.",
};

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
