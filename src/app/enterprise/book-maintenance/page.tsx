import { createPageMetadata } from "@/lib/seo/metadata";
import RecurrinngRequestForm from "@/components/molecules/forms/RecurrinngRequestForm/RecurrinngRequestForm";
import EnterpriseWrapper from "@/components/organisms/EnterpriseWrapper/EnterpriseWrapper";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

export const metadata = createPageMetadata({"title": "Book Recurring Maintenance", "description": "Book Recurring Maintenance on Emilist.", "index": false, "path": "/enterprise/book-maintenance"});

const BookMaintenance = () => {
  return (
    <CenteredFormLayout>
      <EnterpriseWrapper
        title="Recurring Maintenance"
        desc="Tell us more about your maintenance service request"
      >
        <RecurrinngRequestForm />
      </EnterpriseWrapper>
    </CenteredFormLayout>
  );
};

export default BookMaintenance;
