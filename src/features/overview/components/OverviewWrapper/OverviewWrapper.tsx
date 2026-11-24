"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import { useStore } from "@/store/authStore";
import DashboardDateCard from "../DashboardDateCard/DashboardDateCard";
import JobCompletionCard from "../JobCompletionCard/JobCompletionCard";
import OverviewMetrics from "../OverviewMetrics/OverviewMetrics";
import OverviewWelcomeHeader from "../OverviewWelcomeHeader/OverviewWelcomeHeader";
import ProfileWelcomeCard from "../ProfileWelcomeCard/ProfileWelcomeCard";
import QuickActionsSection from "../QuickActionsSection/QuickActionsSection";
import ReferralPanel from "../ReferralPanel/ReferralPanel";
import SpotlightCard from "../SpotlightCard/SpotlightCard";
import { useState } from "react";
import { useDashboardOverview } from "../../hooks/useDashboardOverview";
import type { DashboardPeriod } from "../../types/api";
import OverviewSkeleton from "../OverviewSkeleton/OverviewSkeleton";

const overviewContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const overviewCardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.32, ease: "easeOut" as const },
  },
};

const OverviewWrapper = () => {
  const [period, setPeriod] = useState<DashboardPeriod>("week");
  const overview = useDashboardOverview(period);
  const user = useStore((state) => state.currentUser);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const isProfileComplete = Boolean(user?.isProfileComplete);

  if (!isAuthInitialized || overview.isPending) return <OverviewSkeleton />;
  if (!overview.data) return <Container variant="small"><div role="alert" className="space-y-3 bg-white p-6"><p>Unable to load your overview.</p><button type="button" onClick={() => void overview.refetch()} className="text-[#18A154] underline">Try again</button></div></Container>;
  const data = overview.data;

  return (
    <Container variant="small">
      <motion.main
        variants={overviewContainerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-4 py-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]"
      >
        <div className="space-y-4">
          <motion.div
            variants={overviewCardVariants}
            className="grid grid-cols-[minmax(0,1fr)_84px] gap-2 sm:grid-cols-[1fr_220px] sm:gap-4 xl:block"
          >
            <OverviewWelcomeHeader user={data.user} />
            <div className="sm:hidden">
              <DashboardDateCard generatedAt={data.generatedAt} compact />
            </div>
            <div className="hidden sm:block xl:hidden">
              <DashboardDateCard generatedAt={data.generatedAt} />
            </div>
          </motion.div>

          <motion.div
            variants={overviewCardVariants}
            whileHover={{ y: -2 }}
          >
            {isProfileComplete ? <OverviewMetrics data={data} /> : <ProfileWelcomeCard />}
          </motion.div>

          {isProfileComplete && (
            <motion.div variants={overviewCardVariants}>
              <QuickActionsSection />
            </motion.div>
          )}
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            <ReferralPanel userId={data.user._id} referral={data.referral} />
          </motion.div>
        </div>

        <motion.aside
          variants={overviewContainerVariants}
          className="space-y-4"
        >
          <motion.div variants={overviewCardVariants} className="max-xl:hidden">
            <DashboardDateCard generatedAt={data.generatedAt} />
          </motion.div>
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            {overview.isError && <p role="alert" className="p-3 text-sm">Unable to refresh this period. <button onClick={() => void overview.refetch()} className="underline">Try again</button></p>}
            <JobCompletionCard data={data.jobCompletion} period={period} onPeriodChange={setPeriod} loading={overview.isFetching} />
          </motion.div>
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            <SpotlightCard spotlight={data.spotlight} />
          </motion.div>
        </motion.aside>
      </motion.main>
    </Container>
  );
};

export default OverviewWrapper;
