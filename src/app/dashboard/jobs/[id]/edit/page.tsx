import type { Metadata } from "next";

import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";
import EditJobForm from "@/features/jobs/components/EditJobForm/EditJobForm";

export const metadata: Metadata = {
  title: "Edit job",
  description: "Update your job details on Emilist.",
};

const EditJobPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <CenteredFormLayout>
      <EditJobForm jobId={id} />
    </CenteredFormLayout>
  );
};

export default EditJobPage;
