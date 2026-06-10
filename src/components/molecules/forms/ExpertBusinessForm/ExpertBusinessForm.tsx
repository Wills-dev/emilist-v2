import Button from "@/components/atoms/Button/Button";
import BusinessSetup from "@/features/experts/components/BusinessSetup/BusinessSetup";

import { useExpertTabs } from "@/features/experts/hooks/useExpertTabs";
import { useBusinessProfileState } from "@/features/experts/hooks/useBusinessProfileState";

const ExpertBusinessForm = () => {
  const { switchTab } = useExpertTabs();
  const { isBusinessFormFilled } = useBusinessProfileState();

  return (
    <div className="space-y-8">
      <BusinessSetup />
      <div className="flex max-sm:flex-col gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => switchTab("profile")}
          className="w-full h-11"
        >
          Go Back
        </Button>{" "}
        <Button
          variant="primary"
          type="button"
          onClick={() => switchTab("experiences")}
          className="w-full h-11"
          disabled={!isBusinessFormFilled}
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default ExpertBusinessForm;
