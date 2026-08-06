"use client";

import { useState } from "react";
import Image from "next/image";
import { BadgeCheck, X } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import InfoItem from "@/components/atoms/InfoItem/InfoItem";
import ClockIcon from "@/components/atoms/icons/ClockIcon";
import LocationIcon from "@/components/atoms/icons/LocationIcon";
import UserIcon from "@/components/atoms/icons/UserIcon";
import PriceWrapper from "@/components/molecules/PriceWrapper/PriceWrapper";
import Rating from "@/components/molecules/Rating/Rating";
import Textarea from "@/components/atoms/TextArea/Textarea";
import { motion } from "framer-motion";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import { useExpertServicesSettings } from "../../hooks/useExpertServicesSettings";
import EditExpertServiceModal from "../EditExpertServiceModal/EditExpertServiceModal";
import ManageExpertCredentialsModal from "../ManageExpertCredentialsModal/ManageExpertCredentialsModal";
import SettingsConfirmationModal from "../SettingsConfirmationModal/SettingsConfirmationModal";
import { toast } from "sonner";

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-[#474C48]">{label}</p>
    <p className="mt-2 rounded-lg bg-[#F7F7F7] px-4 py-3 text-[#737774]">
      {value || "—"}
    </p>
  </div>
);

const ServicesTab = () => {
  const settings = useExpertServicesSettings();
  const [editOpen, setEditOpen] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const [descriptionEditing, setDescriptionEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [photosEditing, setPhotosEditing] = useState(false);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [businessPhotoFiles, setBusinessPhotoFiles] = useState<File[]>([]);
  const profileImage = useProfileImageUpload();
  const expert = settings.activeExpert;
  const save = (updated: typeof expert, close: (open: boolean) => void) =>
    settings.saveExpert(updated, { onSuccess: () => close(false) });

  return (
    <section className="space-y-4">
      <motion.div
        key={expert.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-3 bg-white p-2 xl:grid-cols-[1.05fr_1fr]"
      >
        <div className="rounded-lg bg-[#F4F7F5] p-3">
          <div className="mb-4 w-fit rounded-lg bg-white px-2">
            <select
              value={settings.activeId}
              onChange={(e) => settings.setActiveId(e.target.value)}
              aria-label="Switch expert service"
              className="h-9 min-w-40 bg-white text-sm outline-none"
            >
              {settings.experts.map((item) => (
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
                  onClick={() => setVerificationOpen(true)}
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
        <div className="space-y-3 rounded-lg bg-[#F4F7F5] p-3">
          <div className="min-h-38 rounded-lg bg-white p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-exo font-medium">Business Description</h3>
              <Button
                variant="secondary"
                className="h-8 px-3! py-2 text-xs"
                onClick={() => {
                  setDescription(expert.businessDescription);
                  setDescriptionEditing(true);
                }}
              >
                Edit
              </Button>
            </div>
            {descriptionEditing ? (
              <>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-4 min-h-28"
                />
                <div className="mt-3 flex justify-end gap-2">
                  <Button
                    variant="default"
                    className="h-8 px-3! py-2 text-xs"
                    onClick={() => setDescriptionEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    className="h-8 px-3! py-2 text-xs"
                    onClick={() => {
                      settings.saveExpert({
                        ...expert,
                        businessDescription: description,
                      });
                      setDescriptionEditing(false);
                    }}
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <p className="mt-5 text-sm leading-6 text-[#737774]">
                {expert.businessDescription}
              </p>
            )}
          </div>
          <div className="rounded-lg p-4">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-exo font-medium">Business Photos</h3>
              <Button
                variant="secondary"
                className="h-8 px-3! py-2 text-xs"
                onClick={() => {
                  if (photosEditing && businessPhotoFiles.length > 0) {
                    settings.saveExpert({
                      ...expert,
                      businessImageFiles: businessPhotoFiles,
                    });
                    setBusinessPhotoFiles([]);
                  }
                  setPhotosEditing((value) => !value);
                }}
              >
                {photosEditing ? "Done" : "Edit"}
              </Button>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {[...expert.businessImages, ...photoPreviews].map(
                (image, index) => (
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
                    {photosEditing && (
                      <button
                        type="button"
                        aria-label={`Remove business photo ${index + 1}`}
                        onClick={() => {
                          if (index < expert.businessImages.length) {
                            const updated = {
                              ...expert,
                              businessImages: expert.businessImages.filter(
                                (_, imageIndex) => imageIndex !== index,
                              ),
                            };
                            settings.updateExpertLocally(updated);
                            settings.saveExpert(updated);
                            return;
                          }

                          const previewIndex =
                            index - expert.businessImages.length;
                          URL.revokeObjectURL(photoPreviews[previewIndex]);
                          setPhotoPreviews((items) =>
                            items.filter(
                              (_, imageIndex) => imageIndex !== previewIndex,
                            ),
                          );
                          setBusinessPhotoFiles((items) =>
                            items.filter(
                              (_, imageIndex) => imageIndex !== previewIndex,
                            ),
                          );
                        }}
                        className="absolute right-1 top-1 z-10 grid size-5 place-items-center rounded-full bg-white text-[#FF5D7A] shadow-sm"
                      >
                        <X className="size-3" />
                      </button>
                    )}
                  </div>
                ),
              )}
              {photosEditing && (
                <label className="grid size-24 shrink-0 cursor-pointer place-items-center rounded-lg border border-dashed border-[#B8B9B8] text-xl text-[#737774]">
                  ＋
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      setPhotoPreviews((items) => [
                        ...items,
                        ...files.map((file) => URL.createObjectURL(file)),
                      ]);
                      setBusinessPhotoFiles((items) => [...items, ...files]);
                    }}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <div className="bg-white p-2">
        <div className="rounded-lg bg-white p-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-exo font-semibold">Business Details</h2>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                className="h-8 px-3! py-2 text-xs"
                onClick={() => setEditOpen(true)}
              >
                Edit Service
              </Button>
              <Button
                variant="secondary"
                className="h-8 px-3! py-2 text-xs"
                onClick={() => setCredentialsOpen(true)}
              >
                Manage Credentials
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
            <Detail
              label="Coverage areas"
              value={expert.coverageArea.join(", ")}
            />
            <Detail label="Services" value={expert.services.join(", ")} />
            <Detail label="Business name" value={expert.businessName} />
            <Detail label="Year founded" value={expert.yearFounded} />
            <Detail
              label="Number of employees"
              value={expert.numberOfEmployee}
            />
            <Detail label="Business address" value={expert.businessAddress} />
            <Detail label="State" value={expert.businessState} />
            <Detail label="Country" value={expert.businessCountry} />
            <Detail
              label="Starting price"
              value={`${expert.currency} ${Number(expert.startingPrice).toLocaleString()} ${expert.rateUnit}`}
            />
            <Detail label="Notice period" value={expert.noticePeriod} />
          </div>
        </div>
      </div>
      {editOpen && (
        <EditExpertServiceModal
          open={editOpen}
          onClose={setEditOpen}
          expert={expert}
          loading={settings.isSaving}
          onSave={(updated) => save(updated, setEditOpen)}
        />
      )}
      {credentialsOpen && (
        <ManageExpertCredentialsModal
          open={credentialsOpen}
          onClose={setCredentialsOpen}
          expert={expert}
          loading={settings.isSaving}
          onSave={(updated) => save(updated, setCredentialsOpen)}
        />
      )}
      {verificationOpen && (
        <SettingsConfirmationModal
          open={verificationOpen}
          onClose={setVerificationOpen}
          title="Request Verification"
          message="Do you want to request a verification checkmark on your profile?"
          onConfirm={() => {
            setVerificationOpen(false);
            toast.info(
              "Verification requests will be connected when the endpoint is available.",
            );
          }}
        />
      )}
    </section>
  );
};
export default ServicesTab;
