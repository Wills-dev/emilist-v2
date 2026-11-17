import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import ReportsSkeleton from "@/features/reports/components/ReportsSkeleton/ReportsSkeleton";
export default function ReportsLoading() {
  return <DashboardLayout><Container variant="small" className="space-y-4 py-4"><Skeleton className="h-9 w-64" /><Skeleton className="h-36 w-full" /><ReportsSkeleton /></Container></DashboardLayout>;
}
