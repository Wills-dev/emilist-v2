import { createPageMetadata } from "@/lib/seo/metadata";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";
import EditJobForm from "@/features/jobs/components/EditJobForm/EditJobForm";

export const metadata = createPageMetadata({"title": "Edit Job", "description": "Edit Job on Emilist.", "index": false});




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
