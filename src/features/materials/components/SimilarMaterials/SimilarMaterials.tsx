"use client";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import MaterialCard from "../MaterialCard/MaterialCard";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";

const SimilarMaterials = ({
  variant = "public",
}: {
  variant?: "public" | "dashboard";
}) => {
  const isDashboard = variant === "dashboard";
  const containerVariant = isDashboard ? "small" : "center";
  const sectionContainerVariant = isDashboard ? "small" : "left";
  const dashboardPadding = isDashboard ? "" : "";

  return (
    <div className="md:py-20 py-10 space-y-6 bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB]">
      <Container variant={containerVariant} className={dashboardPadding}>
        <div className="sm:space-y-6 space-y-4 flex items-center justify-between gap-4">
          <SectionTitle title="Explore similar products" />
          <SeeAllBtn link="" />
        </div>
      </Container>
      <div className="min-h-90.5">
        <SectionWrapper
          className="no-scrollbar "
          containerVariant={sectionContainerVariant}
          containerClassName={dashboardPadding}
        >
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
      </div>
    </div>
  );
};

export default SimilarMaterials;
