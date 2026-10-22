import type { NewExpertFormType } from "../types";

const omitEmptyOptionalDates = (key: string, value: unknown) =>
  (key === "expiringDate" || key === "endDate") &&
  typeof value === "string" && value.trim() === ""
    ? undefined
    : value;

export const buildExpertFormData = ({
  profile, business, displayImage, businessImages, certificate,
}: NewExpertFormType) => {
  const formData = new FormData();
  formData.append("profile", JSON.stringify(profile));
  formData.append("business", JSON.stringify(business, omitEmptyOptionalDates));

  if (displayImage) formData.append("displayImage", displayImage);
  businessImages.forEach((file) => formData.append("businessImages", file));
  certificate?.forEach((file, index) => {
    if (!file) return;
    if (!business.certifications?.[index]) {
      throw new Error(`Certificate file ${index + 1} has no matching certification.`);
    }
    formData.append(`certificate_${index}`, file);
  });
  return formData;
};
