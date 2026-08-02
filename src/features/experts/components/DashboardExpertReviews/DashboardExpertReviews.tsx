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
  dashboardExpertReviews,
  dashboardExpertReviewSummary,
  dashboardExperts,
} from "../../constants/dummy";

const DashboardExpertReviews = ({ expertId }: { expertId: string }) => {
  const expert =
    dashboardExperts.find((item) => item.id === expertId) ??
    dashboardExperts[0];
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

  return (
    <Container variant="small">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 pb-20 pt-4"
      >
        <div className="flex items-center justify-between">
          <BackButton />
          <FlagActionBtn onClick={() => {}} actionTitle="Flag expert" />
        </div>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="w-full min-w-72.5 max-w-160 bg-[#F9F9F9] p-6">
            <ReviewBreakdown
              totalReviews={dashboardExpertReviewSummary.totalReviews}
              reviewBreakdown={dashboardExpertReviewSummary.ratingDistribution}
              variant="tertiary"
            />
          </div>
          <div className="w-full min-w-72.5 max-w-109.75 space-y-3">
            <FilterSectionWrapper variant="tertiary">
              <FilterTitle title="Expert profile" />
              <UserRatingCard
                id={expert.id}
                fullName={expert.businessName}
                rating={expert.rating}
              />
            </FilterSectionWrapper>
            <FilterSectionWrapper variant="tertiary">
              <FilterTitle
                title={`${expert.noOfCompletedJobs} jobs completed`}
              />
            </FilterSectionWrapper>
            <RatingSummary
              title="Expert Rating"
              rating={dashboardExpertReviewSummary.averageRating}
              variant="tertiary"
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
          onSubmit={setSubmittedQuery}
          setSearch={setQuery}
          reviews={visibleReviews}
          onAddComment={() => setIsModalOpen(true)}
          sectionVariant="tertiary"
          pagination={{
            page: 1,
            hasMore: false,
            onNext: () => {},
            onPrev: () => {},
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
