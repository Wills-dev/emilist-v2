import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { validateImage } from "@/lib/helpers/imageValidation";
import { useExpertStore } from "@/store/expert/expertStore";

export const useCertificationState = () => {
  const {
    certificationPreview,
    certificationView,
    certifications,
    certificationImages,
  } = useExpertStore(
    useShallow((state) => ({
      certifications: state.certifications,
      certificationImages: state.certificationImages,
      certificationPreview: state.certificationPreview,
      certificationView: state.certificationView,
    })),
  );

  const addCertification = useExpertStore((state) => state.addCertification);

  const updateCertification = useExpertStore(
    (state) => state.updateCertification,
  );
  const removeCertification = useExpertStore(
    (state) => state.removeCertification,
  );
  const updateCertificationImage = useExpertStore(
    (state) => state.updateCertificationImage,
  );
  const removeCertificationImage = useExpertStore(
    (state) => state.removeCertificationImage,
  );
  const toggleCertificationView = useExpertStore(
    (state) => state.toggleCertificationView,
  );

  const handleCertificateFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const error = validateImage(file);
    if (error) return toast.error(error);

    const preview = URL.createObjectURL(file);

    updateCertificationImage(index, file, preview);
  };

  return {
    certificationPreview,
    certificationView,
    certifications,
    certificationImages,
    addCertification,
    updateCertification,
    removeCertification,
    removeCertificationImage,
    toggleCertificationView,
    handleCertificateFile,
  };
};
