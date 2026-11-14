export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  currency?: string;
  description?: string;
  features: string[];
  status?: "active" | "inactive";
  billingProgress?: string;
  color: string;
}

export interface SubscriptionHistoryItem {
  id: string;
  issueDate: string;
  amount?: number;
  currency?: string;
  description: string;
  receipt: string;
  status: string;
  datePaid: string;
}
