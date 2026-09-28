import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import MainLayout from "@/components/templates/MainLayout/MainLayout";
import PersonProfilePage from "@/features/profiles/components/PersonProfilePage/PersonProfilePage";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ kind: string; id: string }>;
}) {
  const { kind, id } = await params;
  if (kind !== "artisan" && kind !== "employer" && kind !== "merchant")
    notFound();

  return (
    <MainLayout>
      <Suspense fallback={<ProfileSkeleton artisan={kind === "artisan"} />}>
        {kind === "artisan" ? (
          <DashboardExpertInfoWrapper
            expertId={id}
            publicPage={true}
            profilePage
          />
        ) : (
          <PersonProfilePage
            id={id}
            kind={kind}
            dashboard={false}
            reviewsPage={false}
          />
        )}
      </Suspense>
    </MainLayout>
  );
}
