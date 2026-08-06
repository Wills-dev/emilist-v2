export interface SubscriptionPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  status?: "active" | "inactive";
  billingProgress?: string;
  color: string;
}

export interface SubscriptionHistoryItem {
  id: string;
  issueDate: string;
  amount: number;
  description: string;
  receipt: string;
  status: "Paid" | "Pending";
  datePaid: string;
}
