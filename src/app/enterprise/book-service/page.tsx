import { createPageMetadata } from "@/lib/seo/metadata";
import ScheduledRequestForm from "@/components/molecules/forms/ScheduledRequestForm/ScheduledRequestForm";
import EnterpriseWrapper from "@/components/organisms/EnterpriseWrapper/EnterpriseWrapper";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

export const metadata = createPageMetadata({"title": "Book a Service", "description": "Book a Service on Emilist.", "index": false, "path": "/enterprise/book-service"});

const BookServicePage = () => {
  return (
    <CenteredFormLayout>
      <EnterpriseWrapper
        title="Scheduled request"
        desc="Tell us more about your service request"
      >
        <ScheduledRequestForm />
      </EnterpriseWrapper>
    </CenteredFormLayout>
  );
};

export default BookServicePage;
