export interface JobAnalyticsQuery {
  startDate?: string;
  endDate?: string;
  year?: number;
  month?: number;
}

export interface JobAnalytics {
  totalJobs: number;
  totalActiveJobs: number;
  totalCompletedJobs: number;
  totalOverdueJobs: number;
}
