"use client";

import BackButton from "@/components/atoms/BackButton/BackButton";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import JobCategory from "../JobCategory/JobCategory";
import DatedPosted from "@/components/atoms/DatedPosted/DatedPosted";
import ItemName from "@/components/atoms/ItemName/ItemName";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import ClockIcon from "@/components/atoms/icons/ClockIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import LevelIcon from "@/components/atoms/icons/LevelIcon";
import MilestoneIcon from "@/components/atoms/icons/MilestoneIcon";
import ShareButton from "@/components/molecules/ShareButton/ShareButton";
import LikeButton from "@/components/molecules/LikeButton/LikeButton";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import Button from "@/components/atoms/Button/Button";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import ImageSliderWrapper from "@/components/molecules/ImageSliderWrapper/ImageSliderWrapper";
import ArrowRight from "@/components/atoms/icons/ArrowRight";
import CompareBtn from "@/components/atoms/CompareBtn/CompareBtn";
import PromoteBtn from "@/components/atoms/PromoteBtn/PromoteBtn";
import { routes } from "@/lib/helpers/routes";
import { jobInfoFixture } from "../../constants/dummy";

const JobMainInfo = ({
  jobId = "12345",
  applyLabel = "Apply",
  reviewsHref,
  showMilestoneJump = false,
  showDashboardActions = false,
}: {
  jobId?: string;
  applyLabel?: string;
  reviewsHref?: string;
  showMilestoneJump?: boolean;
  showDashboardActions?: boolean;
}) => {
  const handleToggle = () => {};

  return (
    <div className="flex-1 w-full">
      <div className="flex items-center justify-between space-y-4">
        <BackButton />
        <FlagActionBtn onClick={() => {}} actionTitle="Flag Job" />
      </div>
      <div className="bg-[#F9F9F9] border-[0.94px] border-[#F1F2F9] pt-8 md:px-11 sm:px-5 px-2  pb-6 rounded-[11.33px] space-y-8">
        <JobCategory category={jobInfoFixture.category} variant="secondary" />
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-2.5 flex-wrap pb-4 border-b border-[#ECECEC]">
              <div className="space-y-2">
                <DatedPosted date={jobInfoFixture.createdAt} />
                <div className="flex items-center gap-2.5 flex-wrap">
                  <ItemName title={jobInfoFixture.title} />
                  <IdentifierBadge label="Job ID" value={jobId} />
                </div>
              </div>
              <PriceWrapper
                price={jobInfoFixture.price}
                currency={jobInfoFixture.currency}
                title="budget starts from"
              />
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#ECECEC]">
              <div className="border border-[#F1F2F9] bg-white p-4 max-sm:py-2 max-sm:px-3 max-w-106.25 w-full rounded-[8px] space-y-6">
                <div className="flex items-center gap-6 flex-wrap">
                  <InfoItem
                    value={jobInfoFixture.location}
                    className="text-[#6667FF]"
                    icon={<LocationIcon />}
                  />{" "}
                  <InfoItem value={jobInfoFixture.duration} icon={<ClockIcon />} />
                  <InfoItem value={`${jobInfoFixture.applicants} applicants`} icon={<UserIcon />} />
                  <InfoItem value={jobInfoFixture.level} icon={<LevelIcon />} />
                  <div className="flex items-center"></div>
                  <div className="flex items-center gap-1">
                    <InfoItem value={`${jobInfoFixture.milestoneCount} milestones`} icon={<MilestoneIcon />} />
                    {showMilestoneJump && (
                      <button
                        type="button"
                        onClick={() =>
                          document
                            .getElementById("milestone")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" })
                        }
                        className="flex items-center gap-1 text-[9px] font-medium leading-none text-[#6667FF] underline underline-offset-2 sm:hidden"
                      >
                        <span>Show</span>
                        <span className="text-[8px]">
                          <ArrowRight />
                        </span>
                      </button>
                    )}
                  </div>
                </div>
                {showDashboardActions && (
                  <div className="flex flex-wrap items-center gap-6">
                    <CompareBtn href={routes.dashboardLinks.compareJobs} />
                    <PromoteBtn label="Promote job" />
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3.25">
                <ShareButton
                  id={"2"}
                  type={"job"}
                  name={jobInfoFixture.title}
                  className="sm:py-[9.86px] py-2 sm:px-[13.14px] px-3 sm:text-2xl text-sm"
                />
                <LikeButton
                  isLiked={true}
                  onToggleLike={handleToggle}
                  className="sm:py-[9.86px] py-2 sm:px-[13.14px] px-3 sm:text-2xl text-sm"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <ImageSliderWrapper />
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <UserRatingCard
                id={jobInfoFixture.ownerId}
                imgUrl={""}
                fullName={jobInfoFixture.ownerName}
                rating={jobInfoFixture.ownerRating}
                noOfReviews={jobInfoFixture.ownerReviewCount}
                reviewsHref={reviewsHref}
              />
              <div className="flex items-center text-xs gap-1">
                <p className="w-fit text-[#707471] ">Urgency:</p>
                <p className="font-semibold text-[#18A154] text-sm font-exo">
                  {jobInfoFixture.urgency}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[8px] p-4 space-y-4 text-[#5E625F] text-sm">
              {jobInfoFixture.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
        <Button variant="primary" className="w-full h-11">
          {applyLabel}
        </Button>
      </div>
    </div>
  );
};

export default JobMainInfo;
