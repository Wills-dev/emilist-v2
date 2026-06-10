"use client";

import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import CertificateWrap from "@/features/experts/components/CertificateWrap/CertificateWrap";
import InsuranceWrap from "@/features/experts/components/InsuranceWrap/InsuranceWrap";
import MembershipWrap from "@/features/experts/components/MembershipWrap/MembershipWrap";

import { useExpertTabs } from "@/features/experts/hooks/useExpertTabs";
import { useCreateExpert } from "@/features/experts/hooks/useCreateExpert";

const ExpertiseForm = () => {
  const { switchTab } = useExpertTabs();
  const { handleSubmit, isPending } = useCreateExpert();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-12"
    >
      <CertificateWrap />
      <MembershipWrap />
      <InsuranceWrap />
      <div className="flex max-sm:flex-col gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => switchTab("business-profile")}
          className="w-full h-11"
        >
          Go Back
        </Button>{" "}
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          className="w-full h-11"
          disabled={isPending}
          loading={isPending}
        >
          Proceed
        </Button>
      </div>
    </motion.div>
  );
};

export default ExpertiseForm;
