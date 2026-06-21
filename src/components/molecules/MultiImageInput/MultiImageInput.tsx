"use client";

import Image from "next/image";

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
  // const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <label htmlFor="image" className="">
      <div className="h-35 backdrop-blur-2xl bg-[#ECECEC] p-1.5 w-full rounded-[10px] overflow-y-auto">
        {preview.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {preview?.map((item, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-[10px] w-15 h-15 bg-white"
              >
                <Image
                  src={item}
                  alt="Preview"
                  fill
                  className="h-full w-full object-cover"
                />
                <DeleteBtn removeImg={() => removeImage(i)} />
              </div>
            ))}
            {/* <button
              onClick={() => inputRef.current?.click()}
              className="flex items-center gap-1 text-xs text-[#25C269]"
            >
              <span>ADD MORE </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button> */}
          </div>
        ) : (
          <>
            {" "}
            <div
              // onClick={() => inputRef.current?.click()}
              className="w-full h-full bg-white rounded-[10px] border border-dashed flex justify-center items-center border-[#A2A4A2] text-[#A2A4A2]"
            >
              <ImagePlus />
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                multiple
                onChange={addImage}
                className="invisible h-0 w-0"
              />
            </div>
          </>
        )}
      </div>
    </label>
  );
};

export default MultiImageInput;
