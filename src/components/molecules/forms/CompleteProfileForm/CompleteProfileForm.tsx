"use client";

import Button from "@/components/atoms/Button/Button";
import ProfileSetup from "../../ProfileSetup/ProfileSetup";

import { useUpdateUserProfile } from "@/features/auth/hooks/useUpdateUserProfile";

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

  return (
    <form className="mt-4 space-y-8" onSubmit={handleUpdateProfile}>
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
