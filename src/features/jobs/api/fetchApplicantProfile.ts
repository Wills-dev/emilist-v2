import { fetchApplicants } from "./fetchApplicants";

// Profile routes carry a business ID; messaging always uses the applicant's user ID.
export const fetchApplicantProfile = async (jobId: string, expertId: string, signal?: AbortSignal) => {
  let page = 1;
  while (true) {
    const result = await fetchApplicants({ jobId, page, limit: 20 }, signal);
    const applicant = result.applicants.find((item) =>
      item.businessId === expertId || item.user?._id === expertId || item._id === expertId,
    );
    if (applicant) return applicant;
    if (!result.applicants.length || result.page * result.limit >= result.total) return null;
    if (result.page !== page) throw new Error("Unable to load the next applicants page.");
    page += 1;
  }
};
