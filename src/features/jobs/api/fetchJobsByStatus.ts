import { axiosInstance } from "@/lib/axiosInstance";
import type {
  JobsByStatusEnvelope,
  JobsByStatusPage,
  JobsByStatusQuery,
} from "../types/manageJobs";
import type { FetchAllJobsWireParams } from "../types/listJobs";

export const FETCH_JOBS_BY_STATUS_ENDPOINT = "/jobs/fetch-jobs-by-status";

const normalizeText = (value?: string) => {
  const normalized = value?.trim();
  return normalized || undefined;
};

const positiveIntegerOr = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? Math.trunc(value) : fallback;

export const serializeJobsByStatusQuery = ({
  status,
  page,
  limit,
  search,
  title,
  location,
  category,
  service,
}: JobsByStatusQuery): Pick<
  FetchAllJobsWireParams,
  "page" | "limit" | "search" | "title" | "location" | "category" | "service"
> & { status: JobsByStatusQuery["status"] } => {
  const params: { status: JobsByStatusQuery["status"] } & Pick<
    FetchAllJobsWireParams,
    "page" | "limit"
  > = {
    status,
    page: positiveIntegerOr(page, 1),
    limit: positiveIntegerOr(limit, 10),
  };

  const optionalValues = {
    search: normalizeText(search),
    title: normalizeText(title),
    location: normalizeText(location),
    category: normalizeText(category),
    service: normalizeText(service),
  };

  Object.entries(optionalValues).forEach(([key, value]) => {
    if (value !== undefined) {
      Object.assign(params, { [key]: value });
    }
  });

  return params;
};

export const fetchJobsByStatus = async (
  query: JobsByStatusQuery,
  signal?: AbortSignal,
): Promise<JobsByStatusPage> => {
  const response = await axiosInstance.get<JobsByStatusEnvelope>(
    FETCH_JOBS_BY_STATUS_ENDPOINT,
    {
      params: serializeJobsByStatusQuery(query),
      signal,
    },
  );

  const page = response.data?.data;
  if (!page || !Array.isArray(page.jobs)) {
    throw new Error(
      "The jobs-by-status response did not include a valid jobs page.",
    );
  }

  return page;
};
