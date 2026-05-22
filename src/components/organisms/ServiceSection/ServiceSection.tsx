"use client";

import { useState } from "react";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import ServiceSectionAction from "@/components/molecules/ServiceSectionActions/ServiceSectionAction";

const ServiceSection = () => {
  const [currentService, setCurrentService] = useState<
    "jobs" | "materials" | "experts"
  >("jobs");

  return (
    <div className="md:py-20 py-10">
      <Container>
        <div className="sm:space-y-6 space-y-4">
          <SectionTitle title="Explore the best offers from the marketplace today" />
          <ServiceSectionAction
            currentService={currentService}
            setCurrentService={setCurrentService}
          />
        </div>
      </Container>
    </div>
  );
};

export default ServiceSection;
