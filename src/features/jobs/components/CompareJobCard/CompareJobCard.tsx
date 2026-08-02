"use client";

import Link from "next/link";
import { BriefcaseBusiness, CalendarClock, Languages, MapPin, MessageSquareText, Star, UserRoundCheck } from "lucide-react";
import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import JobImagePreview from "../JobImagePreview/JobImagePreview";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import { routes } from "@/lib/helpers/routes";
import { CompareJobItem } from "../../types";

const CompareRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="flex min-w-0 items-center gap-2 rounded-md bg-[#F9F9F9] px-2 py-2 text-[10px] text-[#5E625F]">
    <span className="shrink-0 text-[#737774] [&_svg]:size-3.5">{icon}</span>
    <span className="shrink-0">{label}:</span>
    <span className="truncate font-medium text-[#303632]">{value}</span>
  </div>
);

const CompareJobCard = ({ job, index }: { job: CompareJobItem; index: number }) => (
  <motion.article
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
    className="w-58 shrink-0 space-y-3 sm:w-60"
  >
    <section className="space-y-4 rounded-md bg-[#F9F9F9] p-3">
      <JobImagePreview />
      <div className="flex items-end justify-between gap-2">
        <Link href={routes.dashboardLinks.marketplaceJobInfo(job.id)} className="truncate text-xs font-semibold hover:text-[#18A154] hover:underline">
          {job.title}
        </Link>
        <PriceWrapper price={job.price} currency={job.currency} />
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className="truncate">{job.ownerName}</span>
        <Rating rating={job.rating} className="text-xs" />
        <span>({job.reviewCount})</span>
      </div>
      <ul className="min-h-31 space-y-3 rounded-md bg-white p-3 text-[10px] text-[#5E625F]">
        {job.credentials.map((credential) => <li key={credential}>• {credential}</li>)}
      </ul>
      <Button href={routes.profile(job.ownerId)} variant="default" className="h-8 w-full text-xs">View Profile</Button>
    </section>

    <section className="min-h-24 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]">
      <Link href={routes.dashboardLinks.marketplaceJobInfo(job.id)} className="line-clamp-3 rounded-md bg-[#F9F9F9] p-3 text-xs text-[#667085] underline">
        {job.description}
      </Link>
    </section>

    <section className="space-y-2 border-y border-[#ECECEC] bg-white p-4 shadow-[0_8px_16px_rgba(27,49,37,0.06)]">
      <CompareRow icon={<BriefcaseBusiness />} label="Service Category" value={job.category} />
      <CompareRow icon={<MapPin />} label="Location" value={job.location} />
      <CompareRow icon={<UserRoundCheck />} label="Experience" value={job.experience} />
      <CompareRow icon={<CalendarClock />} label="Notice Period" value={job.noticePeriod} />
      <CompareRow icon={<Languages />} label="Language" value={job.languages} />
      <CompareRow icon={<Star />} label="Employer Ratings" value={String(job.employerRating)} />
      <CompareRow icon={<MessageSquareText />} label="Employer Reviews" value={String(job.employerReviews)} />
      <CompareRow icon={<BriefcaseBusiness />} label="Jobs Posted" value={String(job.jobsPosted)} />
      <div className="border-t border-[#ECECEC] pt-4">
        <Button variant="primary" className="h-8 w-full text-xs">Apply</Button>
      </div>
    </section>
  </motion.article>
);

export default CompareJobCard;
