import { axiosInstance } from "@/lib/axiosInstance";
import type { ApplicationDetailsDto } from "../types/applicationDetails";

export const fetchApplicationById = async (applicationId: string, jobId: string, signal?: AbortSignal): Promise<ApplicationDetailsDto> => {
  const { data } = await axiosInstance.get<{ data: ApplicationDetailsDto }>(`/jobs/fetch-application-by-id/${encodeURIComponent(applicationId)}`, { signal });
  const application = data.data;
  if (application?._id !== applicationId || application.job?._id !== jobId || !application.user?._id || !application.creator?._id || !["job_owner", "applicant"].includes(application.participantRole) || !Array.isArray(application.bidHistory)) {
    throw new Error("The application response is invalid or belongs to a different job.");
  }
  return application;
};
