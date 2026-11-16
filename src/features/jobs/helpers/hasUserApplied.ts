import type { JobListApplicationDto } from "../types/listJobs";

export const hasUserApplied = (applications: JobListApplicationDto[] | undefined, userId?: string) =>
  Boolean(userId && applications?.some((application) =>
    (typeof application.user === "string" ? application.user : application.user?._id) === userId,
  ));
