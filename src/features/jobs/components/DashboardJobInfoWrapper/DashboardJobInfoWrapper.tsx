"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import { dashbaordMarketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import JobMainInfo from "../JobMainInfo/JobMainInfo";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";
import { useGetJobById } from "../../hooks/useGetJobById";
import JobInfoSkeleton from "../JobInfoSkeleton/JobInfoSkeleton";

const DashboardJobInfoWrapper = ({ jobId }: { jobId: string }) => {
  const { data: job, isPending, isError, refetch } = useGetJobById(jobId);

  if (isPending) {
    return <JobInfoSkeleton variant="dashboard" />;
  }

  if (isError || !job) {
    return (
      <div className="space-y-4 py-20 text-center text-sm text-[#707471]">
        <p>We could not load this job.</p>
        <button type="button" onClick={() => void refetch()} className="font-semibold text-[#25C269] underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <Container variant="small">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-4 pb-20 pt-4"
      >
        <div className="lg:hidden">
          <MarketplaceTab tabContent={dashbaordMarketplaceTabs} />
        </div>
        <div className="flex w-full items-start gap-4 max-xl:flex-col">
          <motion.main
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="w-full min-w-0 flex-1"
            data-job-id={jobId}
          >
            <JobMainInfo
              jobId={jobId}
              job={job}
              applyLabel="Apply Now"
              reviewsHref={routes.dashboardLinks.marketplaceJobReviews(jobId)}
              showMilestoneJump
              showDashboardActions
            />
          </motion.main>
          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
            className="w-full xl:max-w-87.75"
          >
            <JobMilestoneInfo variant="dashboard" milestones={job.milestones} />
          </motion.aside>
        </div>
      </motion.div>
    </Container>
  );
};

export default DashboardJobInfoWrapper;
