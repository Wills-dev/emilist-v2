import { isAxiosError } from "axios";
import { axiosInstance } from "@/lib/axiosInstance";
import type { JobLeadsEnvelope, JobLeadsQuery } from "../types/jobLeads";
import type { FetchAllJobsPage } from "../types/listJobs";

export const FETCH_JOB_LEADS_ENDPOINT = "/jobs/leads";

export const isJobLeadsSubscriptionError = (error: unknown) => {
  if (!isAxiosError(error)) return false;
  const status = error.response?.status;
  if (status === 402 || status === 403) return true;
  const message = error.response?.data?.message;
  return status === 400 && typeof message === "string" && /^basic subscription does not include the ability to fetch leads\.?$/i.test(message.trim());
};

export const serializeJobLeadsQuery = ({ page, limit }: JobLeadsQuery) => ({
  page: Number.isFinite(page) && page >= 1 ? Math.trunc(page) : 1,
  limit: Number.isFinite(limit) && limit >= 1 ? Math.trunc(limit) : 10,
});

export const fetchJobLeads = async (
  query: JobLeadsQuery,
  signal?: AbortSignal,
): Promise<FetchAllJobsPage> => {
  const response = await axiosInstance.get<JobLeadsEnvelope>(
    FETCH_JOB_LEADS_ENDPOINT,
    {
      params: serializeJobLeadsQuery(query),
      signal,
    },
  );
  const page = response.data?.data;
  if (
    !page ||
    !Array.isArray(page.jobs) ||
    !Number.isInteger(page.currentPage) ||
    !Number.isInteger(page.totalPages)
  ) {
    throw new Error(
      "The job-leads response did not include a valid jobs page.",
    );
  }
  return page;
};
