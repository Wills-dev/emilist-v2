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

const OverviewMetrics = () => (
  <section className="grid gap-3 sm:grid-cols-3">
    {metrics.map((metric) => (
      <DashboardMetricCard key={metric.id} metric={metric} />
    ))}
  </section>
);

export default OverviewMetrics;
