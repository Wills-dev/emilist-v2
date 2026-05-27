"use client";

import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import JobCard from "@/features/jobs/components/JobCard/JobCard";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import ServiceSectionAction from "@/components/molecules/ServiceSectionActions/ServiceSectionAction";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import MaterialCard from "@/features/materials/components/MaterialCard/MaterialCard";

const ServiceSection = () => {
  const [currentService, setCurrentService] = useState<
    "jobs" | "materials" | "experts"
  >("jobs");

  return (
    <div className="md:py-20 py-10 space-y-6 bg-[#FBFFF8]">
      <Container>
        <div className="sm:space-y-6 space-y-4">
          <SectionTitle title="Explore the best offers from the marketplace today" />
          <ServiceSectionAction
            currentService={currentService}
            setCurrentService={setCurrentService}
          />
        </div>
      </Container>
      <div className="min-h-90.5">
        <AnimatePresence mode="wait">
          {currentService === "jobs" && (
            <SectionWrapper className="no-scrollbar ">
              <JobCard />
              <JobCard />
              <JobCard />
              <JobCard />
            </SectionWrapper>
          )}
          {currentService === "materials" && (
            <SectionWrapper className="no-scrollbar ">
              <MaterialCard
                id="1"
                productName="Dangote Cement"
                price={1000}
                unit="bag"
                location="Alapere, Ketu"
                createdAt="2026-05-19T14:32:10.123Z"
                isLiked={true}
                currency="NGN"
                imgUrl="/assets/dummyImages/dummy-image.svg"
                profileImg=""
                fullName="Kalu & Sons Store"
                rating={3}
                noOfReviews={31}
              />
              <MaterialCard
                id="1"
                productName="8mm Solid Blocks"
                price={1200}
                unit="bag"
                location="Sabo, Yaba"
                createdAt="2026-05-27T14:32:10.123Z"
                isLiked={false}
                currency="NGN"
                imgUrl="/assets/dummyImages/dummy-image.svg"
                profileImg=""
                fullName="Mohammed Block Factory"
                rating={4}
                noOfReviews={20}
              />
              <MaterialCard
                id="1"
                productName="Steel Rod 60mm"
                price={34000}
                unit="bundle"
                location="Ajah, Lagos"
                createdAt="2026-05-25T14:32:10.123Z"
                isLiked={false}
                currency="NGN"
                imgUrl="/assets/dummyImages/rode.svg"
                profileImg=""
                fullName="Victor Falade"
                rating={5}
                noOfReviews={51}
              />
            </SectionWrapper>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServiceSection;
