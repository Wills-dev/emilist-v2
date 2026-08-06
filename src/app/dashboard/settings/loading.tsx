import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import UserSettingsSkeleton from "@/features/settings/components/UserSettingsSkeleton/UserSettingsSkeleton";

const UserSettingsLoading = () => (
  <DashboardLayout>
    <UserSettingsSkeleton />
  </DashboardLayout>
);

export default UserSettingsLoading;
