"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Container from "@/components/atoms/Container/Container";
import FilterSectionWrapper from "@/components/atoms/FilterSectionWrapper/FilterSectionWrapper";
import FilterTitle from "@/components/atoms/FilterTilte/FilterTilte";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import CommentWrapper from "@/components/molecules/CommentWrapper/CommentWrapper";
import RatingSummary from "@/components/molecules/RatingSummary/RatingSummary";
import ReviewBreakdown from "@/components/molecules/ReviewBreakdown/ReviewBreakdown";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import { useGeneralSearch } from "@/lib/hooks/useGeneralSearch";

const MaterialReviewInfoWrapper = ({ materialId }: { materialId: string }) => {
  const { handleSubmit, setSearch } = useGeneralSearch();

  const reviewBreakdown = {
    one: 0,
    two: 33,
    three: 10,
    four: 4,
    five: 13,
  };

  return (
    <div className="pt-6 pb-15">
      <Container>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between space-y-4">
              <BackButton />
              <FlagActionBtn onClick={() => {}} actionTitle="Flag merchant" />
            </div>
            <div className="flex items-center justify-between gap-6 flex-wrap">
              <div className="max-w-197.75 w-full min-w-72.5">
                <ReviewBreakdown
                  totalReviews={51}
                  reviewBreakdown={reviewBreakdown}
                />
              </div>
              <div className="max-w-96.75 w-full min-w-72.5 space-y-6">
                <FilterSectionWrapper>
                  <FilterTitle title="Merchant profile" />
                  <UserRatingCard
                    id={""}
                    imgUrl={""}
                    fullName={"Arthur Phillips"}
                    rating={4}
                  />
                </FilterSectionWrapper>
                <FilterSectionWrapper>
                  <FilterTitle title="55,000  Items sold" />
                </FilterSectionWrapper>
                <RatingSummary title="Merchant Rating" rating={4.3} />
              </div>
            </div>
          </div>
          <CommentWrapper
            totalComments={100}
            variant="large"
            onSubmit={handleSubmit}
            setSearch={setSearch}
            limit={10}
          />
        </div>
      </Container>
    </div>
  );
};

export default MaterialReviewInfoWrapper;
