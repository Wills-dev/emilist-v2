"use client";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import { routes } from "@/lib/helpers/routes";
import { useHomeExperts } from "../../hooks/useHomeExperts";
import ExpertCard from "../ExpertCard/ExpertCard";
import ExpertCardSkeleton from "../ExpertCard/ExpertCardSkeleton";

export default function HomeExpertSection() {
  const { query, experts, retry } = useHomeExperts();
  return <SectionWrapper className="no-scrollbar items-stretch! [&>div]:shrink-0 [&>div]:sm:w-[375.5px]">{query.isPending ? Array.from({ length: 4 }, (_, index) => <ExpertCardSkeleton key={index} />) : query.isError ? <div role="alert" className="min-w-full p-8 text-center">Unable to load experts. <button type="button" onClick={retry} className="text-[#18A154] underline">Try again</button></div> : !experts.length ? <p className="min-w-full p-8 text-center">No experts available yet.</p> : experts.map((expert) => <ExpertCard key={expert.id} id={expert.id} imgUrl={expert.imgUrl} busniessName={expert.businessName} isVerified={expert.isVerified} rating={expert.rating} noOfReviews={expert.noOfReviews} price={expert.price} period={expert.period} currency={expert.currency} location={expert.location} noOfCompletedJobs={expert.noOfCompletedJobs} serviceType={expert.serviceType} level={expert.level} isLiked={expert.isLiked} profileHref={routes.marketplace.expertInfo(expert.id)} reviewsHref={routes.marketplace.expertInfoReviews(expert.id)} />)}</SectionWrapper>;
}
