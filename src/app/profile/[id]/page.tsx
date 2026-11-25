import { createPageMetadata } from "@/lib/seo/metadata";
import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
import { Suspense } from "react";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PersonProfilePage from "@/features/profiles/components/PersonProfilePage/PersonProfilePage";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const values = await params;
  return createPageMetadata({"title": "Profile", "description": "Profile on Emilist.", "index": false, "path": `/profile/${encodeURIComponent(values.id)}`});
}
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
