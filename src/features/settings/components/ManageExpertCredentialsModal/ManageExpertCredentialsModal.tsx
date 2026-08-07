"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import Textarea from "@/components/atoms/TextArea/Textarea";
import SegmentedTabs from "@/components/molecules/SegmentedTabs/SegmentedTabs";
import ExpertiseFormAction from "@/features/experts/components/ExpertiseFormAction/ExpertiseFormAction";
import { UserExpertService } from "../../types/expertService";

type CredentialTab = "certifications" | "memberships" | "insurances";

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

const formatFieldLabel = (field: string) =>
  field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (letter) => letter.toUpperCase());

const ManageExpertCredentialsModal = ({
  open,
  onClose,
  expert,
  onSave,
  loading,
}: ManageExpertCredentialsModalProps) => {
  const [tab, setTab] = useState<CredentialTab>("certifications");
  const [draft, setDraft] = useState(expert);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const items = draft[tab];
  const singularLabel = labels[tab].replace(/s$/, "");

  const addItem = () => {
    setDraft((current) => ({
      ...current,
      [tab]: [...current[tab], createCredential(tab)],
    }));
  };

  const updateItem = (index: number, field: string, value: string) => {
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
      onClose={onClose}
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
          onClick={addItem}
          className="shrink-0 text-sm text-[#6667FF]"
        >
          ＋ Add {singularLabel}
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          transition={{ duration: 0.25 }}
          className="max-h-[55vh] space-y-6 overflow-y-auto py-5"
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
                      className="grid grid-cols-2 gap-4 overflow-hidden max-sm:grid-cols-1"
                    >
                      {Object.entries(item)
                        .filter(
                          ([field]) =>
                            field !== "id" && !field.startsWith("is"),
                        )
                        .map(([field, value]) =>
                          field === "description" ? (
                            <div
                              key={field}
                              className="col-span-2 space-y-2 max-sm:col-span-1"
                            >
                              <Label
                                htmlFor={`${tab}-${index}-${field}`}
                                title="Description"
                              />
                              <Textarea
                                id={`${tab}-${index}-${field}`}
                                value={String(value)}
                                onChange={(event) =>
                                  updateItem(index, field, event.target.value)
                                }
                              />
                            </div>
                          ) : (
                            <div key={field} className="space-y-2">
                              <Label
                                htmlFor={`${tab}-${index}-${field}`}
                                title={formatFieldLabel(field)}
                              />
                              <Input
                                id={`${tab}-${index}-${field}`}
                                type={
                                  field.toLowerCase().includes("date")
                                    ? "date"
                                    : "text"
                                }
                                value={String(value)}
                                onChange={(event) =>
                                  updateItem(index, field, event.target.value)
                                }
                              />
                            </div>
                          ),
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        <Button
          variant="default"
          className="h-11 flex-1"
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
