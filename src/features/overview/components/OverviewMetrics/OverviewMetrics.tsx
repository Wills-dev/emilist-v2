import DashboardMetricCard from "../DashboardMetricCard/DashboardMetricCard";
import { DashboardMetric } from "../../types";
import { routes } from "@/lib/helpers/routes";

const metrics: DashboardMetric[] = [
  {
    id: "applications",
    title: "New Job Applications",
    context: "applicants",
    linkLabel: "Manage Applications",
    href: routes.dashboardLinks.jobs,
  },
  {
    id: "payments",
    title: "Upcoming Payments",
    context: "this week",
    linkLabel: "Make Payment",
    href: routes.dashboardLinks.payments,
  },
  {
    id: "completion",
    title: "Job Completion Rate",
    suffix: "%",
    context: "",
    linkLabel: "Manage Active Jobs",
    href: routes.dashboardLinks.jobs,
  },
];

const OverviewMetrics = ({ data }: { data: import("../../types/api").DashboardOverview }) => {
  const payments = Object.entries(data.upcomingPayments.totalsByCurrency);
  const values: Partial<DashboardMetric>[] = [
    { value: String(data.newJobApplications.count) },
    { value: (payments.length ? payments : [[data.upcomingPayments.currency, data.upcomingPayments.amount] as const]).map(([currency, amount]) => new Intl.NumberFormat("en-NG", { style: "currency", currency }).format(amount)).join(" / "), context: data.upcomingPayments.period },
    { value: String(data.jobCompletionRate.rate) },
  ];
  return (
  <section className="grid gap-3 sm:grid-cols-3">
    {metrics.map((metric, index) => (
      <DashboardMetricCard key={metric.id} metric={{ ...metric, ...values[index] }} />
    ))}
  </section>
);
};

export default OverviewMetrics;
