import MainLayout from "@/components/templates/MainLayout/MainLayout";
import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
export default function Loading() {
  return (
    <MainLayout>
      <ProfileSkeleton />
    </MainLayout>
  );
}
