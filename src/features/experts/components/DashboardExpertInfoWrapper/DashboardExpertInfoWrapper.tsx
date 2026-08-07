"use client";

import { motion } from "framer-motion";

import BackButton from "@/components/atoms/BackButton/BackButton";
import Button from "@/components/atoms/Button/Button";
import CompareBtn from "@/components/atoms/CompareBtn/CompareBtn";
import Container from "@/components/atoms/Container/Container";
import FlagActionBtn from "@/components/atoms/FlagActionBtn/FlagActionBtn";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import ItemName from "@/components/atoms/ItemName/ItemName";
import PromoteBtn from "@/components/atoms/PromoteBtn/PromoteBtn";
import ClockIcon from "@/components/atoms/icons/ClockIcon";
import LevelIcon from "@/components/atoms/icons/LevelIcon";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import ImageSliderWrapper from "@/components/molecules/ImageSliderWrapper/ImageSliderWrapper";

import LikeButton from "@/components/molecules/LikeButton/LikeButton";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import ShareButton from "@/components/molecules/ShareButton/ShareButton";
import UserRatingCard from "@/components/molecules/UserRatingCard/UserRatingCard";
import RichTextContent from "@/components/atoms/RichTextContent/RichTextContent";
import JobCategory from "@/features/jobs/components/JobCategory/JobCategory";
import { dashbaordMarketplaceTabs, marketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import {
  dashboardExpertProfile,
  dashboardExperts,
} from "../../constants/dummy";
import ExpertReviewSummary from "../ExpertReviewSummary/ExpertReviewSummary";

const DashboardExpertInfoWrapper = ({
  expertId,
  publicPage = false,
}: {
  expertId: string;
  publicPage?: boolean;
}) => {
  const expert =
    dashboardExperts.find((item) => item.id === expertId) ??
    dashboardExperts[0];

  return (
    <Container variant={publicPage ? "center" : "small"}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-4 pb-20 pt-4"
      >
        <div className="lg:hidden">
          <MarketplaceTab
            tabContent={publicPage ? marketplaceTabs : dashbaordMarketplaceTabs}
          />
        </div>
        <div className="flex w-full flex-wrap justify-between gap-2">
          <motion.main
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className={publicPage ? "w-full max-w-202" : "w-full max-w-182.25"}
          >
            <div className="flex items-center justify-between pb-4">
              <BackButton />
              <FlagActionBtn onClick={() => {}} actionTitle="Flag expert" />
            </div>
            <div className="space-y-8 rounded-[11.33px] border border-[#F1F2F9] bg-[#F9F9F9] px-2 pb-6 pt-8 sm:px-5 md:px-11">
              <JobCategory category={expert.serviceType} variant="secondary" />
              <div className="space-y-6">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#ECECEC] pb-4">
                  <div className="space-y-2">
                    <p className="text-xs italic text-[#707471]">
                      {dashboardExpertProfile.availability}
                    </p>
                    <div className="flex flex-wrap items-center gap-3">
                      <ItemName
                        title={expert.businessName}
                        isVerified={expert.isVerified}
                      />
                      <IdentifierBadge label="Expert ID" value={expert.id} />
                    </div>
                  </div>
                  <PriceWrapper
                    price={expert.price}
                    currency={expert.currency}
                    unit={expert.period}
                    title="starts from"
                  />
                </div>
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#ECECEC] pb-4">
                  <div className="w-full max-w-106.25 space-y-6 rounded-lg border border-[#F1F2F9] bg-white p-4 max-sm:px-3 max-sm:py-2">
                    <div className="flex flex-wrap items-center gap-6">
                      <InfoItem
                        value={expert.location}
                        className="text-[#6667FF]"
                        icon={<LocationIcon />}
                      />{" "}
                      <InfoItem
                        value={dashboardExpertProfile.noticePeriod}
                        icon={<ClockIcon />}
                      />
                      <InfoItem
                        value={`${expert.noOfCompletedJobs} completed jobs`}
                        icon={<UserIcon />}
                      />
                      <InfoItem value={expert.level} icon={<LevelIcon />} />
                    </div>
                    <div className="flex flex-wrap items-center gap-6">
                      <CompareBtn />
                      <PromoteBtn />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShareButton
                      id={expert.id}
                      type="expert"
                      name={expert.businessName}
                    />
                    <LikeButton
                      isLiked={expert.isLiked}
                      onToggleLike={() => {}}
                    />
                  </div>
                </div>
                <ImageSliderWrapper
                  images={dashboardExpertProfile.galleryImages}
                  productName={expert.businessName}
                />
                <UserRatingCard
                  id={expert.id}
                  fullName={expert.businessName}
                  rating={expert.rating}
                  noOfReviews={expert.noOfReviews}
                  reviewsHref={
                    publicPage
                      ? routes.marketplace.expertInfoReviews(expert.id)
                      : routes.dashboardLinks.marketplaceExpertReviews(
                          expert.id,
                        )
                  }
                />
                <div className="rounded-lg bg-white p-4 text-sm leading-6 text-[#5E625F]">
                  <RichTextContent
                    value={dashboardExpertProfile.about
                      .map((paragraph) => `<p>${paragraph}</p>`)
                      .join("")}
                  />
                </div>
              </div>
              <Button variant="primary" className="h-11 w-full">
                Hire Expert
              </Button>
            </div>
          </motion.main>
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
            className={publicPage ? "w-full max-w-96.75" : "w-full max-w-87.75"}
          >
            <ExpertReviewSummary expertId={expert.id} publicPage={publicPage} />
          </motion.aside>
        </div>
      </motion.div>
    </Container>
  );
};

export default DashboardExpertInfoWrapper;
