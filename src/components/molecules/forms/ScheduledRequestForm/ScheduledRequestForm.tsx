"use client";

import { useShallow } from "zustand/react/shallow";

import { useScheduledStore } from "@/store/enterprise/scheduledStore";
import { useScheduleRequest } from "@/lib/hooks/enterprise/useScheduleRequest";
import InputWrapper from "../../InputWrapper/InputWrapper";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import MultiSelect from "@/components/atoms/MultiSelect/MultiSelect";
import { expertServices } from "@/features/experts/constants";
import SelectWrapper from "../../SelectWrapper/SelectWrapper";
import { countriesAndStates } from "@/lib/constants/countries";
import Textarea from "@/components/atoms/TextArea/Textarea";

const ScheduledRequestForm = () => {
  const { handleChangeImages, handleSubmit, isPending } = useScheduleRequest();

  const { scheduledForm, schedulePreviews } = useScheduledStore(
    useShallow((state) => ({
      scheduledForm: state.scheduledForm,
      scheduleImages: state.scheduleImages,
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
    </form>
  );
};

export default ScheduledRequestForm;
