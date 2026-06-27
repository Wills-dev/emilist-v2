"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button/Button";
import BackHomeBtn from "@/components/atoms/BackHomeBtn/BackHomeBtn";
import InputWrapper from "../../InputWrapper/InputWrapper";
import Label from "@/components/atoms/Label/Label";
import Input from "@/components/atoms/Input/Input";
import Textarea from "@/components/atoms/TextArea/Textarea";
import CustomCheckbox from "@/components/atoms/CustomCheckbox/CustomCheckbox";
import EnterpriseImage from "../../EnterpriseImage/EnterpriseImage";

import { expertLevels } from "@/lib/constants";
import { useShallow } from "zustand/react/shallow";
import { useScheduledStore } from "@/store/enterprise/scheduledStore";
import { useScheduleRequest } from "@/lib/hooks/enterprise/useScheduleRequest";

const CustomRequestForm = () => {
  const [form, setForm] = useState("");

  const { handleChangeImages } = useScheduleRequest();

  const { schedulePreviews } = useScheduledStore(
    useShallow((state) => ({
      schedulePreviews: state.schedulePreviews,
    })),
  );
  const removeScheduleImage = useScheduledStore(
    (state) => state.removeScheduleImage,
  );

  return (
    <form className="grid grid-cols-2 gap-6 pb-28">
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="First name"
          name="firstName"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Patrick"
        />
      </div>
      <div className="sm:col-span-1 col-span-2">
        <InputWrapper
          title="Last name"
          name="lastName"
          value={form}
          onChange={(e) => setForm(e.target.value)}
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
              value={form}
              onChange={(e) => setForm(e.target.value)}
              placeholder="+234"
              className=""
            />
          </div>
          <div className="w-full col-span-5">
            <Input
              id="text"
              type="mobile"
              name="mobile"
              value={form}
              onChange={(e) => setForm(e.target.value)}
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
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="pogbo@gmail.com"
        />
      </div>
      <div className="col-span-2">
        <InputWrapper
          title="Enter a title for your request"
          name="title"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Hotel Janitorial Service"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Label htmlFor="description" title="Tell us what you need in detail" />
        <Textarea
          id="description"
          name="description"
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Talk about the services you need at length as well as your service preferences and we’ll reach out to you as fast as possible"
          className="h-35"
        />
      </div>
      <EnterpriseImage
        previews={schedulePreviews}
        removeImg={removeScheduleImage}
        handleChangeImages={handleChangeImages}
      />
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
              onClick={() => setForm(expert)}
            >
              <CustomCheckbox
                variant={expert === form ? "active" : "inactive"}
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
          value={form}
          onChange={(e) => setForm(e.target.value)}
          placeholder="Enter Emilist ID"
        />
      </div>

      <div className="col-span-2 flex flex-col gap-2">
        <h6 className="text-gray-900 sm:text-xl text-lg leading-8 font-semibold font-exo">
          Book appointment
        </h6>
        <Label
          htmlFor="period"
          title="Setup your availability for a virtual call to discuss what you need"
        />
        <div className="grid grid-cols-2 gap-4">
          <div className="sm:col-span-1 col-span-2 ">
            <Input
              type="date"
              name="startDate"
              value={form}
              onChange={(e) => setForm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="col-span-2 pt-6">
        <Button className="w-full" variant="primary">
          Submit Request
        </Button>
      </div>
      <BackHomeBtn />
    </form>
  );
};

export default CustomRequestForm;
