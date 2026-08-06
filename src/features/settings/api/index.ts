import { axiosInstance } from "@/lib/axiosInstance";
import { UserSettingsFormValues } from "../types";
import { UserExpertService } from "../types/expertService";
import { removeNumberCommas } from "@/lib/helpers/formatNumbers";

export const updateUserSettings = async (payload: UserSettingsFormValues) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const { data } = await axiosInstance.post("/auth/add-profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const uploadUserProfileImage = async (image: File) => {
  const formData = new FormData();
  formData.append("image", image);

  const { data } = await axiosInstance.post("/auth/upload-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
};

export const deactivateUser = async () => {
  const { data } = await axiosInstance.patch("/auth/deactivate-user");
  return data;
};

export const updateExpertBusiness = async (business: UserExpertService) => {
  const formData = new FormData();
  const appendArray = (key: string, values: string[]) => values.forEach((value, index) => formData.append(`${key}[${index}]`, value));
  appendArray("services", business.services);
  appendArray("coverageArea", business.coverageArea);
  business.businessImageFiles?.forEach((image) => formData.append("businessImages", image));
  business.certifications.forEach((item, index) => Object.entries(item).forEach(([key, value]) => formData.append(`certification[${index}][${key}]`, String(value))));
  business.memberships.forEach((item, index) => Object.entries(item).forEach(([key, value]) => formData.append(`membership[${index}][${key}]`, String(value))));
  business.insurances.forEach((item, index) => Object.entries(item).forEach(([key, value]) => formData.append(`insurance[${index}][${key}]`, String(value))));
  Object.entries(business).forEach(([key, value]) => { if (!["id", "services", "coverageArea", "certifications", "memberships", "insurances", "businessImages", "businessImageFiles"].includes(key) && typeof value !== "object") formData.append(key, key === "startingPrice" ? removeNumberCommas(String(value)) : String(value)); });
  const { data } = await axiosInstance.patch(`/business/update-business/${business.id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
  return data;
};
