"use client";

import Container from "@/components/atoms/Container/Container";
import GrayedLogo from "@/components/atoms/GrayedLogo/GrayedLogo";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";
import SectionWrapper from "@/components/molecules/SectionWrapper/SectionWrapper";
import MaterialCard from "../MaterialCard/MaterialCard";

const OtherSellersMaterials = () => {
  return (
    <div className="bg-[#F4F7F5] relative overflow-hidden">
      <GrayedLogo variant="secondary" />
      <div className=" backdrop-blur-md">
        <Container>
          <div className="py-15">
            <div className="flex max-md:flex-col gap-4">
              <div className="pt-8 space-y-4 max-w-96.25 w-full min-w-72.5">
                <div className="space-y-2">
                  <span className="text-[#18A154]">
                    <svg
                      width="31"
                      height="31"
                      viewBox="0 0 31 31"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.89062 21.5871L21.589 8.88867M21.589 21.5871V8.88867H8.89062"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <h6 className="font-bold font-exo sm:text-[30px] text-2xl leading-10 text-[#18A154]">
                    Other products from Arthur Phillips
                  </h6>
                  <p className="text-[#333E49] text-sm leading-6">
                    Explore other bestsellers from this merchant and discover
                    other quality products you might need for your project.
                  </p>
                </div>
                <SeeAllBtn link="" />
              </div>
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
              </SectionWrapper>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default OtherSellersMaterials;
