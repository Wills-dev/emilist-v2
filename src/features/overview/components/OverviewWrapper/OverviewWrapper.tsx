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
import { insightReportTestData } from "../../constants/insightReportTestData";
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
  const user = useStore((state) => state.currentUser);
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const isProfileComplete = Boolean(user?.isProfileComplete);

  if (!isAuthInitialized) return <OverviewSkeleton />;

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
            <OverviewWelcomeHeader user={user} />
            <div className="sm:hidden">
              <DashboardDateCard compact />
            </div>
            <div className="hidden sm:block xl:hidden">
              <DashboardDateCard />
            </div>
          </motion.div>

          <motion.div
            variants={overviewCardVariants}
            whileHover={{ y: -2 }}
          >
            {isProfileComplete ? <OverviewMetrics /> : <ProfileWelcomeCard />}
          </motion.div>

          {isProfileComplete && (
            <motion.div variants={overviewCardVariants}>
              <QuickActionsSection />
            </motion.div>
          )}
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            <ReferralPanel user={user} />
          </motion.div>
        </div>

        <motion.aside
          variants={overviewContainerVariants}
          className="space-y-4"
        >
          <motion.div variants={overviewCardVariants} className="max-xl:hidden">
            <DashboardDateCard />
          </motion.div>
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            <JobCompletionCard
              dataByPeriod={
                isProfileComplete ? insightReportTestData : undefined
              }
              emptyTitle={
                isProfileComplete
                  ? "No data reports yet"
                  : "No application insights yet"
              }
            />
          </motion.div>
          <motion.div variants={overviewCardVariants} whileHover={{ y: -2 }}>
            <SpotlightCard />
          </motion.div>
        </motion.aside>
      </motion.main>
    </Container>
  );
};

export default OverviewWrapper;
