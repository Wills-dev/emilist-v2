import { axiosInstance } from "@/lib/axiosInstance";
import type {
  ListedJobsEnvelope,
  ListedJobsQuery,
} from "../types/manageJobs";
import type { FetchAllJobsPage, FetchAllJobsWireParams } from "../types/listJobs";

export const FETCH_LISTED_JOBS_ENDPOINT = "/jobs/fetch-listed-jobs";

const normalizeText = (value?: string) => {
  const normalized = value?.trim();
  return normalized || undefined;
};

const positiveIntegerOr = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? Math.trunc(value) : fallback;

export const serializeListedJobsQuery = ({
  page,
  limit,
  search,
  title,
  location,
  category,
  service,
}: ListedJobsQuery): Pick<
  FetchAllJobsWireParams,
  "page" | "limit" | "search" | "title" | "location" | "category" | "service"
> => {
  const params: Pick<FetchAllJobsWireParams, "page" | "limit"> = {
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

export const fetchListedJobs = async (
  query: ListedJobsQuery,
  signal?: AbortSignal,
): Promise<FetchAllJobsPage> => {
  const response = await axiosInstance.get<ListedJobsEnvelope>(
    FETCH_LISTED_JOBS_ENDPOINT,
    {
      params: serializeListedJobsQuery(query),
      signal,
    },
  );

  const page = response.data?.data;
  if (!page || !Array.isArray(page.jobs)) {
    throw new Error(
      "The listed-jobs response did not include a valid jobs page.",
    );
  }

  return page;
};
