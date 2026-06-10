import { NewExpertFormType } from "../types";

interface FileValidationResult {
  isValid: boolean;
  reason?: string;
}

export const validatePersistedFiles = (data: unknown): FileValidationResult => {
  const form = data as NewExpertFormType;

  if (form.displayImage !== undefined && !(form.displayImage instanceof File)) {
    return {
      isValid: false,
      reason: "Display image was lost due to page reload",
    };
  }

  if (!Array.isArray(form.businessImages) || form.businessImages.length === 0) {
    return { isValid: false, reason: "Business images are missing" };
  }

  const hasValidBusinessImages = form.businessImages.every(
    (f) => f instanceof File,
  );
  if (!hasValidBusinessImages) {
    return {
      isValid: false,
      reason: "Business images were lost due to page reload",
    };
  }

  if (form.certificate !== undefined && form.certificate.length > 0) {
    const hasValidCertificates = form.certificate.every(
      (f) => f instanceof File,
    );
    if (!hasValidCertificates) {
      return {
        isValid: false,
        reason: "Certificate images were lost due to page reload",
      };
    }
  }

  return { isValid: true };
};
