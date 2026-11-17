"use client";

import Container from "@/components/atoms/Container/Container";
import BackButton from "@/components/atoms/BackButton/BackButton";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import ProfileSkeleton from "@/features/profiles/components/ProfileSkeleton/ProfileSkeleton";
import DashboardExpertInfoWrapper from "@/features/experts/components/DashboardExpertInfoWrapper/DashboardExpertInfoWrapper";
import DashboardExpertReviews from "@/features/experts/components/DashboardExpertReviews/DashboardExpertReviews";
import { useApplicantProfile } from "../../hooks/useApplicantProfile";

const ApplicantProfilePage = ({ jobId, expertId, tab, reviewsPage = false }: {
  jobId: string; expertId: string; tab: string; reviewsPage?: boolean;
}) => {
  const profile = useApplicantProfile(jobId, expertId, tab);
  if (profile.loading) return <ProfileSkeleton dashboard artisan reviewsPage={reviewsPage} />;
  if (profile.error || !profile.details) return (
    <Container variant="small" className="space-y-4 py-4">
      <BackButton isDashboard href={reviewsPage ? profile.profileHref : profile.backHref} />
      <EmptyState title="Applicant details unavailable" description="This applicant could not be loaded." actionLabel="Try again" onAction={profile.retry} />
    </Container>
  );
  return reviewsPage ? (
    <DashboardExpertReviews expertId={expertId} jobContext={{ jobId, tab }} details={profile.details} />
  ) : (
    <DashboardExpertInfoWrapper expertId={expertId} jobContext={{ jobId, tab }} details={profile.details} />
  );
};

export default ApplicantProfilePage;
