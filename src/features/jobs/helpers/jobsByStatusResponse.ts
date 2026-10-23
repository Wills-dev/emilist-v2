import type { JobsByStatusItemDto, JobsByStatusPage } from "../types/manageJobs";

export const normalizeJobsByStatusResponse = (
  data: JobsByStatusPage | JobsByStatusItemDto[],
  requestedPage: number,
  requestedLimit: number,
): JobsByStatusPage => {
  if (Array.isArray(data)) {
    const limit = Number.isFinite(requestedLimit) && requestedLimit > 0 ? Math.trunc(requestedLimit) : 10;
    const totalPages = Math.max(1, Math.ceil(data.length / limit));
    const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? Math.min(Math.trunc(requestedPage), totalPages) : 1;
    return {
      currentPage,
      totalPages,
      totalJobs: data.length,
      jobs: data.slice((currentPage - 1) * limit, currentPage * limit),
    };
  }
  if (!data || !Array.isArray(data.jobs)) {
    throw new Error("The jobs-by-status response did not include a valid jobs list.");
  }
  return data;
};
