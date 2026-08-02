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

const OverviewWrapper = () => {
  const user = useStore((state) => state.currentUser);
  const isProfileComplete = Boolean(user?.isProfileComplete);

  return (
    <Container variant="small">
      <main className="grid gap-4 py-4 xl:grid-cols-[minmax(0,2fr)_minmax(280px,0.9fr)]">
        <div className="space-y-4">
          <div className="grid grid-cols-[minmax(0,1fr)_84px] gap-2 sm:grid-cols-[1fr_220px] sm:gap-4 xl:block">
            <OverviewWelcomeHeader user={user} />
            <div className="sm:hidden">
              <DashboardDateCard compact />
            </div>
            <div className="hidden sm:block xl:hidden">
              <DashboardDateCard />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {isProfileComplete ? <OverviewMetrics /> : <ProfileWelcomeCard />}
          </motion.div>

          {isProfileComplete && <QuickActionsSection />}
          <ReferralPanel user={user} />
        </div>

        <aside className="space-y-4">
          <div className="max-xl:hidden">
            <DashboardDateCard />
          </div>
          <JobCompletionCard
            dataByPeriod={isProfileComplete ? insightReportTestData : undefined}
            emptyTitle={
              isProfileComplete
                ? "No data reports yet"
                : "No application insights yet"
            }
          />
          <SpotlightCard />
        </aside>
      </main>
    </Container>
  );
};

export default OverviewWrapper;
