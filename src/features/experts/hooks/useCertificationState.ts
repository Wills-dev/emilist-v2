import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";

import { validateImage } from "@/lib/helpers/imageValidation";
import { useExpertStore } from "@/store/expert/expertStore";
import { isEmptyCertification } from "../helpers/validateCertifications";

export const useCertificationState = () => {
  const { certificationView, certifications } = useExpertStore(
    useShallow((state) => ({
      certifications: state.certifications,
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

  const resetCertification = useExpertStore(
    (state) => state.resetCertification,
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

  const validCertifications = certifications.filter(
    (cert) => !isEmptyCertification(cert),
  );

  const certificationsPayload = certifications.map(
    ({ image, preview, ...rest }) => rest,
  );

  const certificate = certifications.map(({ image }) => image) || [];

  return {
    resetCertification,
    certificationView,
    certifications,
    addCertification,
    updateCertification,
    removeCertification,
    removeCertificationImage,
    toggleCertificationView,
    handleCertificateFile,
    validCertifications,
    certificate,
    certificationsPayload,
  };
};
