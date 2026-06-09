import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import { BusinessSetupProps } from "../../types";
import Label from "@/components/atoms/Label/Label";
import InputWrapper from "@/components/molecules/InputWrapper/InputWrapper";
import SelectWrapper from "@/components/molecules/SelectWrapper/SelectWrapper";
import { countriesAndStates } from "@/lib/constants/countries";

const BusinessSetup = ({
  updateBusiness,
  toggleService,
  toggleCoverage,
  removeBusinessImage,
  handleBusinessImages,
  business,
  businessPreviews,
  handleSameAsProfile,
  useProfileAddress,
}: BusinessSetupProps) => {
  const selectedCountry = countriesAndStates.find(
    (item) => item.value === business.businessCountry,
  );

  const stateOptions = selectedCountry?.states ?? [];

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="border-b border-[#E5E5E5] flex items-center gap-2 pb-6 col-span-2">
        <Checkbox value={useProfileAddress} onChange={handleSameAsProfile} />
        <Label htmlFor="" title="Same details with my profile" />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Business name"
          name="businessName"
          value={business.businessName}
          onChange={(e) => updateBusiness("businessName", e.target.value)}
          placeholder="Golden Plumb PLC"
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Year founded"
          name="yearFounded"
          value={business.yearFounded}
          onChange={(e) => updateBusiness("yearFounded", e.target.value)}
          placeholder="2020"
        />
      </div>
      <div className="col-span-2">
        <InputWrapper
          title="Number of employees"
          name="numberOfEmployee"
          value={business.numberOfEmployee}
          onChange={(e) => updateBusiness("numberOfEmployee", e.target.value)}
          placeholder="20"
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <SelectWrapper
          title="Country"
          name="businessCountry"
          value={business.businessCountry}
          onChange={(e) => updateBusiness("businessCountry", e.target.value)}
          options={countriesAndStates}
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <SelectWrapper
          title="State"
          name="businessState"
          value={business.businessState}
          onChange={(e) => updateBusiness("businessState", e.target.value)}
          options={stateOptions}
        />
      </div>
      <div className="col-span-2">
        <InputWrapper
          title="Business address"
          name="businessAddress"
          value={business.businessAddress}
          onChange={(e) => updateBusiness("businessAddress", e.target.value)}
          placeholder="7 Olowu street"
        />
      </div>
    </div>
  );
};

export default BusinessSetup;
