import { toast } from "sonner";
import { Certification } from "../types";

export const validateCertifications = (certifications: Certification[]) => {
  for (let i = 0; i < certifications.length; i++) {
    const cert = certifications[i];

    const hasAnyValue =
      cert.issuingOrganisation ||
      cert.verificationNumber ||
      cert.issuingDate ||
      cert.expiringDate ||
      cert.image;

    if (hasAnyValue) {
      if (!cert.issuingOrganisation)
        return toast.error(
          `Certificate ${i + 1}: Issuing organisation is required`,
        );

      if (!cert.verificationNumber)
        return toast.error(
          `Certificate ${i + 1}: Verification number is required`,
        );

      if (!cert.issuingDate)
        return toast.error(`Certificate ${i + 1}: Issuing date is required`);

      if (!cert.isCertificateExpire && !cert.expiringDate) {
        return toast.error(
          `Certificate ${i + 1}: Provide expiry date or mark as doesn't expire.`,
        );
      }
    }
  }

  return true;
};

export const isEmptyCertification = (cert: Certification) => {
  return (
    !cert.issuingOrganisation &&
    !cert.verificationNumber &&
    !cert.issuingDate &&
    !cert.expiringDate &&
    !cert.isCertificateExpire &&
    !cert.image
  );
};
