"use client";

import Image from "next/image";
import { Plus, X } from "lucide-react";
import { useId } from "react";

const JobImageInput = ({
  previews,
  onAdd,
  onRemove,
  maxFiles = 10,
}: {
  previews: string[];
  onAdd: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: (index: number) => void;
  maxFiles?: number;
}) => {
  const inputId = useId();
  const atLimit = previews.length >= maxFiles;

  return (
    <div className="space-y-3">
      {previews.length > 0 && (
        <div className="flex flex-wrap gap-2" aria-label="Selected job images">
          {previews.map((preview, index) => (
            <div
              key={preview}
              className="relative size-20 overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-[#ECECEC]"
            >
              <Image
                src={preview}
                alt={`Selected job image ${index + 1}`}
                fill
                unoptimized
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => onRemove(index)}
                aria-label={`Remove job image ${index + 1}`}
                className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-[#FF5D7A] shadow-sm"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
      <label
        htmlFor={inputId}
        aria-disabled={atLimit}
        className={`inline-flex items-center gap-1 font-exo text-sm text-[#6667FF] ${atLimit ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:underline"}`}
      >
        <Plus className="size-4" />
        {atLimit ? `Maximum ${maxFiles} images reached` : "Upload images"}
      </label>
      <input
        id={inputId}
        name="files"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        multiple
        disabled={atLimit}
        onChange={onAdd}
        className="sr-only"
      />
    </div>
  );
};

export default JobImageInput;
