import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { useExpertStore } from "@/store/expert/expertStore";
import { validateImage } from "@/lib/helpers/imageValidation";
import { useUpdateUserProfileState } from "@/features/auth/hooks/useUpdateUserProfileState";
import { isBusinessTabComplete } from "@/features/experts/helpers/validateBusinessProfile";

export const useCreateExpert = () => {
  const {
    handleImageChange,
    deleteImage,
    toggleLanguage,
    updateProfile,
    profile,
    profilePreview,
  } = useUpdateUserProfileState();

  const { business, businessImages, businessPreviews, useProfileAddress } =
    useExpertStore(
      useShallow((state) => ({
        business: state.business,
        businessImages: state.businessImages,
        businessPreviews: state.businessPreviews,
        useProfileAddress: state.useProfileAddress,
      })),
    );

  const updateBusiness = useExpertStore((state) => state.updateBusiness);
  const toggleService = useExpertStore((state) => state.toggleService);
  const toggleCoverage = useExpertStore((state) => state.toggleCoverage);
  const addBusinessImages = useExpertStore((state) => state.addBusinessImages);
  const removeBusinessImage = useExpertStore(
    (state) => state.removeBusinessImage,
  );
  const setUseProfileAddress = useExpertStore(
    (state) => state.setUseProfileAddress,
  );
  const setBusiness = useExpertStore((state) => state.setBusiness);

  const handleSameAsProfile = (value: boolean) => {
    setUseProfileAddress(value);

    if (value) {
      const houseAddress = `${profile?.houseAddress} ${profile?.city}`;
      setBusiness({
        ...business,
        businessAddress: houseAddress ?? "",
        businessState: profile?.state ?? "",
        businessCountry: profile?.country ?? "",
      });
    }
  };

  const handleBusinessImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    for (const file of files) {
      const error = validateImage(file);
      if (error) return toast.error(error);
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    addBusinessImages(files, previews);
  };

  const isBusinessFormFilled = isBusinessTabComplete(business, businessImages);

  return {
    profile,
    profilePreview,
    updateProfile,
    toggleLanguage,
    deleteImage,
    handleImageChange,
    updateBusiness,
    toggleService,
    toggleCoverage,
    removeBusinessImage,
    handleBusinessImages,
    business,
    businessImages,
    businessPreviews,
    handleSameAsProfile,
    isBusinessFormFilled,
    useProfileAddress,
  };
};
