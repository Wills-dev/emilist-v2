import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import DashboardLayout from "@/components/templates/DashboardLayout/DashboardLayout";
import PersonProfilePage from "@/features/profiles/components/PersonProfilePage/PersonProfilePage";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ kind: string; id: string }>;
}) {
  const { kind, id } = await params;
  if (kind !== "artisan" && kind !== "employer" && kind !== "merchant")
    notFound();
  return (
    <DashboardLayout>
      <Suspense
        fallback={
          <ProfileSkeleton dashboard reviewsPage artisan={kind === "artisan"} />
        }
      >
        {kind === "artisan" ? (
          <DashboardExpertReviews
            expertId={id}
            publicPage={false}
            profilePage
          />
        ) : (
          <PersonProfilePage
            id={id}
            kind={kind}
            dashboard={true}
            reviewsPage={true}
          />
        )}
      </Suspense>
    </DashboardLayout>
  );
}
