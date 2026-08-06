"use client";

import Image from "next/image";

import { BadgeCheck } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import IdentifierBadge from "@/components/atoms/IdentifierBadge/IdentifierBadge";
import Rating from "@/components/molecules/Rating/Rating";

import { User } from "@/store/authStore";

interface UserProfileSummaryProps {
  user: User | null;
  displayName: string;
  photoFile: File | null;
  photoPreview: string;
  isSaving: boolean;
  onPhotoChange: React.ChangeEventHandler<HTMLInputElement>;
  onSavePhoto: () => void;
  onCancelPhoto: () => void;
}

const UserProfileSummary = ({
  user,
  displayName,
  photoFile,
  photoPreview,
  isSaving,
  onPhotoChange,
  onSavePhoto,
  onCancelPhoto,
}: UserProfileSummaryProps) => {
  const inputId = "profile-photo-input";
  return (
    <section className="flex min-h-64 flex-col rounded-lg bg-[#F9F9F9] p-4">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col">
        <div className="relative size-36 shrink-0 max-sm:size-28">
          <div className="relative size-full overflow-hidden rounded-full bg-[#6B7280]">
            <Image
              src={photoPreview || "/assets/images/avatar.svg"}
              alt={`${displayName} profile`}
              fill
              unoptimized={Boolean(photoPreview)}
              className="object-cover"
            />
          </div>
          {user?.isVerified && (
            <BadgeCheck className="absolute right-2 top-1 z-10 size-7 fill-[#25C269] text-white max-sm:size-6" />
          )}
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 max-sm:w-full max-sm:justify-start">
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="sr-only"
          />
          {photoFile ? (
            <>
              <Button
                variant="default"
                onClick={onCancelPhoto}
                className="h-8 px-3! text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={onSavePhoto}
                loading={isSaving}
                className="h-8 px-3! text-xs"
              >
                Save Photo
              </Button>
            </>
          ) : (
            <label
              htmlFor={inputId}
              className="flex h-8 cursor-pointer items-center rounded-[10px] border border-[#25C269] bg-[#FBFFF8] px-3 font-exo font-semibold text-[#25C269] transition-colors hover:bg-green-50 text-xs"
            >
              Edit Display Photo
            </label>
          )}
          <Button variant="default" className="h-8 px-3! text-xs">
            Request Verification
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h2 className="font-exo sm:text-2xl font-semibold text-[#202521] text-xl">
          {displayName}
        </h2>
        <div className="flex items-center gap-2">
          <Rating rating={user?.rating ?? 0} />
          <span className="text-xs text-[#5E625F]">
            ({user?.totalReviews ?? 0} reviews)
          </span>
        </div>
      </div>

      <div className="mt-3 flex w-full flex-wrap gap-2">
        <IdentifierBadge
          label="Email"
          value={user?.email || "Not provided"}
          maxWidth="max-w-[150px]"
        />
        <IdentifierBadge
          label="Unique ID"
          value={user?.uniqueId || user?._id || "Not provided"}
        />
      </div>
    </section>
  );
};

export default UserProfileSummary;
