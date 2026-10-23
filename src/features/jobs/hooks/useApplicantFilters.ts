"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { APPLICATION_STATUSES, type ApplicationStatus } from "../types/applicants";
import { POST_JOB_EXPERIENCE_OPTIONS } from "../constants/postJob";

export const useApplicantFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageInput = Number(searchParams.get("page") ?? 1);
  const page = Number.isSafeInteger(pageInput) && pageInput > 0 ? pageInput : 1;
  const limitInput = Number(searchParams.get("limit") ?? 4);
  const limit = [4, 8, 12, 20].includes(limitInput) ? limitInput : 4;
  const statusInput = searchParams.get("applicantStatus") ?? "";
  const status: ApplicationStatus | "" = APPLICATION_STATUSES.includes(statusInput as ApplicationStatus) ? statusInput as ApplicationStatus : "";
  const experienceInput = searchParams.get("experienceLevel") ?? "";
  const experienceLevel = POST_JOB_EXPERIENCE_OPTIONS.some((option) => option.value === experienceInput) ? experienceInput : "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    if (key !== "page") params.set("page", "1");
    params.set("section", "applicants");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  return {
    page, limit, status, experienceLevel,
    setPage: (value: number) => update("page", String(value)),
    setLimit: (value: number) => update("limit", String(value)),
    setStatus: (value: string) => update("applicantStatus", value),
    setExperienceLevel: (value: string) => update("experienceLevel", value),
  };
};
