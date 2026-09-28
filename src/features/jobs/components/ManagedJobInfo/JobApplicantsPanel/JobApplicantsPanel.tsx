"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import PaginationPanel from "@/components/molecules/PaginationPanel/PaginationPanel";
import JobApplicantCard from "../../JobApplicantCard/JobApplicantCard";
import { routes } from "@/lib/helpers/routes";
import type { JobApplicant } from "../../../types/jobManagement";

export default function JobApplicantsPanel({
  applicants,
  count,
  jobId,
  budget,
  currency,
  originTab = "listed",
  onHire,
}: {
  applicants?: JobApplicant[];
  count: number;
  jobId: string;
  budget: number;
  currency: string;
  originTab?: string;
  onHire: (applicant: JobApplicant) => void;
}) {
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("latest");
  const [showFilters, setShowFilters] = useState(false);
  const filtered = useMemo(
    () =>
      (applicants ?? [])
        .filter(
          (applicant) =>
            (!level || applicant.level === level) &&
            (!location || applicant.location === location),
        )
        .toSorted((a, b) =>
          sort === "latest"
            ? b.appliedAt.localeCompare(a.appliedAt)
            : a.appliedAt.localeCompare(b.appliedAt),
        ),
    [applicants, level, location, sort],
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / 4));
  const currentPage = Math.min(page, totalPages);
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center gap-3 py-2 text-sm text-[#5E625F]">
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          aria-label="Toggle applicant filters"
          aria-expanded={showFilters}
          className="rounded-full bg-[#EDEEF0] px-3 py-1.5"
        >
          <SlidersHorizontal className="size-4" />
        </button>
        <div
          className={`${showFilters ? "flex" : "hidden sm:flex"} flex-wrap gap-3`}
        >
          <select
            aria-label="Experience level"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setPage(1);
            }}
            className="max-w-44 rounded-full bg-[#EDEEF0] px-3 py-1.5"
          >
            <option value="">Experience level</option>
            {[...new Set((applicants ?? []).map((a) => a.level))].map(
              (value) => (
                <option key={value}>{value}</option>
              ),
            )}
          </select>
          <select
            aria-label="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setPage(1);
            }}
            className="max-w-44 rounded-full bg-[#EDEEF0] px-3 py-1.5"
          >
            <option value="">Location</option>
            {[...new Set((applicants ?? []).map((a) => a.location))].map(
              (value) => (
                <option key={value}>{value}</option>
              ),
            )}
          </select>
        </div>
        <select
          aria-label="Sort applicants"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          className="ml-auto rounded-lg bg-[#EDEEF0] p-2"
        >
          <option value="latest">Showing latest</option>
          <option value="oldest">Showing oldest</option>
        </select>
      </div>
      <div className={filtered.length ? "space-y-6" : "bg-white p-3"}>
        {filtered.length === 0 ? (
          <EmptyState
            title={
              !applicants && count > 0
                ? "Applicant details unavailable"
                : "No applicants found"
            }
            description={
              !applicants && count > 0
                ? `${count} applications have been received. Applicant details are not available yet.`
                : ""
            }
            className="min-h-[60vh] border-0"
          />
        ) : (
          <>
            <div className="grid gap-5 xl:grid-cols-2">
              {filtered
                .slice((currentPage - 1) * 4, currentPage * 4)
                .map((applicant) => (
                  <JobApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    budget={budget}
                    currency={currency}
                    profileHref={routes.dashboardLinks.jobApplicantInfo(
                      jobId,
                      applicant.expertId ?? applicant.id,
                      originTab,
                    )}
                    reviewsHref={routes.dashboardLinks.jobApplicantReviews(
                      jobId,
                      applicant.expertId ?? applicant.id,
                      originTab,
                    )}
                    onHire={() => onHire(applicant)}
                  />
                ))}
            </div>
            <PaginationPanel
              variant="inline"
              page={currentPage}
              totalPages={totalPages}
              onPrev={() => setPage(currentPage - 1)}
              onNext={() => setPage(currentPage + 1)}
            />
          </>
        )}
      </div>
    </section>
  );
}
