import CustomRequestForm from "@/components/molecules/forms/CustomRequestForm/CustomRequestForm";
import EnterpriseWrapper from "@/components/organisms/EnterpriseWrapper/EnterpriseWrapper";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

const BookMaintenance = () => {
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

export default BookMaintenance;
