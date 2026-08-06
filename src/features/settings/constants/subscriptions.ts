import {
  SubscriptionHistoryItem,
  SubscriptionPlan,
} from "../types/subscription";

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 0,
    yearlyPrice: 0,
    status: "inactive",
    billingProgress: "30/30",
    color: "#737774",
    features: ["Core tools for starting a new business", "Community access"],
  },
  {
    id: "silver",
    name: "Silver",
    monthlyPrice: 24000,
    yearlyPrice: 240000,
    status: "active",
    billingProgress: "Day 2 of 30",
    color: "#BFC3C0",
    features: [
      "Everything in Basic",
      "Priority marketplace access",
      "Business insights",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    monthlyPrice: 32000,
    yearlyPrice: 320000,
    color: "#F9D94C",
    features: [
      "Everything in Silver",
      "Advanced reports",
      "Promotional tools",
      "Priority support",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    monthlyPrice: 48000,
    yearlyPrice: 480000,
    color: "#7075FF",
    features: [
      "Everything in Gold",
      "Unlimited listings",
      "Team access",
      "Dedicated support",
      "Premium analytics",
    ],
  },
];

export const subscriptionSummaryPlans = ["silver", "basic", "gold"]
  .map((id) => subscriptionPlans.find((plan) => plan.id === id))
  .filter((plan): plan is SubscriptionPlan => Boolean(plan));

export const subscriptionHistory: SubscriptionHistoryItem[] = [
  {
    id: "inv-06",
    issueDate: "01/07/2026",
    amount: 24000,
    description: "July Subscription",
    receipt: "July_Inv.pdf",
    status: "Paid",
    datePaid: "04/07/2026",
  },
  {
    id: "inv-05",
    issueDate: "01/06/2026",
    amount: 24000,
    description: "June Subscription",
    receipt: "June_Inv.pdf",
    status: "Paid",
    datePaid: "03/06/2026",
  },
  {
    id: "inv-04",
    issueDate: "01/05/2026",
    amount: 24000,
    description: "May Subscription",
    receipt: "May_Inv.pdf",
    status: "Paid",
    datePaid: "02/05/2026",
  },
  {
    id: "inv-03",
    issueDate: "01/04/2026",
    amount: 24000,
    description: "April Subscription",
    receipt: "April_Inv.pdf",
    status: "Paid",
    datePaid: "04/04/2026",
  },
  {
    id: "inv-02",
    issueDate: "02/03/2026",
    amount: 24000,
    description: "March Subscription",
    receipt: "March_Inv.pdf",
    status: "Paid",
    datePaid: "03/03/2026",
  },
  {
    id: "inv-01",
    issueDate: "01/02/2026",
    amount: 24000,
    description: "February Subscription",
    receipt: "Feb_Inv.pdf",
    status: "Paid",
    datePaid: "02/02/2026",
  },
];
