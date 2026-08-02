"use client";

import { BadgeCheck, BriefcaseBusiness, CalendarClock, Languages, MapPin, MessageSquareText, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import ProfileAvatar from "@/components/atoms/ProfileAvatar/ProfileAvatar";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import { routes } from "@/lib/helpers/routes";
import { CompareExpertItem } from "../../types";

const CompareRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex min-w-0 items-center gap-2 rounded-md bg-[#F9F9F9] px-2 py-2 text-[10px] text-[#5E625F]">
    <span className="shrink-0 text-[#737774] [&_svg]:size-3.5">{icon}</span>
    <span className="shrink-0">{label}:</span>
    <span className="truncate font-medium text-[#303632]">{value}</span>
  </div>
);

const CompareExpertCard = ({ expert, index }: { expert: CompareExpertItem; index: number }) => (
  <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }} className="w-58 shrink-0 space-y-3 sm:w-60">
    <section className="space-y-4 rounded-md bg-[#F9F9F9] p-3">
      <ProfileAvatar variant="small" />
      <div className="flex items-end justify-between gap-2">
        <p className="truncate text-xs font-semibold">{expert.name}</p>
        <PriceWrapper price={expert.price} currency={expert.currency} unit={expert.period} />
      </div>
      <div className="flex items-center gap-2 text-[10px]"><Rating rating={expert.rating} className="text-xs" /><span>({expert.reviewCount} reviews)</span></div>
      <ul className="min-h-31 space-y-3 rounded-md bg-white p-3 text-[10px] text-[#5E625F]">{expert.credentials.map((credential) => <li key={credential}>• {credential}</li>)}</ul>
      <Button href={routes.dashboardLinks.marketplaceExpertInfo(expert.id)} variant="default" className="h-8 w-full text-xs">View Profile</Button>
    </section>
    <section className="min-h-32 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]">
      <p className="line-clamp-5 rounded-md bg-[#F9F9F9] p-3 text-xs leading-5 text-[#667085]"><span className="underline">About:</span> {expert.about}</p>
    </section>
    <section className="space-y-2 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]">
      <CompareRow icon={<BadgeCheck />} label="Experience" value={expert.experience} />
      <CompareRow icon={<Star />} label="Ratings" value={String(expert.rating)} />
      <CompareRow icon={<MessageSquareText />} label="Reviews" value={String(expert.reviewCount)} />
      <CompareRow icon={<BriefcaseBusiness />} label="Service Category" value={expert.serviceCategory} />
      <CompareRow icon={<BriefcaseBusiness />} label="Jobs Completed" value={String(expert.jobsCompleted)} />
      <CompareRow icon={<CalendarClock />} label="Notice Period" value={expert.noticePeriod} />
      <CompareRow icon={<MapPin />} label="Location" value={expert.location} />
      <CompareRow icon={<Languages />} label="Language" value={expert.languages} />
      <CompareRow icon={<ShieldCheck />} label="Insurance" value={expert.insurance} />
      <div className="border-t border-[#ECECEC] pt-4"><Button variant="primary" className="h-8 w-full text-xs">Hire Expert</Button></div>
    </section>
  </motion.article>
);

export default CompareExpertCard;
