"use client";

import Button from "@/components/atoms/Button/Button";
import ProfileSetup from "../../ProfileSetup/ProfileSetup";

import { useUpdateUserProfile } from "@/features/auth/hooks/useUpdateUserProfile";
import { isFormComplete } from "@/features/auth/helpers/validateProfileForm";

const CompleteProfileForm = () => {
  const {
    isPending,
    handleUpdateProfile,
    profile,
    profilePreview,
    updateProfile,
    handleImageChange,
    deleteImage,
    toggleLanguage,
  } = useUpdateUserProfile();

  const isProfileFill = isFormComplete(profile);

  return (
    <form className="mt-4 space-y-8" onSubmit={handleUpdateProfile}>
      <ProfileSetup
        form={profile}
        imagePreview={profilePreview}
        handleChange={updateProfile}
        handleImageChange={handleImageChange}
        deleteImage={deleteImage}
        toggleLanguage={toggleLanguage}
      />
      <Button
        variant="primary"
        type="submit"
        className="w-full h-11"
        loading={isPending}
        disabled={isPending || !isProfileFill}
      >
        Proceed
      </Button>
    </form>
  );
};

export default CompleteProfileForm;
