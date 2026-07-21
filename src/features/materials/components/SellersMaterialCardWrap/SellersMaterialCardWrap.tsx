"use client";

import { motion } from "framer-motion";
import MaterialCard from "../MaterialCard/MaterialCard";

const SellersMaterialCardWrap = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <div className="flex items-center max-sm:flex-col gap-6">
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
      </div>
    </motion.section>
  );
};

export default SellersMaterialCardWrap;
