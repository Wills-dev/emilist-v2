export type ReportCurrency =
  | "NGN"
  | "USD"
  | "EUR"
  | "GBP"
  | "CAD";

export type ReportRange =
  | "month"
  | "year"
  | "last7days"
  | "last30days"
  | "last90days"
  | "custom";

export interface ReportFilters {
  startDate: string;
  endDate: string;
  year: number;
  month: number | null;
  range: ReportRange;
  label: string;
  currency: ReportCurrency;
}

export interface JobsReport {
  total: number;
  active: number;
  pending: number;
  completed: number;
  overdue: number;
  distribution: {
    active: number;
    pending: number;
    completed: number;
    overdue: number;
  };
  hasRecords: boolean;
}

export interface ApplicationSummary {
  total: number;
  hired: number;
  rehired: number;
  flagged: number;
  pending: number;
  rejected: number;
}

export interface ApplicationsReport {
  applicants: ApplicationSummary;
  myApplications: ApplicationSummary;
  flaggedTrackingAvailable: boolean;
}

export interface FinanceReport {
  currency: ReportCurrency;
  availableCurrencies: ReportCurrency[];

  earnings: {
    total: number;
    categories: {
      jobs: number;
      materials: number;
      referrals: number;
      others: number;
    };
  };

  expenses: {
    total: number;
    categories: {
      jobs: number;
      materials: number;
      promotions: number;
      others: number;
    };
  };
}

export interface OrderSummary {
  total: number;
  completed: number;
  pending: number;
  cancelled: number;
  returned: number;
}

export interface SalesSummary extends OrderSummary {
  ongoing: number;
}

export interface TradeReport {
  orders: OrderSummary;
  sales: SalesSummary;
}

export interface TargetValues {
  jobs: number;
  amount: number;
  referrals: number;
  invites: number;
}

export interface TargetProgress extends TargetValues {
  overall: number;
}

export interface ReportTarget {
  configured: boolean;
  id?: string;
  duration: "monthly" | "yearly";
  currency: ReportCurrency;
  year?: number;
  month?: number | null;

  goals: TargetValues;
  actual: TargetValues;
  progress: TargetProgress;
}

export interface InsightsReport {
  overview: {
    impressions: number;
    reach: number;
    saves: number;
    shares: number;
    clicks: number;
    contacts: number;
  };

  promotionDuration: {
    active: boolean;
    promotionId: string | null;
    totalDays: number;
    daysRemaining: number;
    daysUsed: number;
  };

  clicks: {
    trackedClicks: number;
    promotionClicks: number;
    total: number;
    limit: number | null;
    remaining: number | null;
  };

  targets: ReportTarget;

  trackingNote: string;
}

export interface UserReport {
  filters: ReportFilters;
  jobs: JobsReport;
  applications: ApplicationsReport;
  finance: FinanceReport;
  trade: TradeReport;
  insights: InsightsReport;
}

export interface ApiResponse<T> {
  message: string;
  data: T;
}

export interface FetchReportInput {
  year?: number;
  month?: number;
  range?: ReportRange;
  startDate?: string;
  endDate?: string;
  currency?: ReportCurrency;
}

export interface SaveTargetInput {
  duration: "monthly" | "yearly";
  year: number;
  month?: number;
  currency: ReportCurrency;

  job: number;
  amount: number;
  referrals: number;
  invites: number;
}

export type ReportEventType =
  | "impression"
  | "click"
  | "share"
  | "contact";

export type ReportResourceType =
  | "job"
  | "material"
  | "business"
  | "profile";

export interface RecordReportEventInput {
  type: ReportEventType;
  resourceType: ReportResourceType;
  resourceId?: string;
  subjectUserId?: string;
}
