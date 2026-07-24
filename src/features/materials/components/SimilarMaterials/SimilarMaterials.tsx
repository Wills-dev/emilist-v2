"use client";

import { motion } from "framer-motion";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";

import MaterialCard from "../MaterialCard/MaterialCard";
import SeeAllBtn from "@/components/atoms/SeeAllBtn/SeeAllBtn";

const SimilarMaterials = () => {
  return (
    <div className="md:py-20 py-10  bg-linear-to-b from-0% from-white to-100% to-[#FBFBFB]">
      <Container variant="small">
        <div className="space-y-6 w-full">
          <div className="sm:space-y-6 space-y-4 flex items-center justify-between gap-4">
            <SectionTitle title="Explore similar products" />
            <SeeAllBtn link="" />
          </div>
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full flex items-center max-sm:flex-col gap-6 overflow-x-auto no-scrollbar"
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
          </motion.section>
        </div>
      </Container>
    </div>
  );
};

export default SimilarMaterials;
