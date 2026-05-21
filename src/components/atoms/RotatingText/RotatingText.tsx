"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const words = [
  "service providers",
  "plumbing team",
  "furniture makers",
  "flooring experts",
  "signage fabricators",
  "roofing installers",
  "cleaning team",
  "auto mechanics",
  "interior designers",
  "gardening crew",
  "and other experts",
];

const RotatingText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block text-[#18A154] text-center lg:w-122.5 md:w-102.5 sm:w-90 w-72.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute left-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
      <span className="invisible whitespace-nowrap">{words[0]}</span>
    </span>
  );
};

export default RotatingText;
