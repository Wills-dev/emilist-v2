import { axiosInstance } from "@/lib/axiosInstance";
import { appendPostJobFields } from "./postJob";
import { PostJobWriteDto } from "../types/postJob";

export const UPDATE_JOB_ENDPOINT = (jobId: string) =>
  `/jobs/update-job/${jobId}`;

export const serializeUpdateJob = (payload: PostJobWriteDto) =>
  appendPostJobFields(new FormData(), payload);

export const updateJob = async ({
  jobId,
  payload,
}: {
  jobId: string;
  payload: PostJobWriteDto;
}) => {
  const formData = serializeUpdateJob(payload);
  const { data } = await axiosInstance.put(
    UPDATE_JOB_ENDPOINT(jobId),
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return data?.data ?? data;
};
