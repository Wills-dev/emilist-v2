"use client";

import Image from "next/image";
import { X } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import { useServicePhotos, type ServicePhotosProps } from "../../hooks/useServicePhotos";

const ServicePhotosCard = (props: ServicePhotosProps) => {
  const { expert } = props;
  const photos = useServicePhotos(props);

  return (
    <div className="rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-exo font-medium">Business Photos</h3>
        <Button
          variant="secondary"
          className="h-8 px-3! py-2 text-xs"
          onClick={photos.toggleEditing}
          disabled={photos.busy}
        >
          {photos.editing ? "Done" : "Edit"}
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {photos.images.map((image, index) => (
          <div
            key={`${image}-${index}`}
            className="relative size-24 shrink-0 overflow-hidden rounded-lg border border-[#ECECEC]"
          >
            <Image
              src={image}
              alt={`${expert.businessName} work ${index + 1}`}
              fill
              className="object-cover"
            />
            {photos.editing && (
              <button
                type="button"
                aria-label={`Remove business photo ${index + 1}`}
                data-index={index}
                disabled={photos.busy}
                onClick={photos.handleRemove}
                className="absolute right-1 top-1 z-10 grid size-5 place-items-center rounded-full bg-white text-[#FF5D7A] shadow-sm disabled:opacity-50"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        ))}
        {photos.editing && (
          <label className="grid size-24 shrink-0 cursor-pointer place-items-center rounded-lg border border-dashed border-[#B8B9B8] text-xl text-[#737774]">
            ＋
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={photos.handleFiles}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ServicePhotosCard;

