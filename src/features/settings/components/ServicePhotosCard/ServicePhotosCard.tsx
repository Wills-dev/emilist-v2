"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import { UserExpertService } from "../../types/expertService";

const ServicePhotosCard = ({
  expert,
  onUpdate,
  onSave,
}: {
  expert: UserExpertService;
  onUpdate: (expert: UserExpertService) => void;
  onSave: (expert: UserExpertService) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const finishEditing = () => {
    if (files.length > 0) {
      onSave({ ...expert, businessImageFiles: files });
      setFiles([]);
    }
    setEditing(false);
  };

  const removePhoto = (index: number) => {
    if (index < expert.businessImages.length) {
      const updated = {
        ...expert,
        businessImages: expert.businessImages.filter(
          (_, imageIndex) => imageIndex !== index,
        ),
      };
      onUpdate(updated);
      onSave(updated);
      return;
    }

    const previewIndex = index - expert.businessImages.length;
    URL.revokeObjectURL(previews[previewIndex]);
    setPreviews((items) =>
      items.filter((_, imageIndex) => imageIndex !== previewIndex),
    );
    setFiles((items) =>
      items.filter((_, imageIndex) => imageIndex !== previewIndex),
    );
  };

  return (
    <div className="rounded-lg p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-exo font-medium">Business Photos</h3>
        <Button
          variant="secondary"
          className="h-8 px-3! py-2 text-xs"
          onClick={() => (editing ? finishEditing() : setEditing(true))}
        >
          {editing ? "Done" : "Edit"}
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto">
        {[...expert.businessImages, ...previews].map((image, index) => (
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
            {editing && (
              <button
                type="button"
                aria-label={`Remove business photo ${index + 1}`}
                onClick={() => removePhoto(index)}
                className="absolute right-1 top-1 z-10 grid size-5 place-items-center rounded-full bg-white text-[#FF5D7A] shadow-sm"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        ))}
        {editing && (
          <label className="grid size-24 shrink-0 cursor-pointer place-items-center rounded-lg border border-dashed border-[#B8B9B8] text-xl text-[#737774]">
            ＋
            <input
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => {
                const selectedFiles = Array.from(event.target.files ?? []);
                setPreviews((items) => [
                  ...items,
                  ...selectedFiles.map((file) => URL.createObjectURL(file)),
                ]);
                setFiles((items) => [...items, ...selectedFiles]);
              }}
            />
          </label>
        )}
      </div>
    </div>
  );
};

export default ServicePhotosCard;

