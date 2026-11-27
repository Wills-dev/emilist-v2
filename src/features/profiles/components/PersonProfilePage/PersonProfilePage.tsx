"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/atoms/BackButton/BackButton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import Container from "@/components/atoms/Container/Container";
import { usePublicUserProfile } from "../../hooks/usePublicUserProfile";
import { resolveManageJobsTab } from "@/features/jobs/helpers/manageJobs";
import { routes } from "@/lib/helpers/routes";
import type { ProfileKind } from "../../types/index";
import ProfileSkeleton from "../ProfileSkeleton/ProfileSkeleton";
import PersonProfileView from "../PersonProfileView/PersonProfileView";

export default function PersonProfilePage({
  id,
  kind,
  dashboard = false,
  reviewsPage = false,
}: {
  id: string;
  kind: ProfileKind;
  dashboard?: boolean;
  reviewsPage?: boolean;
}) {
  const query = useSearchParams();
  const jobId = kind === "employer" ? (query.get("jobId") ?? "") : "";
  const materialId = kind === "merchant" ? (query.get("materialId") ?? "") : "";
  const tab = resolveManageJobsTab(query.get("tab"));
  const profileQuery = usePublicUserProfile(id, kind);
  const profile = profileQuery.data;
  const params = new URLSearchParams();
  if (jobId) params.set("jobId", jobId);
  if (materialId) params.set("materialId", materialId);
  const publicQuery = params.size ? `?${params}` : "";
  if (dashboard && tab !== "listed") params.set("tab", tab);
  const suffix = params.size ? `?${params}` : "";
  const base = `${dashboard ? "/dashboard" : ""}/profiles/${kind}/${encodeURIComponent(id)}`;
  const backHref = jobId
    ? dashboard
      ? routes.dashboardLinks.jobInfo(jobId, tab)
      : routes.marketplace.jobInfo(jobId)
    : materialId
      ? dashboard
        ? routes.dashboardLinks.materialInfo(materialId)
        : routes.marketplace.materialInfo(materialId)
      : undefined;
  if (profileQuery.isPending)
    return <ProfileSkeleton dashboard={dashboard} reviewsPage={reviewsPage} />;
  if (profileQuery.isError || !profile)
    return (
      <Container variant="small" className="space-y-4 py-6">
        <BackButton href={backHref} isDashboard={dashboard} />
        <EmptyState
          title="Profile unavailable"
          description="This profile could not be loaded."
          actionLabel="Try again"
          onAction={() => void profileQuery.refetch()}
        />
      </Container>
    );
  return (
    <PersonProfileView
      profile={profile}
      profileHref={`${base}${suffix}`}
      reviewsHref={`${base}/reviews${suffix}`}
      shareHref={`/profiles/${kind}/${encodeURIComponent(id)}${publicQuery}`}
      backHref={backHref}
      reviewsPage={reviewsPage}
      dashboard={dashboard}
    />
  );
}
