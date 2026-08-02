import { ChangeEvent } from "react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import MultiSelect from "@/components/atoms/MultiSelect/MultiSelect";
import RichTextArea from "@/components/molecules/RichTextArea/RichTextArea";
import PopOver from "@/components/atoms/PopOver/PopOver";
import QuestionBtn from "@/components/atoms/QuestionBtn/QuestionBtn";
import InputWrapper from "../InputWrapper/InputWrapper";
import SelectWrapper from "../SelectWrapper/SelectWrapper";

import { CompleteProfileForm } from "@/features/auth/types";
import { LANGUAGES } from "@/lib/constants/languages";
import { countriesAndStates } from "@/lib/constants/countries";
import { photoTips } from "@/lib/constants";
import { TooltipProvider } from "@/components/ui/tooltip";
import SingleImageInput from "../SingleImageInput/SingleImageInput";

interface ProfileSetupProps {
  form: CompleteProfileForm;
  imagePreview: string;
  handleChange: (key: keyof CompleteProfileForm, value: unknown) => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  deleteImage: () => void;
  toggleLanguage: (lang: string) => void;
}

const ProfileSetup = ({
  form,
  handleChange,
  toggleLanguage,
  imagePreview,
  deleteImage,
  handleImageChange,
}: ProfileSetupProps) => {
  const selectedCountry = countriesAndStates.find(
    (item) => item.value === form.country,
  );

  const stateOptions = selectedCountry?.states ?? [];

  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="First name"
          name="firstName"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          placeholder="Patrick"
        />
      </div>{" "}
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Last name"
          name="lastName"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          placeholder="Ogbonnaya"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 w-full flex flex-col gap-2">
        <Label htmlFor="countryCode" title="Phone number" />
        <div className="grid grid-cols-7 gap-2 w-full">
          <div className="col-span-2">
            {" "}
            <Input
              id="text"
              type="countryCode"
              name="countryCode"
              value={form.countryCode}
              onChange={(e) => handleChange("countryCode", e.target.value)}
              placeholder="+234"
              className=""
            />
          </div>
          <div className="w-full col-span-5">
            <Input
              id="text"
              type="mobile"
              name="mobile"
              value={form.mobile}
              onChange={(e) => handleChange("mobile", e.target.value)}
              placeholder="Enter 10 digit number"
              className=" w-full"
            />
          </div>
        </div>
      </div>
      <div className="sm:col-span-1 col-span-2 w-full flex flex-col gap-2">
        <Label htmlFor="language" title="Language" />
        <MultiSelect
          value={form.languages}
          onChange={toggleLanguage}
          options={LANGUAGES}
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <SelectWrapper
          title="Country"
          name="country"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
          options={countriesAndStates}
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <SelectWrapper
          title="State"
          name="state"
          value={form.state}
          onChange={(e) => handleChange("state", e.target.value)}
          options={stateOptions}
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="City"
          name="city"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          placeholder="Surulere"
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="House Address"
          name="houseAddress"
          value={form.houseAddress}
          onChange={(e) => handleChange("houseAddress", e.target.value)}
          placeholder="7 Funds street"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <Label htmlFor="bio" title="Bio" />
        <RichTextArea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={(value) => handleChange("bio", value)}
          placeholder="Write a short description about yourself and what you do"
          ariaLabel="Bio"
        />
      </div>
      <div className="sm:col-span-1 col-span-2 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {" "}
          <span className="text-[#474C48] font-medium font-exo max-sm:text-sm ">
            Upload display photo
          </span>
          <TooltipProvider>
            <PopOver actionBtn={<QuestionBtn />} variant="right">
              <div className="space-y-4">
                {" "}
                <h6 className="font-semibold">Photo Tips</h6>
                <ul className="flex flex-col gap-2 px-6">
                  {photoTips?.map((tip) => (
                    <li key={tip} className="text-sm list-disc">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </PopOver>
          </TooltipProvider>
        </div>
        <SingleImageInput
          imagePreview={imagePreview}
          deleteImage={deleteImage}
          handleImageChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default ProfileSetup;
