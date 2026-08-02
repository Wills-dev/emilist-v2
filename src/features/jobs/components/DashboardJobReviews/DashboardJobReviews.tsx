"use client";

import { useMemo, useState } from "react";
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
  dashboardJobReviews,
  dashboardJobReviewSummary,
} from "../../constants/dummy";

const DashboardJobReviews = ({ jobId }: { jobId: string }) => {
  const [reviews, setReviews] = useState(dashboardJobReviews);
  const [, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const visibleReviews = useMemo(() => {
    const search = submittedQuery.trim().toLowerCase();
    if (!search) return reviews;
    return reviews.filter((review) =>
      `${review.user?.firstName ?? ""} ${review.user?.lastName ?? ""} ${review.comment ?? ""}`
        .toLowerCase()
        .includes(search),
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
        _id: `job-${jobId}-${Date.now()}`,
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        user: { _id: "current-user", firstName: "Toks", lastName: "Williams" },
      },
      ...current,
    ]);
    resetForm();
    setIsModalOpen(false);
  };

  return (
    <Container variant="small">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: "easeOut" }} className="space-y-6 pb-20 pt-4">
        <div className="flex items-center justify-between">
          <BackButton />
          <FlagActionBtn onClick={() => {}} actionTitle="Flag employer" />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="w-full min-w-72.5 max-w-160 bg-[#F9F9F9] p-6">
            <ReviewBreakdown totalReviews={dashboardJobReviewSummary.totalReviews} reviewBreakdown={dashboardJobReviewSummary.ratingDistribution} variant="tertiary" />
          </div>
          <div className="w-full min-w-72.5 max-w-109.75 space-y-3">
            <FilterSectionWrapper variant="tertiary">
              <FilterTitle title="Employer profile" />
              <UserRatingCard id={dashboardJobReviewSummary.owner.id} fullName={dashboardJobReviewSummary.owner.name} rating={dashboardJobReviewSummary.owner.rating} />
            </FilterSectionWrapper>
            <FilterSectionWrapper variant="tertiary">
              <FilterTitle title={`${dashboardJobReviewSummary.owner.jobsPosted} jobs posted`} />
            </FilterSectionWrapper>
            <RatingSummary title="Employer Rating" rating={dashboardJobReviewSummary.owner.rating} variant="tertiary" />
          </div>
        </div>
        <CommentWrapper
          totalComments={submittedQuery ? visibleReviews.length : dashboardJobReviewSummary.totalComments}
          variant="large"
          onSubmit={(value) => setSubmittedQuery(value)}
          setSearch={setQuery}
          reviews={visibleReviews}
          onAddComment={() => setIsModalOpen(true)}
          sectionVariant="tertiary"
        />
      </motion.div>
      <ReviewModal
        open={isModalOpen}
        onClose={setIsModalOpen}
        title="Review employer"
        description="Share your experience working with this job owner."
        submitLabel="Add review"
        form={{ rating, comment, setRating, setComment, handleSubmit: handleAddReview, resetForm, isPending: false }}
      />
    </Container>
  );
};

export default DashboardJobReviews;
