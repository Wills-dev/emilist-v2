import Image from "next/image";

import { ImagePlus } from "lucide-react";
import { ChangeEvent } from "react";

const SingleImageInput = ({
  imagePreview,
  deleteImage,
  handleImageChange,
  id = "image",
}: {
  imagePreview: string;
  deleteImage: () => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
}) => {
  return (
    <label htmlFor={id} className="">
      <div className="h-35 backdrop-blur-2xl bg-[#ECECEC] p-1.5 w-full rounded-[10px]">
        {imagePreview ? (
          <div className="relative overflow-hidden rounded-[10px] w-full h-full bg-white">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="h-full w-full object-cover"
            />

            <button
              type="button"
              onClick={deleteImage}
              className="absolute right-1 top-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white cursor-pointer"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            {" "}
            <div className="w-full h-full bg-white rounded-[10px] border border-dashed flex justify-center items-center border-[#A2A4A2] text-[#A2A4A2]">
              <ImagePlus />
              <input
                type="file"
                name={id}
                id={id}
                accept="image/*"
                onChange={handleImageChange}
                className="invisible h-0 w-0"
              />
            </div>
          </>
        )}
      </div>
    </label>
  );
};

export default SingleImageInput;
