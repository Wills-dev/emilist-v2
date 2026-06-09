import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import { BusinessSetupProps } from "../../types";
import Label from "@/components/atoms/Label/Label";
import InputWrapper from "@/components/molecules/InputWrapper/InputWrapper";
import SelectWrapper from "@/components/molecules/SelectWrapper/SelectWrapper";
import { countriesAndStates } from "@/lib/constants/countries";
import MultiSelect from "@/components/atoms/MultiSelect/MultiSelect";
import { expertServices } from "../../constants";
import Select from "@/components/atoms/Select/Select";
import { currencies } from "@/lib/constants/currencies";
import Input from "@/components/atoms/Input/Input";
import { rateUnits } from "@/lib/constants/rateUnits";
import Textarea from "@/components/atoms/TextArea/Textarea";
import { TooltipProvider } from "@/components/ui/tooltip";
import PopOver from "@/components/atoms/PopOver/PopOver";
import QuestionBtn from "@/components/atoms/QuestionBtn/QuestionBtn";
import MultiImageInput from "@/components/molecules/MultiImageInput/MultiImageInput";

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
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <Label htmlFor="services" title=" Select your main service" />
        <MultiSelect
          options={expertServices}
          value={business.services}
          onChange={toggleService}
          placeholder="Select services"
          showSearch
          allowOthers
          customPlaceholder="Enter your service"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <Label htmlFor="services" title=" Select your main service" />
        <MultiSelect
          options={stateOptions}
          value={business.coverageArea}
          onChange={toggleCoverage}
          placeholder="Select coverage areas"
          showSearch
          allowOthers
          customPlaceholder="Enter your coverage area"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <Label htmlFor="startingPrice" title=" Starting price" />
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-2">
            <Select
              id="currency"
              name="currency"
              value={business.currency}
              onChange={(e) => updateBusiness("currency", e.target.value)}
              options={currencies}
            />
          </div>
          <div className="col-span-3">
            <Input
              id="startingPrice"
              name="startingPrice"
              value={business.startingPrice}
              onChange={(e) => updateBusiness("startingPrice", e.target.value)}
              placeholder="25,000"
            />
          </div>
          <div className="col-span-3">
            <Select
              id="rateUnit"
              name="rateUnit"
              value={business.rateUnit}
              onChange={(e) => updateBusiness("rateUnit", e.target.value)}
              options={rateUnits}
              placeholder="Select"
            />
          </div>
        </div>
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <Label htmlFor="noticePeriod" title="Notice period" />
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input
              id="noticePeriod"
              name="noticePeriod"
              value={business.noticePeriod}
              onChange={(e) => updateBusiness("noticePeriod", e.target.value)}
              placeholder="10"
            />
          </div>
          <div className="col-span-1 flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px] h-11 p-1">
            <span className="px-2">Days</span>
          </div>
        </div>
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-4">
          <Label
            htmlFor="businessDescription"
            title="Enter Business Description"
          />
          <TooltipProvider>
            <PopOver actionBtn={<QuestionBtn />} variant="right">
              <p className="text-sm">
                Describe your business in simple terms — what you do, the
                services you provide, your experience, and what customers can
                expect from you.
              </p>
            </PopOver>
          </TooltipProvider>
        </div>
        <Textarea
          id="businessDescription"
          name="businessDescription"
          value={business.businessDescription}
          onChange={(e) =>
            updateBusiness("businessDescription", e.target.value)
          }
          placeholder="Write a brief business description"
          className="h-35"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <div className="flex items-center justify-between gap-4">
          <Label htmlFor="images" title="Add Images" />
          <p className="text-sm text-[#737774]">add up to 5</p>
        </div>
        <MultiImageInput
          preview={businessPreviews}
          addImage={handleBusinessImages}
          removeImage={removeBusinessImage}
        />
      </div>
    </div>
  );
};

export default BusinessSetup;
