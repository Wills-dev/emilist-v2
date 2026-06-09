import Button from "@/components/atoms/Button/Button";
import BusinessSetup from "@/features/experts/components/BusinessSetup/BusinessSetup";

import { BusinessFormWrapperProps } from "../../../../features/experts/types";

const ExpertBusinessForm = ({
  updateBusiness,
  toggleService,
  toggleCoverage,
  removeBusinessImage,
  handleBusinessImages,
  business,
  businessPreviews,
  handleSameAsProfile,
  switchTab,
  isBusinessFormFilled,
  useProfileAddress,
}: BusinessFormWrapperProps) => {
  return (
    <div className="space-y-8">
      <BusinessSetup
        updateBusiness={updateBusiness}
        toggleService={toggleService}
        toggleCoverage={toggleCoverage}
        removeBusinessImage={removeBusinessImage}
        handleBusinessImages={handleBusinessImages}
        business={business}
        businessPreviews={businessPreviews}
        handleSameAsProfile={handleSameAsProfile}
        useProfileAddress={useProfileAddress}
      />
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
