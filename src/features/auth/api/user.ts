import { axiosInstance } from "@/lib/axiosInstance";

import { CompleteProfileForm } from "../types";

export const updateProfileRequest = async (payload: CompleteProfileForm) => {
  try {
    const formData = new FormData();

    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("countryCode", payload.countryCode);
    formData.append("mobile", payload.mobile);
    formData.append("houseAddress", payload.houseAddress);
    formData.append("state", payload.state);
    formData.append("city", payload.city);
    formData.append("country", payload.country);
    formData.append("bio", payload.bio);

    payload.language.forEach((lang) => {
      formData.append("language", lang);
    });

    if (payload.image) {
      formData.append("image", payload.image);
    }
    const url = `/auth/add-profile`;
    const { data } = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data?.data;
  } catch (error) {
    throw error;
  }
};
