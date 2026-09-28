import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
export default function Loading() {
  return (
    <DashboardLayout>
      <ProfileSkeleton dashboard artisan />
    </DashboardLayout>
  );
}
