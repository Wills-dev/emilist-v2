import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ProfileRouteSkeleton from "@/features/profiles/components/ProfileRouteSkeleton/ProfileRouteSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <ProfileRouteSkeleton dashboard />
    </DashboardLayout>
  );
}
