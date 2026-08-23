import { axiosInstance } from "@/lib/axiosInstance";

export const likeJob = async (jobId: string) => {
  const { data } = await axiosInstance.post(`/jobs/like-job/${jobId}`);
  return data?.data;
};

export const unlikeJob = async (jobId: string) => {
  const { data } = await axiosInstance.post(`/jobs/unlike-job/${jobId}`);
  return data?.data;
};
