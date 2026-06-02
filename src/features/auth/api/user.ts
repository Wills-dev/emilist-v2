import { axiosInstance } from "@/lib/axiosInstance";

import { UpdateProfilePayload } from "../types";

export const updateProfileRequest = async (payload: UpdateProfilePayload) => {
  try {
    const url = ``;
    const { data } = await axiosInstance.post(url, payload);
    return data?.data;
  } catch (error) {
    throw error;
  }
};
