"use client";

import { useMemo, useState } from "react";
import { routes } from "@/lib/helpers/routes";
import EmptyState from "@/components/molecules/EmptyState/EmptyState";
import { motion } from "framer-motion";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import { ReviewModal } from "@/features/materials/components/MaterialReviewModal/MaterialReviewModal";
import {
  dashboardExpertReviews,
  dashboardExpertReviewSummary,
  dashboardExperts,
} from "../../constants/dummy";

const DashboardExpertReviews = ({
  expertId,
  publicPage = false,
  profilePage = false,
  jobContext,
}: {
  expertId: string;
  publicPage?: boolean;
  profilePage?: boolean;
  jobContext?: { jobId: string; tab: string };
}) => {
  const expert =
    dashboardExperts.find((item) => item.id === expertId) ??
    (jobContext || profilePage ? undefined : dashboardExperts[0]);
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState(dashboardExpertReviews);
  const [, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const visibleReviews = useMemo(() => {
    const query = submittedQuery.trim().toLowerCase();
    if (!query) return reviews;
    return reviews.filter((review) =>
      `${review.user?.firstName ?? ""} ${review.user?.lastName ?? ""} ${review.comment ?? ""}`
        .toLowerCase()
        .includes(query),
    );
  }, [reviews, submittedQuery]);

  const resetForm = () => {
    setRating(0);
    setComment("");
  };

  const handleAddReview = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setReviews((current) => [
      {
        _id: `expert-${expertId}-${Date.now()}`,
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        user: {
          _id: "current-user",
          firstName: "Toks",
          lastName: "Williams",
        },
      },
      ...current,
    ]);
    resetForm();
    setIsModalOpen(false);
  };

  const profileHref = jobContext
    ? routes.dashboardLinks.jobApplicantInfo(
        jobContext.jobId,
        expertId,
        jobContext.tab,
      )
    : profilePage
      ? `${publicPage ? "" : "/dashboard"}${routes.profiles.artisan(expertId)}`
      : publicPage ? routes.profiles.artisan(expertId) : routes.dashboardLinks.marketplaceExpertInfo(expertId);
  if (!expert)
    return (
      <Container variant="small" className="space-y-4 py-4">
        <BackButton href={profileHref} isDashboard />
        <EmptyState
          title="Expert reviews unavailable"
          description="This expert’s reviews are not available yet."
        />
      </Container>
    );
  const currentPage = Math.min(
    page,
    Math.max(1, Math.ceil(visibleReviews.length / 5)),
  );

  return (
    <Container variant={publicPage ? "center" : "small"}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 pb-20 pt-4"
      >
        <div className="flex items-center justify-between">
          <BackButton href={profileHref} isDashboard={Boolean(jobContext)} />
          <FlagActionBtn onClick={() => {}} actionTitle="Flag expert" />
        </div>
        <div
          className={
            jobContext
              ? "grid items-start gap-4 xl:grid-cols-[minmax(0,1fr)_32%]"
              : "flex flex-wrap items-start justify-between gap-4"
          }
        >
          <div
            className={`w-full min-w-72.5 bg-[#F9F9F9] p-6 ${publicPage ? "max-w-197.75" : "max-w-160"}`}
          >
            <ReviewBreakdown
              totalReviews={dashboardExpertReviewSummary.totalReviews}
              reviewBreakdown={dashboardExpertReviewSummary.ratingDistribution}
              variant={publicPage ? "primary" : "tertiary"}
            />
          </div>
          <div
            className={`w-full min-w-72.5 space-y-3 ${publicPage ? "max-w-96.75" : "max-w-109.75"}`}
          >
            <FilterSectionWrapper variant={publicPage ? "primary" : "tertiary"}>
              <FilterTitle title="Expert profile" />
              <UserRatingCard
                id={expert.id}
                profileHref={profileHref}
                fullName={expert.businessName}
                rating={expert.rating}
              />
            </FilterSectionWrapper>
            <FilterSectionWrapper variant={publicPage ? "primary" : "tertiary"}>
              <FilterTitle
                title={`${expert.noOfCompletedJobs} jobs completed`}
              />
            </FilterSectionWrapper>
            <RatingSummary
              title="Expert Rating"
              rating={dashboardExpertReviewSummary.averageRating}
              variant={publicPage ? "primary" : "tertiary"}
            />
          </div>
        </div>
        <CommentWrapper
          totalComments={
            submittedQuery
              ? visibleReviews.length
              : dashboardExpertReviewSummary.totalComments
          }
          variant="large"
          onSubmit={(query) => {
            setSubmittedQuery(query);
            setPage(1);
          }}
          setSearch={setQuery}
          reviews={visibleReviews.slice((currentPage - 1) * 5, currentPage * 5)}
          onAddComment={() => setIsModalOpen(true)}
          sectionVariant={publicPage ? "primary" : "tertiary"}
          pagination={{
            page: currentPage,
            hasMore: currentPage * 5 < visibleReviews.length,
            onNext: () => setPage(currentPage + 1),
            onPrev: () => setPage(Math.max(1, currentPage - 1)),
          }}
        />
      </motion.div>
      <ReviewModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        title="Review expert"
        description="Share your experience working with this expert."
        submitLabel="Add review"
        form={{
          rating,
          comment,
          setRating,
          setComment,
          handleSubmit: handleAddReview,
          resetForm,
          isPending: false,
        }}
      />
    </Container>
  );
};

export default DashboardExpertReviews;
