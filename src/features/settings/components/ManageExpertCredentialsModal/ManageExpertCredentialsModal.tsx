"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";
import ExpertiseFormAction from "@/features/experts/components/ExpertiseFormAction/ExpertiseFormAction";
import { UserExpertService } from "../../types/expertService";

import CredentialFields, { type CredentialTab } from "./CredentialFields";
import { credentialFormDraft } from "../../helpers/credentialForm";

interface ManageExpertCredentialsModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  expert: UserExpertService;
  onSave: (expert: UserExpertService) => void;
  loading: boolean;
}

const credentialTabs: Array<{ value: CredentialTab; label: string }> = [
  { value: "certifications", label: "Certificates" },
  { value: "memberships", label: "Memberships" },
  { value: "insurances", label: "Insurance" },
];

const labels: Record<CredentialTab, string> = {
  certifications: "Certificates",
  memberships: "Memberships",
  insurances: "Insurance",
};

const icons: Record<CredentialTab, string> = {
  certifications: "/assets/icons/signature.svg",
  memberships: "/assets/icons/users.svg",
  insurances: "/assets/icons/shield-check.svg",
};

const createCredential = (tab: CredentialTab) => {
  if (tab === "certifications") {
    return {
      id: "",
      issuingOrganisation: "",
      verificationNumber: "",
      issuingDate: "",
      expiringDate: "",
      isCertificateExpire: false,
    };
  }

  if (tab === "memberships") {
    return {
      id: "",
      organisation: "",
      positionHeld: "",
      startDate: "",
      endDate: "",
      isMembershipExpire: false,
    };
  }

  return {
    id: "",
    issuingOrganisation: "",
    coverage: "",
    description: "",
  };
};

const ManageExpertCredentialsModal = ({
  open,
  onClose,
  expert,
  onSave,
  loading,
}: ManageExpertCredentialsModalProps) => {
  const [tab, setTab] = useState<CredentialTab>("certifications");
  const [draft, setDraft] = useState(() => credentialFormDraft(expert));
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const items = draft[tab];
  const singularLabel = { certifications: "Certificate", memberships: "Membership", insurances: "Insurance" }[tab];

  const addItem = () => {
    setDraft((current) => ({
      ...current,
      [tab]: [...current[tab], createCredential(tab)],
    }));
  };

  const updateItem = (index: number, field: string, value: string | boolean) => {
    setDraft((current) => ({
      ...current,
      [tab]: current[tab].map((item, itemIndex) =>
        itemIndex === index ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const removeItem = (index: number) => {
    setDraft((current) => ({
      ...current,
      [tab]: current[tab].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  return (
    <ModalWrapper
      open={open}
      onClose={(nextOpen) => { if (!loading) onClose(nextOpen); }}
      showCloseButton={!loading}
      title="Manage Expert Credentials"
      className="max-w-3xl!"
      headerClassName="border-b border-[#ECECEC] pb-4"
    >
      <div className="flex py-4">
        <SegmentedTabs
          options={credentialTabs}
          value={tab}
          onChange={setTab}
          ariaLabel="Select credential type"
        />
      </div>

      <div className="flex items-center justify-between gap-4 border-b border-[#ECECEC] pb-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center bg-[#F4F7F5]">
            <Image src={icons[tab]} alt="" width={20} height={20} />
          </span>
          <div>
            <h3 className="font-exo font-semibold">
              {labels[tab]}{" "}
              <span className="font-normal text-[#737774]">(optional)</span>
            </h3>
            <p className="text-sm text-[#737774]">
              Manage the credentials attached to this expert service
            </p>
          </div>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={addItem}
          className="shrink-0 text-sm text-[#6667FF]"
        >
          ＋ Add {singularLabel}
        </button>
      </div>

      <fieldset disabled={loading}><AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="space-y-6 py-5"
        >
          {items.map((item, index) => {
            const key = `${tab}-${index}`;
            const isOpen = !collapsed[key];

            return (
              <div
                key={key}
                className="space-y-5 border-b border-[#ECECEC] pb-6"
              >
                <ExpertiseFormAction
                  title={`${singularLabel} ${index + 1}`}
                  isCollapse={isOpen}
                  toggleView={() =>
                    setCollapsed((current) => ({
                      ...current,
                      [key]: isOpen,
                    }))
                  }
                  removeForm={() => removeItem(index)}
                />
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
                    >
                      <CredentialFields tab={tab} item={item} index={index} onChange={(field, value) => updateItem(index, field, value)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence></fieldset>

      <div className="flex gap-3">
        <Button
          variant="default"
          className="h-11 flex-1"
          disabled={loading}
          onClick={() => onClose(false)}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="h-11 flex-1"
          loading={loading}
          onClick={() => onSave(draft)}
        >
          Save Changes
        </Button>
      </div>
    </ModalWrapper>
  );
};

export default ManageExpertCredentialsModal;
