export type DashboardPeriod = "week" | "month" | "year" | "all";

export interface DashboardOverview {
  generatedAt: string;

  user: {
    _id: string;
    firstName?: string;
    lastName?: string;
    fullName?: string;
    userName?: string;
    uniqueId: string;
    displayImage?: string | null;
    greetingName: string;
  };

  subscription: {
    planName: string;
    status: string | null;
    isPro: boolean;
  };

  newJobApplications: {
    count: number;
    newToday: number;
    percentChangeToday: number;
  };

  upcomingPayments: {
    amount: number;
    currency: string;
    totalsByCurrency: Record<string, number>;
    period: string;
  };

  jobCompletionRate: {
    rate: number;
    percentChangeToday: number;
  };

  jobCompletion: {
    completed: number;
    pending: number;
    overdue: number;

    counts: {
      completed: number;
      pending: number;
      overdue: number;
      total: number;
    };

    period: DashboardPeriod;
    periodLabel: string;

    range: {
      startDate: string | null;
      endDate: string;
    };

    availablePeriods: DashboardPeriod[];
  };

  spotlight: null | {
    businessId: string;
    businessName: string;
    services: string[];
    expertType: string;

    user: {
      _id: string;
      fullName?: string;
      userName?: string;
      displayImage?: string | null;
      level?: string;
    };

    averageRating: number;
    totalReviews: number;
  };

  referral: {
    code: string;
    link: string;
    qrValue: string;
    invitedCount: number;
    sharedCount: number;
    shareText: string;
  };
}
