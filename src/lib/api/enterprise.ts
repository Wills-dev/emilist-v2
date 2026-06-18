import { axiosInstance } from "../axiosInstance";
import { ScheduledFormType } from "../types/enterprise";

export const scheduleRequest = async ({
  form,
  images,
}: {
  form: ScheduledFormType;
  images: File[];
}) => {
  try {
    const formData = new FormData();

    formData.append("form", JSON.stringify(form));

    images.forEach((file, index) => {
      formData.append(`image_${index}`, file);
    });

    const url = ``;

    const { data } = await axiosInstance.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
