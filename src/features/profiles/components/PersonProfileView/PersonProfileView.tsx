"use client";

import { useResourceTracking } from "@/features/reports/hooks/useResourceTracking";
import { useProfileShare } from "@/features/reports/hooks/useProfileShare";
import { useState } from "react";
import Link from "next/link";
import { Heart, Share2, Flag } from "lucide-react";
import { toast } from "sonner";
import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import ItemName from "@/components/atoms/ItemName/ItemName";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import type { PersonProfile } from "../../types/index";
import RichTextContent from "@/components/atoms/RichTextContent/RichTextContent";

export default function PersonProfileView({
  profile,
  profileHref,
  reviewsHref,
  shareHref,
  backHref,
  reviewsPage = false,
  dashboard = false,
}: {
  profile: PersonProfile;
  profileHref: string;
  reviewsHref: string;
  shareHref: string;
  backHref?: string;
  reviewsPage?: boolean;
  dashboard?: boolean;
}) {
  const { ref: impressionRef } = useResourceTracking({ resourceType: "profile", subjectUserId: profile.id });
  const share = useProfileShare(shareHref, profile.name, profile.id);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const role =
    profile.kind === "user"
      ? "Profile"
      : profile.kind === "employer"
        ? "Employer"
        : "Merchant";
  const filtered = (profile.reviews ?? []).filter((review) =>
    `${review.user?.firstName ?? ""} ${review.user?.lastName ?? ""} ${review.comment ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  const currentPage = Math.min(
    page,
    Math.max(1, Math.ceil(filtered.length / 5)),
  );
  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };
  const statistics = (
    <div className={`grid gap-3 ${reviewsPage ? "" : "sm:grid-cols-2"}`}>
      {reviewsPage && (
        <Link href={profileHref} className="space-y-3 bg-white p-5">
          <p className="text-xs uppercase text-[#8A8D8B]">{role} profile</p>
          <div className="flex items-center gap-3">
            <ProfileAvatar profileImage={profile.image} />
            <ItemName title={profile.name} isVerified={profile.verified} />
          </div>
        </Link>
      )}
      <div className="bg-white p-5 text-xs uppercase text-[#8A8D8B]">
        {profile.activityCount ?? "N/A"}{" "}
        {profile.kind === "merchant" ? "Products listed" : "Jobs posted"}
      </div>
      {profile.rating === undefined ? <div className="bg-white p-5 text-xs text-[#8A8D8B]">{role} rating: N/A</div> : <RatingSummary
        title={`${role} rating`}
        rating={profile.rating ?? 0}
        variant="tertiary"
      />}
    </div>
  );
  const breakdown = profile.reviewCount === undefined ? <div className="bg-white p-5 text-sm text-[#8A8D8B]">Review statistics are unavailable.</div> : (
    <div className="bg-white p-5 sm:p-6">
      <ReviewBreakdown
        totalReviews={profile.reviewCount ?? 0}
        reviewBreakdown={profile.distribution}
        titleClassName="text-base"
        variant="tertiary"
      />
      {profile.reviewCount !== undefined &&
        profile.reviewCount > 0 &&
        !profile.distribution && (
          <p className="mt-4 text-xs text-[#8A8D8B]">
            Rating breakdown unavailable.
          </p>
        )}
    </div>
  );
  const comments =
    profile.reviews === undefined ? (
      <section className="bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-semibold">Comments</h2>
          {!reviewsPage && (
            <Link href={reviewsHref} className="text-xs text-[#6667FF]">
              See all →
            </Link>
          )}
        </div>
        <p className="py-12 text-center text-sm text-[#8A8D8B]">
          Reviews are not available yet.
        </p>
      </section>
    ) : (
      <CommentWrapper
        variant={reviewsPage ? "large" : "small"}
        sectionVariant="tertiary"
        link={reviewsPage ? undefined : reviewsHref}
        reviews={filtered.slice((currentPage - 1) * 5, currentPage * 5)}
        totalComments={profile.reviews.length}
        setSearch={updateSearch}
        onSubmit={updateSearch}
        onAddComment={() =>
          toast.info("Submitting profile reviews is not available yet.")
        }
        pagination={
          reviewsPage
            ? {
                page: currentPage,
                hasMore: currentPage * 5 < filtered.length,
                onNext: () => setPage(currentPage + 1),
                onPrev: () => setPage(Math.max(1, currentPage - 1)),
              }
            : undefined
        }
      />
    );
  return (
    <Container
      variant={dashboard ? "small" : "center"}
      className="py-4 sm:py-6"
    >
      <div ref={impressionRef} className="mb-4 flex justify-between gap-4">
        <BackButton
          href={reviewsPage ? profileHref : backHref}
          isDashboard={dashboard}
        />
        {reviewsPage && (
          <button
            type="button"
            onClick={() =>
              toast.info("Reporting profiles is not available yet.")
            }
            className="flex items-center gap-2 text-xs underline"
          >
            <Flag className="size-4 text-[#FF547D]" />
            Flag {role.toLowerCase()}
          </button>
        )}
      </div>
      {reviewsPage ? (
        <div className="space-y-5">
          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,32%)]">
            {breakdown}
            {statistics}
          </div>
          {comments}
        </div>
      ) : (
        <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(280px,32%)]">
          <section className="min-w-0 space-y-3 rounded-xl border border-[#EDEEF0] bg-[#F9F9F9] p-3 sm:p-4">
            <header className="flex flex-wrap items-center gap-4 bg-white p-3">
              <ProfileAvatar profileImage={profile.image} variant="medium" />
              <div className="min-w-0 flex-1 space-y-2">
                <ItemName title={profile.name} isVerified={profile.verified} />
                {profile.username && (
                  <IdentifierBadge label="Username" shorten={false} value={profile.username} />
                )}
              </div>
              <div className="space-y-3">
                {profile.online !== undefined && (
                  <p className="text-right text-xs text-[#707471]">
                    <span
                      className={
                        profile.online ? "text-[#25C269]" : "text-[#8A8D8B]"
                      }
                    >
                      ●
                    </span>{" "}
                    {profile.online ? "Online" : "Offline"}
                  </p>
                )}
                <div className="flex gap-2">
                  <button
                    type="button"
                    aria-label="Share profile"
                    onClick={share}
                    className="rounded-lg bg-[#EDEEF0] p-2.5 text-[#737774]"
                  >
                    <Share2 className="size-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Save profile"
                    onClick={() =>
                      toast.info("Saving profiles is not available yet.")
                    }
                    className="rounded-lg bg-[#EDEEF0] p-2.5 text-[#737774]"
                  >
                    <Heart className="size-4" />
                  </button>
                </div>
              </div>
            </header>
            <div className="bg-[#EDEEF0] p-2">
              <div className="rounded-lg bg-white p-3 text-sm text-[#707471]">
                <RichTextContent value={profile.bio || "No bio provided."} />
              </div>
            </div>
            {statistics}
            {breakdown}
          </section>
          <aside className="min-w-0 xl:max-h-[680px] xl:overflow-y-auto">
            {comments}
          </aside>
        </div>
      )}
    </Container>
  );
}
