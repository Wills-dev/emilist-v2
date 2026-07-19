"use client";

import { AnimatePresence } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import JobCard from "@/features/jobs/components/JobCard/JobCard";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import ServiceSectionAction from "@/components/molecules/ServiceSectionActions/ServiceSectionAction";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import ExpertCard from "@/features/experts/components/ExpertCard/ExpertCard";
import HomeMaterialSection from "@/features/materials/components/HomeMaterialSection/HomeMaterialSection";
import { useServiceSection } from "./useServiceSection";

const ServiceSection = () => {
  const { currentService, handleServiceChange } = useServiceSection();

  return (
    <div className="md:py-20 py-10 space-y-6 bg-[#FBFFF8]">
      <Container>
        <div className="sm:space-y-6 space-y-4">
          <SectionTitle title="Explore the best offers from the marketplace today" />
          <ServiceSectionAction
            currentService={currentService}
            setCurrentService={handleServiceChange}
          />
        </div>
      </Container>
      <div className="min-h-90.5">
        <AnimatePresence mode="wait">
          {currentService === "experts" && (
            <SectionWrapper className="no-scrollbar ">
              <ExpertCard
                id="1"
                imgUrl="/assets/dummyImages/pipe.svg"
                busniessName="Olawale Pipes & Fittings"
                isVerified={true}
                rating={2}
                noOfReviews={25}
                price={50000}
                period="day"
                currency="NGN"
                location="Lagos, Nigeria helloooooooooooodhdh yest I dont"
                noOfCompletedJobs={28}
                serviceType="Plumber"
                level="Senior"
                isLiked={false}
              />
            </SectionWrapper>
          )}
          {currentService === "jobs" && (
            <SectionWrapper className="no-scrollbar ">
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </SectionWrapper>
          )}
          {currentService === "materials" && <HomeMaterialSection />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceSection;
