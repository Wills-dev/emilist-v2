import { axiosInstance } from "@/lib/axiosInstance";
import { UserSettingsFormValues } from "../types";

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
