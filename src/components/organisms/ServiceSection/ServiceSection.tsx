"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import JobCard from "@/features/jobs/components/JobCard/JobCard";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import ServiceSectionAction from "@/components/molecules/ServiceSectionActions/ServiceSectionAction";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";

const ServiceSection = () => {
  const [currentService, setCurrentService] = useState<
    "jobs" | "materials" | "experts"
  >("jobs");

  return (
    <div className="md:py-20 py-10 space-y-6">
      <Container>
        <div className="sm:space-y-6 space-y-4">
          <SectionTitle title="Explore the best offers from the marketplace today" />
          <ServiceSectionAction
            currentService={currentService}
            setCurrentService={setCurrentService}
          />
        </div>
      </Container>
      <AnimatePresence mode="wait">
        {currentService === "jobs" && (
          <SectionWrapper className="no-scrollbar">
            <JobCard />
            <JobCard />
            <JobCard />
            <JobCard />
          </SectionWrapper>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceSection;
