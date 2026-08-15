import { axiosInstance } from "@/lib/axiosInstance";
import type {
  FetchAllJobsEnvelope,
  FetchAllJobsPage,
  FetchAllJobsQuery,
  FetchAllJobsWireParams,
} from "../types/listJobs";

export const FETCH_ALL_JOBS_ENDPOINT = "/jobs/fetch-all-jobs";

const normalizeText = (value?: string) => {
  const normalized = value?.trim();
  return normalized || undefined;
};

const serializeMultiValue = (values?: readonly string[]) => {
  if (!values) return undefined;

  const normalized = [
    ...new Set(values.map((value) => value.trim()).filter(Boolean)),
  ].sort((left, right) => left.localeCompare(right));

  return normalized.length > 0 ? normalized.join(",") : undefined;
};

const positiveIntegerOr = (value: number, fallback: number) =>
  Number.isFinite(value) && value > 0 ? Math.trunc(value) : fallback;

export const serializeFetchAllJobsQuery = ({
  page,
  limit,
  search,
  title,
  location,
  category,
  service,
  userId,
  categories,
  locations,
  minBudget,
  maxBudget,
  jobUrgency,
  experienceLevel,
  minRating,
}: FetchAllJobsQuery): FetchAllJobsWireParams => {
  const params: FetchAllJobsWireParams = {
    page: positiveIntegerOr(page, 1),
    limit: positiveIntegerOr(limit, 10),
  };

  const optionalValues = {
    search: normalizeText(search),
    title: normalizeText(title),
    location: normalizeText(location),
    category: normalizeText(category),
    service: normalizeText(service),
    userId: normalizeText(userId),
    categories: serializeMultiValue(categories),
    locations: serializeMultiValue(locations),
    minBudget:
      Number.isFinite(minBudget) && Number(minBudget) >= 0
        ? Number(minBudget)
        : undefined,
    maxBudget:
      Number.isFinite(maxBudget) && Number(maxBudget) >= 0
        ? Number(maxBudget)
        : undefined,
    jobUrgency,
    experienceLevel: serializeMultiValue(experienceLevel),
    minRating:
      Number.isFinite(minRating) &&
      Number(minRating) >= 1 &&
      Number(minRating) <= 5
        ? Number(minRating)
        : undefined,
  };

  Object.entries(optionalValues).forEach(([key, value]) => {
    if (value !== undefined) {
      Object.assign(params, { [key]: value });
    }
  });

  return params;
};

export const fetchAllJobs = async (
  query: FetchAllJobsQuery,
  signal?: AbortSignal,
): Promise<FetchAllJobsPage> => {
  const response = await axiosInstance.get<FetchAllJobsEnvelope>(
    FETCH_ALL_JOBS_ENDPOINT,
    {
      params: serializeFetchAllJobsQuery(query),
      signal,
    },
  );

  if (process.env.NODE_ENV === "development") {
    console.log("[fetchAllJobs] response", response.data);
  }

  const page = response.data?.data;
  if (!page || !Array.isArray(page.jobs)) {
    throw new Error("The jobs response did not include a valid jobs page.");
  }

  return page;
};
