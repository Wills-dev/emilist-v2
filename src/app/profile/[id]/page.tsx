import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
import { Suspense } from "react";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PersonProfilePage from "@/features/profiles/components/PersonProfilePage/PersonProfilePage";
export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <MainLayout>
      <Suspense fallback={<ProfileSkeleton />}>
        <PersonProfilePage id={id} kind="user" />
      </Suspense>
    </MainLayout>
  );
}
