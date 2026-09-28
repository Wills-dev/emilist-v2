import { axiosInstance } from "@/lib/axiosInstance";

export const REMOVE_JOB_FILE_ENDPOINT = (jobId: string, fileId: string) =>
  `/jobs/remove-job/${jobId}/file/${fileId}`;

export const removeJobFile = async ({
  jobId,
  fileId,
}: {
  jobId: string;
  fileId: string;
}) => {
  const { data } = await axiosInstance.delete(
    REMOVE_JOB_FILE_ENDPOINT(jobId, fileId),
  );
  return data?.data ?? data;
};
