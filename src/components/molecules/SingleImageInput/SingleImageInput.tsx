import Image from "next/image";

import { ImagePlus } from "lucide-react";
import { ChangeEvent } from "react";

const SingleImageInput = ({
  imagePreview,
  deleteImage,
  handleImageChange,
  id = "image",
  rounded = false,
}: {
  imagePreview: string;
  deleteImage: () => void;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  rounded?: boolean;
}) => {
  return (
    <label htmlFor={id} className={rounded ? "w-35 self-start" : ""}>
      <div className={`relative h-35 backdrop-blur-2xl bg-[#ECECEC] p-1.5 w-full ${rounded ? "rounded-full" : "rounded-[10px]"}`}>
        {imagePreview ? (
          <div className={`relative overflow-hidden w-full h-full bg-white ${rounded ? "rounded-full" : "rounded-[10px]"}`}>
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="h-full w-full object-cover"
            />


          </div>
        ) : (
          <>
            {" "}
            <div className={`w-full h-full bg-white border border-dashed flex justify-center items-center border-[#A2A4A2] text-[#A2A4A2] ${rounded ? "rounded-full" : "rounded-[10px]"}`}>
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
        {imagePreview && (
            <button
              type="button"
              aria-label="Remove photo"
              onClick={deleteImage}
              className="absolute right-1 top-1 rounded-full bg-red-500 px-2 py-1 text-xs text-white cursor-pointer"
            >
              ×
            </button>
        )}
      </div>
    </label>
  );
};

export default SingleImageInput;
