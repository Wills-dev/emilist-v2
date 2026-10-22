import { axiosInstance } from "@/lib/axiosInstance";
import type { NewExpertFormType } from "@/features/experts/types";
import { buildExpertFormData } from "../helpers/buildExpertFormData";

export const createExpert = async (payload: NewExpertFormType) => {
  const formData = buildExpertFormData(payload);
  const { data } = await axiosInstance.post("/business/register-business", formData);
  return data;
};
