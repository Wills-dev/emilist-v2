"use client";

import { motion } from "framer-motion";

import Button from "@/components/atoms/Button/Button";
import BusinessSetup from "@/features/experts/components/BusinessSetup/BusinessSetup";

import { useExpertTabs } from "@/features/experts/hooks/useExpertTabs";
import { useBusinessProfileState } from "@/features/experts/hooks/useBusinessProfileState";
import Link from "next/link";
import { routes } from "@/lib/helpers/routes";
import { ArrowLeft } from "lucide-react";

const ExpertBusinessForm = ({ dashboard = false }: { dashboard?: boolean }) => {
  const { switchTab } = useExpertTabs({ skipProfile: dashboard });
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
        {!dashboard && (
          <Button
            variant="secondary"
            type="button"
            onClick={() => switchTab("profile")}
            className="w-full h-11"
          >
            Go Back
          </Button>
        )}
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
      {dashboard && (
        <Link
          href={routes.dashboard}
          className="mx-auto flex w-fit items-center gap-2 font-exo text-sm font-semibold text-[#18A154] transition-colors hover:text-green-700"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to Dashboard
        </Link>
      )}
    </motion.div>
  );
};

export default ExpertBusinessForm;
