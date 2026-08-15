import { axiosInstance } from "@/lib/axiosInstance";

export { postJob, serializePostJob } from "./postJob";

export const toggleLike = async ({ jobId }: { jobId: string }) => {
  try {
    const url = `/jobs/${jobId}/like`;
    const { data } = await axiosInstance.patch(url);
    return data;
  } catch (error) {
    throw error;
  }
};
