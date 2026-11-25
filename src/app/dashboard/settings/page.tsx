import { createPageMetadata } from "@/lib/seo/metadata";
import { Suspense } from "react";
import UserSettingsSkeleton from "@/features/settings/components/UserSettingsSkeleton/UserSettingsSkeleton";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import UserSettingsWrapper from "@/features/settings/components/UserSettingsWrapper/UserSettingsWrapper";

export const metadata = createPageMetadata({"title": "Settings", "description": "Settings on Emilist.", "index": false});



const UserSettingsPage = () => (
  <DashboardLayout>
    <Suspense fallback={<UserSettingsSkeleton />}><UserSettingsWrapper /></Suspense>
  </DashboardLayout>
);

export default UserSettingsPage;
