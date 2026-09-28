"use client";
import { useParams } from "next/navigation";
import ProfileSkeleton from "../ProfileSkeleton/ProfileSkeleton";
export default function ProfileRouteSkeleton({
  dashboard = false,
  reviewsPage = false,
}: {
  dashboard?: boolean;
  reviewsPage?: boolean;
}) {
  const params = useParams();
  return (
    <ProfileSkeleton
      dashboard={dashboard}
      reviewsPage={reviewsPage}
      artisan={params.kind === "artisan"}
    />
  );
}
