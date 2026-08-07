"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { useExpertServicesSettings } from "../../hooks/useExpertServicesSettings";
import { useProfileImageUpload } from "../../hooks/useProfileImageUpload";
import EditExpertServiceModal from "../EditExpertServiceModal/EditExpertServiceModal";
import ManageExpertCredentialsModal from "../ManageExpertCredentialsModal/ManageExpertCredentialsModal";
import ServiceBusinessDetails from "../ServiceBusinessDetails/ServiceBusinessDetails";
import ServiceDescriptionCard from "../ServiceDescriptionCard/ServiceDescriptionCard";
import ServicePhotosCard from "../ServicePhotosCard/ServicePhotosCard";
import ServiceProfileCard from "../ServiceProfileCard/ServiceProfileCard";
import SettingsConfirmationModal from "../SettingsConfirmationModal/SettingsConfirmationModal";

const ServicesTab = () => {
  const settings = useExpertServicesSettings();
  const profileImage = useProfileImageUpload();
  const [editOpen, setEditOpen] = useState(false);
  const [credentialsOpen, setCredentialsOpen] = useState(false);
  const [verificationOpen, setVerificationOpen] = useState(false);
  const expert = settings.activeExpert;

  const saveAndClose = (
    updated: typeof expert,
    close: (open: boolean) => void,
  ) => settings.saveExpert(updated, { onSuccess: () => close(false) });

  return (
    <section className="space-y-4">
      <motion.div
        key={expert.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid gap-3 bg-white p-2 xl:grid-cols-[1.05fr_1fr]"
      >
        <ServiceProfileCard
          expert={expert}
          experts={settings.experts}
          activeId={settings.activeId}
          onSelect={settings.setActiveId}
          onRequestVerification={() => setVerificationOpen(true)}
          profileImage={profileImage}
        />

        <div className="space-y-3 rounded-lg bg-[#F4F7F5] p-3">
          <ServiceDescriptionCard
            key={`description-${expert.id}`}
            expert={expert}
            onSave={settings.saveExpert}
          />
          <ServicePhotosCard
            key={`photos-${expert.id}`}
            expert={expert}
            onUpdate={settings.updateExpertLocally}
            onSave={settings.saveExpert}
          />
        </div>
      </motion.div>

      <ServiceBusinessDetails
        expert={expert}
        onEdit={() => setEditOpen(true)}
        onManageCredentials={() => setCredentialsOpen(true)}
      />

      {editOpen && (
        <EditExpertServiceModal
          open={editOpen}
          onClose={setEditOpen}
          expert={expert}
          loading={settings.isSaving}
          onSave={(updated) => saveAndClose(updated, setEditOpen)}
        />
      )}

      {credentialsOpen && (
        <ManageExpertCredentialsModal
          open={credentialsOpen}
          onClose={setCredentialsOpen}
          expert={expert}
          loading={settings.isSaving}
          onSave={(updated) => saveAndClose(updated, setCredentialsOpen)}
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
