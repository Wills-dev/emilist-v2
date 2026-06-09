"use client";

import { routes } from "@/lib/helpers/routes";
import { ExpertProfileFormProps } from "@/features/auth/types";

import ProfileSetup from "../../ProfileSetup/ProfileSetup";
import Button from "@/components/atoms/Button/Button";
import Link from "next/link";
import { isFormComplete } from "@/features/auth/helpers/validateProfileForm";

const ExpertProfileForm = ({
  form,
  imagePreview,
  handleChange,
  handleImageChange,
  deleteImage,
  toggleLanguage,
  switchTab,
}: ExpertProfileFormProps) => {
  const isProfileFill = isFormComplete(form);

  return (
    <div className="space-y-8">
      <ProfileSetup
        form={form}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        deleteImage={deleteImage}
        toggleLanguage={toggleLanguage}
      />

      <Button
        variant="primary"
        type="button"
        onClick={() => switchTab("business-profile")}
        className="w-full h-11"
        disabled={!isProfileFill}
      >
        Proceed
      </Button>
      <div className="flex justify-center">
        <Link
          href={routes.dashboard}
          className="text-center flex items-center justify-between gap-2 text-[#18A154] hover:text-green-700 transition-all duration-300 font-exo font-semibold"
        >
          <span>Go to Dashboard</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ExpertProfileForm;
