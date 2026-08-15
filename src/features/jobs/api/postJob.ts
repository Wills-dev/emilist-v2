import { axiosInstance } from "@/lib/axiosInstance";
import { PostJobWriteDto } from "../types/postJob";

export const CREATE_JOB_ENDPOINT = "/jobs/create-job";

const appendJson = (formData: FormData, key: string, value: unknown) => {
  formData.append(key, JSON.stringify(value));
};

export const serializePostJob = (payload: PostJobWriteDto) => {
  const formData = new FormData();

  formData.append("jobCategory", payload.jobCategory);
  formData.append("service", payload.service);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("jobUrgency", payload.jobUrgency);
  appendJson(formData, "location", payload.location);
  appendJson(formData, "milestones", payload.milestones);

  if (payload.expertId) {
    formData.append("expertId", payload.expertId);
  } else {
    if (payload.allowBidding !== undefined) {
      formData.append("allowBidding", String(payload.allowBidding));
    }
    if (payload.experienceLevel) {
      formData.append("experienceLevel", payload.experienceLevel);
    }
  }

  if (payload.totalBudget) {
    appendJson(formData, "totalBudget", payload.totalBudget);
  }
  if (payload.estimatedBudget) {
    appendJson(formData, "estimatedBudget", payload.estimatedBudget);
  }
  if (payload.recurringBudget) {
    appendJson(formData, "recurringBudget", payload.recurringBudget);
  }
  if (payload.jobDuration) {
    appendJson(formData, "jobDuration", payload.jobDuration);
  }
  if (payload.jobSchedule) {
    appendJson(formData, "jobSchedule", payload.jobSchedule);
  }
  if (payload.jobFrequency) {
    formData.append("jobFrequency", payload.jobFrequency);
  }
  if (payload.startDate) {
    formData.append("startDate", payload.startDate);
  }
  if (payload.endDate) {
    formData.append("endDate", payload.endDate);
  }

  payload.files?.forEach((file) => formData.append("files", file));
  return formData;
};

export const postJob = async (payload: PostJobWriteDto) => {
  const formData = serializePostJob(payload);
  const { data } = await axiosInstance.post(CREATE_JOB_ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data?.data ?? data;
};
