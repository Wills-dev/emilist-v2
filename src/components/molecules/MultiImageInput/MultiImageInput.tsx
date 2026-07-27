"use client";

import Image from "next/image";
import { useId } from "react";

import { ImagePlus } from "lucide-react";
import DeleteBtn from "@/components/atoms/DeleteBtn/DeleteBtn";

const MultiImageInput = ({
  removeImage,
  addImage,
  preview,
}: {
  removeImage: (i: number) => void;
  addImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  preview: string[];
}) => {
  const inputId = useId();

  return (
    <div className="min-h-35 w-full overflow-y-auto rounded-[10px] bg-[#ECECEC] p-2 backdrop-blur-2xl">
      <div className="flex flex-wrap gap-2">
        {preview.map((item, index) => (
          <div
            key={item}
            className="relative h-20 w-20 overflow-hidden rounded-[10px] bg-white"
          >
            <Image
              src={item}
              alt={`Selected material image ${index + 1}`}
              fill
              className="object-cover"
            />
            <DeleteBtn removeImg={() => removeImage(index)} />
          </div>
        ))}

        <label
          htmlFor={inputId}
          className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-[10px] border border-dashed border-[#A2A4A2] bg-white text-[#A2A4A2]"
          aria-label={preview.length ? "Add more images" : "Add images"}
        >
          <ImagePlus className="size-5" />
          <input
            type="file"
            name="image"
            id={inputId}
            accept="image/*"
            multiple
            onChange={addImage}
            className="sr-only"
          />
        </label>
      </div>
    </div>
  );
};

export default MultiImageInput;
