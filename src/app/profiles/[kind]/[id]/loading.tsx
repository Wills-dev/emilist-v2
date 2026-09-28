import MainLayout from "@/components/templates/MainLayout/MainLayout";
import ProfileRouteSkeleton from "@/features/profiles/components/ProfileRouteSkeleton/ProfileRouteSkeleton";
export default function Loading() {
  return (
    <MainLayout>
      <ProfileRouteSkeleton />
    </MainLayout>
  );
}
