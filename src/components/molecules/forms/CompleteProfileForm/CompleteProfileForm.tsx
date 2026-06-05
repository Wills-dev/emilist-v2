"use client";

import Image from "next/image";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import MultiSelect from "@/components/atoms/MultiSelect/MultiSelect";
import Select from "@/components/atoms/Select/Select";
import Textarea from "@/components/atoms/TextArea/Textarea";

import { useUpdateUserProfile } from "@/features/auth/hooks/useUpdateUserProfile";
import { countriesAndStates } from "@/lib/constants/countries";
import { LANGUAGES } from "@/lib/constants/languages";
import { ImagePlus } from "lucide-react";

const CompleteProfileForm = () => {
  const {
    isPending,
    handleUpdateProfile,
    form,
    imagePreview,
    handleChange,
    handleImageChange,
    deleteImage,
    toggleLanguage,
    isFormComplete,
  } = useUpdateUserProfile();

  const selectedCountry = countriesAndStates.find(
    (item) => item.value === form.country,
  );

  const stateOptions = selectedCountry?.states ?? [];

  return (
    <form className="mt-4 space-y-8" onSubmit={handleUpdateProfile}>
      <div className="grid grid-cols-2 gap-6">
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="firstName" title="First name" />
          <Input
            id="text"
            type="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Patrick"
          />
        </div>{" "}
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="lastName" title="Last name" />
          <Input
            id="text"
            type="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Ogbonnaya"
          />
        </div>
        <div className="sm:col-span-1 col-span-2 w-full space-y-2">
          <Label htmlFor="countryCode" title="Phone number" />
          <div className="grid grid-cols-7 gap-2 w-full">
            <div className="col-span-2">
              {" "}
              <Input
                id="text"
                type="countryCode"
                name="countryCode"
                value={form.countryCode}
                onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Enter 10 digit number"
                className=" w-full"
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-1 col-span-2 w-full space-y-2">
          <Label htmlFor="language" title="Language" />
          <MultiSelect
            value={form.language}
            onChange={toggleLanguage}
            options={LANGUAGES}
          />
        </div>
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="country" title="Country" />
          <Select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            options={countriesAndStates}
          />
        </div>
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="state" title="State" />
          <Select
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            options={stateOptions}
          />
        </div>
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="city" title="City" />
          <Input
            id="text"
            type="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            placeholder="Surulere"
          />
        </div>
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="houseAddress" title="House Address" />
          <Input
            id="text"
            type="houseAddress"
            name="houseAddress"
            value={form.houseAddress}
            onChange={handleChange}
            placeholder="7 Funds street"
          />
        </div>
        <div className="sm:col-span-1 col-span-2 space-y-2">
          <Label htmlFor="bio" title="Bio" />
          <Textarea
            id="bio"
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Write a short description about yourself and what you do"
            className="h-35"
          />
        </div>
        <div className="sm:col-span-1 col-span-2">
          <label htmlFor="image" className="space-y-2">
            <span className="text-[#474C48] font-medium font-exo max-sm:text-sm ">
              Upload display photo
            </span>

            <div className="h-35 backdrop-blur-2xl bg-[#ECECEC] p-1.5 w-full rounded-[10px]">
              {imagePreview ? (
                <div className="relative overflow-hidden rounded-[10px] w-full h-full bg-white">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={deleteImage}
                    className="absolute right-1 top-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <>
                  {" "}
                  <div className="w-full h-full bg-white rounded-[10px] border-dashed flex justify-center items-center border-[#A2A4A2] text-[#A2A4A2]">
                    <ImagePlus />
                    <input
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="invisible h-0 w-0"
                    />
                  </div>
                </>
              )}
            </div>
          </label>
        </div>
      </div>
      <Button
        variant="primary"
        type="submit"
        className="w-full h-11"
        loading={isPending}
        disabled={isPending || !isFormComplete()}
      >
        Proceed
      </Button>
    </form>
  );
};

export default CompleteProfileForm;
