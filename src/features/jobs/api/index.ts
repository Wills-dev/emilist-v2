import { axiosInstance } from "@/lib/axiosInstance";

export { postJob, serializePostJob } from "./postJob";
export {
  FETCH_ALL_JOBS_ENDPOINT,
  fetchAllJobs,
  serializeFetchAllJobsQuery,
} from "./fetchAllJobs";

export const toggleLike = async ({ jobId }: { jobId: string }) => {
  try {
    const url = `/jobs/${jobId}/like`;
    const { data } = await axiosInstance.patch(url);
    return data;
  } catch (error) {
    throw error;
  }
};
