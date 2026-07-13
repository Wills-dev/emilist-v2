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
import JobImageSliderWrapper from "../JobImageSliderWrapper/JobImageSliderWrapper";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import Button from "@/components/atoms/Button/Button";

const JobMainInfo = () => {
  const handleToggle = () => {};

  return (
    <div className="flex-1 w-full">
      <div className="flex items-center justify-between space-y-4">
        <BackButton />
        <FlagActionBtn onClick={() => {}} actionTitle="Flag Job" />
      </div>
      <div className="bg-[#F9F9F9] border-[0.94px] border-[#F1F2F9] pt-8 md:px-11 sm:px-5 px-2  pb-6 rounded-[11.33px] space-y-8">
        <JobCategory category="Carpentry" variant="secondary" />
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-2.5 flex-wrap pb-4 border-b border-[#ECECEC]">
              <div className="space-y-2">
                <DatedPosted date="2026-05-19T14:32:10.123Z" />
                <div className="flex items-center gap-2.5 flex-wrap">
                  <ItemName title="Home Furniture Upgrade" />
                  <div className="flex items-center gap-1 rounded-[32px] bg-white py-px px-2">
                    <p className="text-[#737774] text-sm italic">Job ID:</p>
                    <p className="text-sm text-[#474C48] font-semibold">
                      12345
                    </p>
                  </div>
                </div>
              </div>
              <PriceWrapper
                price={400000}
                currency="NGN"
                title="budget starts from"
              />
            </div>
            <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-[#ECECEC]">
              <div className="border border-[#F1F2F9] bg-white p-4 max-sm:py-2 max-sm:px-3 max-w-106.25 w-full rounded-[8px]">
                <div className="flex items-center gap-6 flex-wrap">
                  <InfoItem
                    value={"Gbagada Phase 1, Lagos"}
                    className="text-[#6667FF]"
                    icon={<LocationIcon />}
                  />{" "}
                  <InfoItem value={"3 weeks"} icon={<ClockIcon />} />
                  <InfoItem value={`10 applicants`} icon={<UserIcon />} />
                  <InfoItem value={`Intermediate`} icon={<LevelIcon />} />
                  <div className="flex items-center"></div>
                  <InfoItem value={`3 milestones`} icon={<MilestoneIcon />} />
                </div>
              </div>
              <div className="flex items-center gap-3.25">
                <ShareButton
                  id={"2"}
                  type={"job"}
                  name={"Home Furniture Upgrade"}
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
            <JobImageSliderWrapper />
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <UserRatingCard
                imgUrl={""}
                fullName={"Executive Palace Hotel"}
                rating={4}
                noOfReviews={51}
              />
              <div className="flex items-center text-xs gap-1">
                <p className="w-fit text-[#707471] ">Urgency:</p>
                <p className="font-semibold text-[#18A154] text-sm font-exo">
                  Immediately
                </p>
              </div>
            </div>
            <div className="bg-white rounded-[8px] p-4 space-y-4 text-[#5E625F] text-sm">
              <p>
                Remake old chairs, cabinets, beds & doors for a residential
                family building in Gbagada Phase 1 on the Lagos Mainland axis.
              </p>

              <p>
                We appreciate experienced furniture makers who are committed to
                crafting long lasting furniture pieces and pride themselves on
                meeting deadlines efficiently. Apply if you’re a fit for this
                role.
              </p>
              <p>We’re looking forward to working with you.</p>
            </div>
          </div>
        </div>
        <Button variant="primary" className="w-full h-11">
          Apply
        </Button>
      </div>
    </div>
  );
};

export default JobMainInfo;
