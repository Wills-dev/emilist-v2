"use client";

import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import BusinessSetup from "@/features/experts/components/BusinessSetup/BusinessSetup";

import { useExpertTabs } from "@/features/experts/hooks/useExpertTabs";
import { useBusinessProfileState } from "@/features/experts/hooks/useBusinessProfileState";

const ExpertBusinessForm = () => {
  const { switchTab } = useExpertTabs();
  const { isBusinessFormFilled } = useBusinessProfileState();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-8"
    >
      <BusinessSetup />
      <div className="flex max-sm:flex-col gap-2">
        <Button
          variant="secondary"
          type="button"
          onClick={() => switchTab("profile")}
          className="w-full h-11"
        >
          Go Back
        </Button>{" "}
        <Button
          variant="primary"
          type="button"
          onClick={() => switchTab("experiences")}
          className="w-full h-11"
          disabled={!isBusinessFormFilled}
        >
          Proceed
        </Button>
      </div>
    </motion.div>
  );
};

export default ExpertBusinessForm;
