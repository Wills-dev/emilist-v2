"use client";

import { useState } from "react";

import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import PolicyModal from "../PolicyModal/PolicyModal";
import TermsOfUseModal from "../TermsOfUseModal/TermsOfUseModal";
import Button from "@/components/atoms/Button/Button";

interface TermsPromptProps {
  open: boolean;
  onAccept: () => void;
  onDecline: () => void;
  isPending?: boolean;
}

const TermsPromptModal = ({
  open,
  onAccept,
  onDecline,
  isPending,
}: TermsPromptProps) => {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);

  return (
    <>
      <ModalWrapper
        open={open}
        onClose={onDecline}
        title="Login with Google account"
        className=" max-w-140! w-full sm:p-8 p-6"
        description=""
      >
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Before you continue
        </h3>
        <p className="text-sm leading-6 mb-6">
          By signing up with Google, you need to agree to our{" "}
          <button
            type="button"
            className="text-[#25C269] hover:text-green-700 cursor-pointer transition-colors duration-300"
            onClick={() => setOpenTerms(true)}
          >
            Terms of Use
          </button>{" "}
          and{" "}
          <button
            type="button"
            className="text-[#25C269] hover:text-green-700 cursor-pointer transition-colors duration-300"
            onClick={() => setOpenPolicy(true)}
          >
            Privacy Policy.
          </button>
        </p>
        <div className="flex flex-col gap-2">
          <Button
            onClick={onAccept}
            disabled={isPending}
            variant="primary"
            className="w-full h-11"
          >
            {isPending ? "Redirecting..." : "I agree — Continue with Google"}
          </Button>
          <Button onClick={onDecline} className="w-full h-11" variant="default">
            Cancel
          </Button>
        </div>
      </ModalWrapper>
      <PolicyModal isOpen={openPolicy} onClose={() => setOpenPolicy(false)} />
      <TermsOfUseModal isOpen={openTerms} onClose={() => setOpenTerms(false)} />
    </>
  );
};

export default TermsPromptModal;
