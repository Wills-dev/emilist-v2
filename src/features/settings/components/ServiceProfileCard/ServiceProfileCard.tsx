import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import ClockIcon from "@/components/atoms/icons/ClockIcon";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import { UserExpertService } from "../../types/expertService";

const ServiceProfileCard = ({
  expert,
  experts,
  activeId,
  onSelect,
  onRequestVerification,
  profileImage,
}: {
  expert: UserExpertService;
  experts: UserExpertService[];
  activeId: string;
  onSelect: (id: string) => void;
  onRequestVerification: () => void;
  profileImage: ReturnType<typeof useProfileImageUpload>;
}) => (
  <div className="rounded-lg bg-[#F4F7F5] p-3">
    <div className="mb-4 w-fit rounded-lg bg-white px-2">
      <select
        value={activeId}
        onChange={(event) => onSelect(event.target.value)}
        aria-label="Switch expert service"
        className="h-9 min-w-40 bg-white text-sm outline-none"
      >
        {experts.map((item) => (
          <option key={item.id} value={item.id}>
            {item.service}
          </option>
        ))}
      </select>
    </div>

    <div className="rounded-lg bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="relative size-28 shrink-0 overflow-visible">
          <div className="relative size-full overflow-hidden rounded-full">
            <Image
              src={
                profileImage.photoPreview ||
                expert.image ||
                "/assets/images/avatar.svg"
              }
              alt={expert.businessName}
              fill
              className="object-cover"
            />
          </div>
          {expert.isVerified && (
            <BadgeCheck className="absolute -right-1 top-0 size-6 fill-[#25C269] text-white" />
          )}
        </div>

        <div className="flex flex-wrap content-center items-center gap-2">
          <input
            id={`expert-photo-${expert.id}`}
            type="file"
            accept="image/*"
            onChange={profileImage.handlePhotoChange}
            className="sr-only"
          />
          {profileImage.photoFile ? (
            <>
              <Button
                variant="default"
                className="h-8 px-3! py-2 text-xs"
                onClick={profileImage.cancelPhoto}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="h-8 px-3! py-2 text-xs"
                loading={profileImage.isSavingPhoto}
                onClick={profileImage.savePhoto}
              >
                Save Photo
              </Button>
            </>
          ) : (
            <label
              htmlFor={`expert-photo-${expert.id}`}
              className="flex h-8 cursor-pointer items-center rounded-[10px] border border-[#25C269] px-3! font-exo text-xs font-semibold text-[#25C269]"
            >
              Edit Display Photo
            </label>
          )}
          <Button
            variant="default"
            className="h-8 px-3! py-2 text-xs"
            onClick={onRequestVerification}
            disabled={expert.isVerified}
          >
            Request Verification
          </Button>
        </div>
      </div>
    </div>

    <div className="mt-3 rounded-lg bg-white p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-exo text-lg font-semibold">
          {expert.businessName}
        </h2>
        <PriceWrapper
          price={Number(expert.startingPrice)}
          currency={expert.currency}
          title="starts from"
          unit={expert.rateUnit.replace("per ", "")}
        />
      </div>
      <div className="mt-2 flex items-center gap-2">
        <Rating rating={expert.rating} />
        <span className="text-xs text-[#737774]">
          ({expert.reviews} reviews)
        </span>
      </div>
    </div>

    <div className="mt-3 rounded-lg bg-white p-4">
      <InfoItem value={expert.level} variant="sm" />
      <div className="mt-4 flex flex-wrap gap-5">
        <InfoItem
          value={`${expert.businessState}, ${expert.businessCountry}`}
          icon={<LocationIcon />}
          className="text-[#6667FF]"
        />
        <InfoItem value={expert.noticePeriod} icon={<ClockIcon />} />
        <InfoItem
          value={`${expert.numberOfEmployee} employees`}
          icon={<UserIcon />}
        />
      </div>
    </div>
  </div>
);

export default ServiceProfileCard;
