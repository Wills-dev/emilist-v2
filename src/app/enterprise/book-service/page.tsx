import ScheduledRequestForm from "@/components/molecules/forms/ScheduledRequestForm/ScheduledRequestForm";
import EnterpriseWrapper from "@/components/organisms/EnterpriseWrapper/EnterpriseWrapper";
import CenteredFormLayout from "@/components/templates/CenteredFormLayout/CenteredFormLayout";

const page = () => {
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

export default page;
