"use client";

import { AnimatePresence } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import ServiceSectionAction from "@/components/molecules/ServiceSectionActions/ServiceSectionAction/ServiceSectionAction";
import HomeExpertSection from "@/features/experts/components/HomeExpertSection/HomeExpertSection";
import HomeJobSection from "@/features/jobs/components/HomeJobSection/HomeJobSection";
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
            <HomeExpertSection />
          )}
          {currentService === "jobs" && <HomeJobSection />}
          {currentService === "materials" && <HomeMaterialSection />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceSection;
