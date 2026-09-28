"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/atoms/BackButton/BackButton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import Container from "@/components/atoms/Container/Container";
import { useGetJobById } from "@/features/jobs/hooks/useGetJobById";
import { useGetMaterialInfo } from "@/features/materials/hooks/useGetMaterialInfo";
import { resolveManageJobsTab } from "@/features/jobs/helpers/manageJobs";
import { routes } from "@/lib/helpers/routes";
import type { PersonProfile, ProfileKind } from "../../types/index";
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
  const jobQuery = useGetJobById(jobId);
  const materialQuery = useGetMaterialInfo(materialId);
  const job = jobQuery.data;
  const product = materialQuery.data?.product;
  const profile: PersonProfile | undefined =
    job && job.ownerId === id && kind === "employer"
      ? {
          id,
          kind,
          name: job.ownerName,
          image: job.ownerImage,
          username: job.ownerUsername,
          bio: job.ownerBio,
          verified: job.ownerVerified,
          rating: job.ownerRating,
          reviewCount: job.ownerReviewCount,
        }
      : product && product.userId._id === id && kind === "merchant"
        ? {
            id,
            kind,
            name: product.merchantName || product.storeName,
          }
        : undefined;
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
  if ((jobId && jobQuery.isPending) || (materialId && materialQuery.isLoading))
    return <ProfileSkeleton dashboard={dashboard} reviewsPage={reviewsPage} />;
  if (!profile)
    return (
      <Container variant="small" className="space-y-4 py-6">
        <BackButton href={backHref} isDashboard={dashboard} />
        <EmptyState
          title="Profile unavailable"
          description="This profile could not be loaded."
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
