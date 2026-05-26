import { axiosInstance } from "../axiosInstance";

export const newsLetter = async ({ email }: { email: string }) => {
  try {
    const url = "";
    const { data } = await axiosInstance.post(url, { email });
    return data;
  } catch (error) {
    throw error;
  }
};
