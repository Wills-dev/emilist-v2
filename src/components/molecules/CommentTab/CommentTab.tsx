"use client";

import { motion } from "framer-motion";

import QuoteIcon from "@/components/atoms/icons/QuoteIcon";
import Dot from "@/components/atoms/Dot/Dot";

const CommentTab = ({
  length,
  comment,
  name,
  location,
  onCommentSwitch,
  index,
}: {
  length: number;
  comment: string;
  name: string;
  location: string;
  onCommentSwitch: (index: number) => void;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ x: 40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -40, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sm:p-16 p-6 sm:space-y-10 space-y-4 rounded-[24px] shadow-sm max-w-157 w-full md:min-w-157 min-w-72.5 sm:h-119.25 h-auto"
    >
      <div className="sm:max-w-22.75 max-w-16 w-full h-auto">
        <QuoteIcon />
      </div>
      <div className="sm:space-y-6 space-y-3">
        <p className="font-exo sm:text-[20px] leading-7 text-[#8A8D8B]">
          {comment}
        </p>
        <p className="font-semibold max-sm:text-sm text-[#474C48]">
          {name}, {location}
        </p>
      </div>
      <div className="w-fit flex items-center gap-1.5 h-7.5 bg-[#F4F7F5] p-2.25 rounded-[9px]">
        {Array.from({ length: length }).map((_, i) => (
          <button
            key={i}
            onClick={() => onCommentSwitch(i)}
            className="cursor-pointer"
          >
            <Dot
              className="w-3 h-3"
              variant={i === index ? "primary" : "default"}
            />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CommentTab;
