"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

import FileName from "@/components/atoms/FileName/FileName";
import PaginationControls from "@/components/atoms/PaginationControls/PaginationControls";

type ImageSource =
  | string
  | {
      url?: string;
      secure_url?: string;
      imageUrl?: string;
    };

const getImageUrl = (image: ImageSource) => {
  if (typeof image === "string") return image;

  return image.secure_url || image.url || image.imageUrl;
};

const ImageSliderWrapper = ({
  images = [],
  productName = "product",
  imageClassName,
  showFileNames = false,
  attachments = [],
}: {
  images?: ImageSource[];
  productName?: string;
  imageClassName?: string;
  showFileNames?: boolean;
  attachments?: { url: string; name: string }[];
}) => {
  const imageUrls = images
    .map(getImageUrl)
    .filter((image): image is string => Boolean(image));
  const [activeImage, setActiveImage] = useState(0);
  const currentImage =
    imageUrls[activeImage] || "/assets/images/default-job-image.svg";
  const hasImages = imageUrls.length > 0;

  return (
    <div className="space-y-4 pb-4 border-b border-[#ECECEC] max-w-168.75">
      <div
        className={cn(
          "w-full sm:h-81.25 h-40 rounded-[16px] sm:p-2 p-1 bg-[#EDEEF0]",
          imageClassName,
        )}
      >
        <Image
          src={currentImage}
          alt={productName}
          height={309}
          width={659}
          className="object-cover h-full w-full rounded-[12px]"
        />
      </div>
      <div className="flex items-center justify-between">
        <PaginationControls
          disableNext={!hasImages || activeImage === imageUrls.length - 1}
          disablePrev={!hasImages || activeImage === 0}
          prev={() => setActiveImage((current) => current - 1)}
          next={() => setActiveImage((current) => current + 1)}
        />
        <p className="text-[#707471] italic text-xs">
          {hasImages ? `${activeImage + 1} of ${imageUrls.length}` : "1 of 1"}
        </p>
      </div>
      <div className="flex items-center overflow-x-auto w-full gap-2 pb-1 no-scrollbar">
        {imageUrls.map((image, index) => (
          <FileName
            key={image}
            fileName={
              showFileNames
                ? image.split(/[?#]/)[0].split("/").pop() ||
                  `Image ${index + 1}`
                : `Image ${index + 1}`
            }
            onClick={() => setActiveImage(index)}
            active={index === activeImage}
          />
        ))}
        {attachments.map((file) => (
          <a
            key={file.url}
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full bg-white px-2 text-sm text-[#737774] hover:underline"
          >
            {file.name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default ImageSliderWrapper;
