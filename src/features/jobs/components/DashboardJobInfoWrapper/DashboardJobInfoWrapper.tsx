"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import MarketplaceTab from "@/components/molecules/MarketplaceTab/MarketplaceTab";
import { dashbaordMarketplaceTabs } from "@/lib/constants";
import { routes } from "@/lib/helpers/routes";
import JobMainInfo from "../JobMainInfo/JobMainInfo";
import JobMilestoneInfo from "../JobMilestoneInfo/JobMilestoneInfo";

const DashboardJobInfoWrapper = ({ jobId }: { jobId: string }) => {
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
            <JobMilestoneInfo variant="dashboard" />
          </motion.aside>
        </div>
      </motion.div>
    </Container>
  );
};

export default DashboardJobInfoWrapper;
