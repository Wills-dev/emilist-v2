import { axiosInstance } from "@/lib/axiosInstance";
import type { ApplicantsPage, FetchApplicantsQuery } from "../types/applicants";

export const fetchApplicants = async (query: FetchApplicantsQuery, signal?: AbortSignal): Promise<ApplicantsPage> => {
  const { data } = await axiosInstance.get<{ message: string; data: ApplicantsPage }>("/jobs/fetch-applicants", { params: query, signal });
  const page = data.data;
  if (!page || !Array.isArray(page.applicants) || !Number.isFinite(page.total) || page.total < 0 || !Number.isFinite(page.page) || page.page < 1 || !Number.isFinite(page.limit) || page.limit < 1) {
    throw new Error("The applicants response did not contain a valid page.");
  }
  return page;
};
