import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { validateImage } from "@/lib/helpers/imageValidation";
import { useExpertStore } from "@/store/expert/expertStore";
import { isBusinessTabComplete } from "../helpers/validateBusinessProfile";

export const useBusinessProfileState = () => {
  const {
    business,
    businessImages,
    businessPreviews,
    useProfileAddress,
    profile,
  } = useExpertStore(
    useShallow((state) => ({
      profile: state.profile,
      business: state.business,
      businessImages: state.businessImages,
      businessPreviews: state.businessPreviews,
      useProfileAddress: state.useProfileAddress,
    })),
  );

  const resetBusiness = useExpertStore((state) => state.resetBusiness);
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
    business,
    isBusinessFormFilled,
    businessImages,
    businessPreviews,
    useProfileAddress,
    updateBusiness,
    toggleCoverage,
    toggleService,
    removeBusinessImage,
    setUseProfileAddress,
    setBusiness,
    handleBusinessImages,
    handleSameAsProfile,
    resetBusiness,
  };
};
