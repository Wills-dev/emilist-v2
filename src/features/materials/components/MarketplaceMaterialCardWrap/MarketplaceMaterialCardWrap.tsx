"use client";

import { motion } from "framer-motion";

import MaterialCard from "../MaterialCard/MaterialCard";

const MarketplaceMaterialCardWrap = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-wrap gap-6 xl:max-h-screen xl:overflow-y-auto no-scrollbar"
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
    </motion.div>
  );
};

export default MarketplaceMaterialCardWrap;
