import { NewExpertFormType } from "../types";

interface FileValidationResult {
  isValid: boolean;
  reason?: string;
}

export const validatePersistedFiles = (data: unknown): FileValidationResult => {
  const form = data as NewExpertFormType;

  if (form.businessImages.length === 0) {
    return { isValid: false, reason: "Business images are missing" };
  }

  return { isValid: true };
};
