"use client";

import Container from "@/components/atoms/Container/Container";
import UserBiodata from "../UserBiodata/UserBiodata";
import UserBioCard from "../UserBioCard/UserBioCard";
import UserProfileSummary from "../UserProfileSummary/UserProfileSummary";
import UserSettingsTabs from "../UserSettingsTabs/UserSettingsTabs";
import UserSettingsSkeleton from "../UserSettingsSkeleton/UserSettingsSkeleton";

import { useUserProfileForm } from "../../hooks/useUserProfileForm";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import { useState } from "react";
import { userSettingsTabs } from "../../constants";
import { useStore } from "@/store/authStore";
import { AnimatePresence, motion } from "framer-motion";

const itemAnimation = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const UserSettingsWrapper = () => {
  const profile = useUserProfileForm();
  const imageUpload = useProfileImageUpload();
  const isAuthInitialized = useStore((state) => state.isAuthInitialized);
  const [activeTab, setActiveTab] =
    useState<(typeof userSettingsTabs)[number]["id"]>("user-details");
  const activeTabLabel =
    userSettingsTabs.find((tab) => tab.id === activeTab)?.label ?? "Settings";

  if (!isAuthInitialized) return <UserSettingsSkeleton />;

  return (
    <Container variant="small">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
        className="space-y-4 pb-20 pt-4"
      >
        <motion.section
          variants={itemAnimation}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="bg-white pb-6"
        >
          <h1 className="border-b border-[#F1F2F9] px-6 py-6 font-exo text-xl font-semibold text-[#202521] max-sm:px-3">
            User Settings
          </h1>
          <UserSettingsTabs activeTab={activeTab} onChange={setActiveTab} />
        </motion.section>

        <AnimatePresence mode="wait">
          {activeTab === "user-details" ? (
            <motion.div
              key="user-details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.div
                variants={itemAnimation}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-[1.05fr_1fr] gap-3 bg-white p-3 max-xl:grid-cols-1"
              >
              <UserProfileSummary
                user={profile.currentUser}
                displayName={profile.displayName}
                photoFile={imageUpload.photoFile}
                photoPreview={imageUpload.photoPreview}
                isSaving={imageUpload.isSavingPhoto}
                onPhotoChange={imageUpload.handlePhotoChange}
                onSavePhoto={imageUpload.savePhoto}
                onCancelPhoto={imageUpload.cancelPhoto}
              />
              <UserBioCard
                value={profile.values.bio}
                editing={profile.isBioEditing}
                loading={profile.isSavingProfile}
                onChange={(value) => profile.updateField("bio", value)}
                onEdit={() => {
                  profile.cancelDetails();
                  profile.setIsBioEditing(true);
                }}
                onSave={profile.saveProfile}
                onCancel={profile.cancelBio}
              />
              </motion.div>

              <motion.div
                variants={itemAnimation}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <UserBiodata
                  values={profile.values}
                  editing={profile.isDetailsEditing}
                  loading={profile.isSavingProfile}
                  onChange={profile.updateField}
                  onEdit={() => {
                    profile.cancelBio();
                    profile.setIsDetailsEditing(true);
                  }}
                  onSave={profile.saveProfile}
                  onCancel={profile.cancelDetails}
                />
              </motion.div>
            </motion.div>
          ) : (
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="rounded-lg bg-white px-6 py-20 text-center"
            >
              <h2 className="font-exo text-xl font-semibold text-[#303632]">
                {activeTabLabel}
              </h2>
              <p className="mt-2 text-sm text-[#737774]">
                This settings section is ready for its design and content.
              </p>
            </motion.section>
          )}
        </AnimatePresence>
      </motion.div>
    </Container>
  );
};

export default UserSettingsWrapper;
