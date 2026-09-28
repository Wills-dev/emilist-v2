"use client";

import Image from "next/image";
import { X } from "lucide-react";

export interface ExistingJobFile {
  id: string;
  url: string;
}

const ExistingJobFiles = ({
  files,
  onRemove,
  removingFileId,
}: {
  files: ExistingJobFile[];
  onRemove: (fileId: string) => void;
  removingFileId?: string | null;
}) => {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="font-exo text-sm text-[#474C48]">Current images</p>
      <div className="flex flex-wrap gap-2" aria-label="Existing job images">
        {files.map((file, index) => (
          <div
            key={file.id}
            className="relative size-20 overflow-hidden rounded-[10px] border border-[#E5E5E5] bg-[#ECECEC]"
          >
            <Image
              src={file.url}
              alt={`Job image ${index + 1}`}
              fill
              unoptimized
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove(file.id)}
              disabled={removingFileId === file.id}
              aria-label={`Remove job image ${index + 1}`}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-white/90 text-[#FF5D7A] shadow-sm disabled:opacity-50"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExistingJobFiles;
