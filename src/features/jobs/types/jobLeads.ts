import type { FetchAllJobsPage } from "./listJobs";

export interface JobLeadsQuery {
  page: number;
  limit: number;
}

// Uses the jobs API's shared page envelope; validate it at the API boundary.
export interface JobLeadsEnvelope {
  message: string;
  data: FetchAllJobsPage;
}
