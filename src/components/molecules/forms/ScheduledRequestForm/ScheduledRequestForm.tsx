"use client";

import { useShallow } from "zustand/react/shallow";

import InputWrapper from "../../InputWrapper/InputWrapper";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import MultiSelect from "@/components/atoms/MultiSelect/MultiSelect";
import SelectWrapper from "../../SelectWrapper/SelectWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";
import EnterpriseImage from "../../EnterpriseImage/EnterpriseImage";
import BackHomeBtn from "@/components/atoms/BackHomeBtn/BackHomeBtn";
import Select from "@/components/atoms/Select/Select";
import CustomCheckbox from "@/components/atoms/CustomCheckbox/CustomCheckbox";
import Button from "@/components/atoms/Button/Button";

import { currencies } from "@/lib/constants/currencies";
import { countriesAndStates } from "@/lib/constants/countries";
import { expertLevels } from "@/lib/constants";
import { expertServices } from "@/features/experts/constants";
import { rateUnits } from "@/lib/constants/rateUnits";
import { useScheduledStore } from "@/store/enterprise/scheduledStore";
import { useScheduleRequest } from "@/lib/hooks/enterprise/useScheduleRequest";

const ScheduledRequestForm = () => {
  const { handleChangeImages, handleSubmit, isPending } = useScheduleRequest();

  const { scheduledForm, schedulePreviews } = useScheduledStore(
    useShallow((state) => ({
      scheduledForm: state.scheduledForm,
      schedulePreviews: state.schedulePreviews,
    })),
  );

  const updateScheduleForm = useScheduledStore(
    (state) => state.updateScheduleForm,
  );
  const toggleService = useScheduledStore((state) => state.toggleService);
  const toggleLocation = useScheduledStore((state) => state.toggleLocation);
  const removeScheduleImage = useScheduledStore(
    (state) => state.removeScheduleImage,
  );

  const selectedCountry = countriesAndStates.find(
    (item) => item.value === scheduledForm.country,
  );

  const stateOptions = selectedCountry?.states ?? [];

  return (
    <form className="grid grid-cols-2 gap-6 pb-28" onSubmit={handleSubmit}>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="First name"
          name="firstName"
          value={scheduledForm.firstName}
          onChange={(e) => updateScheduleForm("firstName", e.target.value)}
          placeholder="Patrick"
        />
      </div>{" "}
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Last name"
          name="lastName"
          value={scheduledForm.lastName}
          onChange={(e) => updateScheduleForm("lastName", e.target.value)}
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
              value={scheduledForm.countryCode}
              onChange={(e) =>
                updateScheduleForm("countryCode", e.target.value)
              }
              placeholder="+234"
              className=""
            />
          </div>
          <div className="w-full col-span-5">
            <Input
              id="text"
              type="mobile"
              name="mobile"
              value={scheduledForm.mobile}
              onChange={(e) => updateScheduleForm("mobile", e.target.value)}
              placeholder="Enter 10 digit number"
              className=" w-full"
            />
          </div>
        </div>
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Email"
          type="email"
          name="email"
          value={scheduledForm.email}
          onChange={(e) => updateScheduleForm("email", e.target.value)}
          placeholder="pogbo@gmail.com"
        />
      </div>
      <div className="col-span-2">
        <InputWrapper
          title="Enter a title for your request"
          name="title"
          value={scheduledForm.title}
          onChange={(e) => updateScheduleForm("title", e.target.value)}
          placeholder="Hotel Janitorial Service"
        />
      </div>
      <div className="col-span-2 w-full flex flex-col gap-2">
        <Label htmlFor="services" title="Tell us the service(s) you need" />
        <MultiSelect
          options={expertServices}
          value={scheduledForm.services}
          onChange={toggleService}
          placeholder="You can select up to 10 services"
          showSearch
          allowOthers
          customPlaceholder="Enter your service"
        />
      </div>
      <div className="col-span-2">
        <SelectWrapper
          title="Country"
          name="country"
          value={scheduledForm.country}
          onChange={(e) => updateScheduleForm("country", e.target.value)}
          options={countriesAndStates}
          placeholder="Select country you need the service"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Label htmlFor="locations" title="Where do you need these services" />
        <MultiSelect
          options={stateOptions}
          value={scheduledForm.locations}
          onChange={toggleLocation}
          placeholder="You can select up to 10 locations"
          showSearch
          allowOthers
          customPlaceholder="Enter your location"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Label htmlFor="description" title="Describe your request" />
        <Textarea
          id="description"
          name="description"
          value={scheduledForm.description}
          onChange={(e) => updateScheduleForm("description", e.target.value)}
          placeholder="Be as detailed as possible, talk about the services you need at length as well as your service preferences"
          className="h-35"
        />
      </div>
      <EnterpriseImage
        previews={schedulePreviews}
        removeImg={removeScheduleImage}
        handleChangeImages={handleChangeImages}
      />
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          type="date"
          title="Start date"
          name="startDate"
          value={scheduledForm.startDate}
          onChange={(e) => updateScheduleForm("startDate", e.target.value)}
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          type="date"
          title="End date"
          name="endDate"
          value={scheduledForm.endDate}
          onChange={(e) => updateScheduleForm("endDate", e.target.value)}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Label htmlFor="startingPrice" title=" Starting price" />
        <div className="grid grid-cols-8 gap-2">
          <div className="col-span-1">
            <Select
              id="currency"
              name="currency"
              value={scheduledForm.currency}
              onChange={(e) => updateScheduleForm("currency", e.target.value)}
              options={currencies}
            />
          </div>
          <div className="col-span-6 w-full">
            <Input
              id="amount"
              name="amount"
              value={scheduledForm.amount}
              onChange={(e) => updateScheduleForm("amount", e.target.value)}
              placeholder="25,000"
            />
          </div>
          <div className="col-span-1">
            <Select
              id="rateUnit"
              name="rateUnit"
              value={scheduledForm.rateUnit}
              onChange={(e) => updateScheduleForm("rateUnit", e.target.value)}
              options={rateUnits}
              placeholder="-"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <h6 className="text-gray-900 sm:text-xl text-lg leading-8 font-semibold font-exo">
          Experience Level
        </h6>
        <Label
          htmlFor="level"
          title="What level of expertise do you need on your request ?"
        />
        <div className="flex items-center gap-6">
          {expertLevels?.map((expert) => (
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              key={expert}
              onClick={() => updateScheduleForm("level", expert)}
            >
              <CustomCheckbox
                variant={expert === scheduledForm.level ? "active" : "inactive"}
              />
              <span className="font-medium font-exo">{expert}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        <InputWrapper
          title="Hire an expert directly for this role"
          name="expertId"
          value={scheduledForm.expertId}
          onChange={(e) => updateScheduleForm("expertId", e.target.value)}
          placeholder="Enter Emilist ID"
        />
      </div>
      <div className="col-span-2 pt-6">
        <Button
          className="w-full"
          variant="primary"
          disabled={isPending}
          loading={isPending}
        >
          Submit Request
        </Button>
      </div>
      <BackHomeBtn />
    </form>
  );
};

export default ScheduledRequestForm;
