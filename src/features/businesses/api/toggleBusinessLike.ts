import { axiosInstance } from "@/lib/axiosInstance";

export const toggleBusinessLike = async (businessId: string, liked: boolean) => {
  const { data } = await axiosInstance.patch(`/business/${liked ? "like-business" : "unlike-business"}/${encodeURIComponent(businessId)}`);
  if (data?.success === false || data?.status === false) throw new Error(data.message || "Unable to update this business.");
  return data;
};
