import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import Container from "@/components/atoms/Container/Container";
import SupportSkeleton from "@/features/support/components/SupportSkeleton/SupportSkeleton";
export default function Loading() { return <DashboardLayout><Container variant="small" className="py-4"><SupportSkeleton detail /></Container></DashboardLayout>; }
