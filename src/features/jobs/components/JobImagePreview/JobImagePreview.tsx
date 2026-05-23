"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import ImageIcon from "@/components/atoms/icons/ImageIcon";

const ImagePreview = dynamic(
  () => import("@/components/atoms/ImagePreview/ImagePreview"),
);

import { defaultJobImage } from "../../constants";

const JobImagePreview = ({ imgUrl }: { imgUrl?: string }) => {
  const [openPreview, setOpenPreview] = useState(false);

  const jobImage = imgUrl || defaultJobImage;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenPreview(true)}
        className="max-w-[38.66px] w-full h-[34.66px] bg-white rounded-lg text-[#8A8D8B] text-[23px] flex justify-center items-center shadow-sm cursor-pointer"
      >
        <ImageIcon />
      </button>
      {openPreview && (
        <ImagePreview
          imageUrl={jobImage}
          onCancel={() => setOpenPreview(false)}
          alt="job-image"
        />
      )}
    </>
  );
};

export default JobImagePreview;
