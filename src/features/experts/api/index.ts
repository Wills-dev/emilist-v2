import { axiosInstance } from "@/lib/axiosInstance";
import { NewExpertFormType } from "@/features/experts/types";

export const createExpert = async ({
  profile,
  displayImage,
  businessImages,
  business,
  certificate,
}: NewExpertFormType) => {
  try {
    const formData = new FormData();

    formData.append("profile", JSON.stringify(profile));
    formData.append("business", JSON.stringify(business));

    businessImages.forEach((image) => {
      formData.append("businessImages", image);
    });

    if (displayImage) {
      formData.append("displayImage", displayImage);
    }

    certificate?.forEach((file, index) => {
      if (file) {
        formData.append(` certificate_[${index}]`, file);
      }
    });

    const url = `/business/register-business`;
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
