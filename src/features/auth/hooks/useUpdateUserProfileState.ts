import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { validateImage } from "@/lib/helpers/imageValidation";
import { useExpertStore } from "@/store/expert/expertStore";

export const useUpdateUserProfileState = () => {
  const { profile, profilePreview } = useExpertStore(
    useShallow((state) => ({
      profile: state.profile,
      profilePreview: state.profilePreview,
    })),
  );

  const updateProfile = useExpertStore((state) => state.updateProfile);
  const toggleLanguage = useExpertStore((state) => state.toggleLanguage);
  const setProfileImage = useExpertStore((state) => state.setProfileImage);
  const deleteImage = useExpertStore((state) => state.deleteImage);
  const setProfile = useExpertStore((state) => state.setProfile);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = validateImage(file);
    if (error) return toast.error(error);

    const preview = URL.createObjectURL(file);

    setProfileImage(file, preview);
  };

  return {
    handleImageChange,
    deleteImage,
    toggleLanguage,
    updateProfile,
    profile,
    profilePreview,
    setProfile,
    setProfileImage,
  };
};
