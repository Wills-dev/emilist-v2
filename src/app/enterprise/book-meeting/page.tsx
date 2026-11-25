import { createPageMetadata } from "@/lib/seo/metadata";
import CustomRequestForm from "@/components/molecules/forms/CustomRequestForm/CustomRequestForm";
import EnterpriseWrapper from "@/components/organisms/EnterpriseWrapper/EnterpriseWrapper";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

export const metadata = createPageMetadata({"title": "Custom Service Request", "description": "Custom Service Request on Emilist.", "index": false, "path": "/enterprise/book-meeting"});

const CustomRequestPage = () => {
  return (
    <CenteredFormLayout>
      <EnterpriseWrapper
        title="Custom request"
        desc="Tell us more about your unique service needs"
      >
        <CustomRequestForm />
      </EnterpriseWrapper>
    </CenteredFormLayout>
  );
};

export default CustomRequestPage;
