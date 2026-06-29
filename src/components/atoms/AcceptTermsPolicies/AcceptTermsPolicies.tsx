"use client";

import { useState } from "react";

import Checkbox from "../Checkbox/Checkbox";
import PolicyModal from "@/components/molecules/modals/PolicyModal/PolicyModal";
import TermsOfUseModal from "@/components/molecules/modals/TermsOfUseModal/TermsOfUseModal";

const AcceptTermsPolicies = ({
  termsAccepted,
  setTermsAccepted,
}: {
  termsAccepted: boolean;
  setTermsAccepted: (value: boolean) => void;
}) => {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPolicy, setOpenPolicy] = useState(false);

  return (
    <>
      <div className="flex gap-1 mt-1">
        <Checkbox value={termsAccepted} onChange={setTermsAccepted} />
        <p className="text-sm leading-6">
          By signing up with email or Google, you need to agree to our{" "}
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
      </div>
      <PolicyModal isOpen={openPolicy} onClose={() => setOpenPolicy(false)} />
      <TermsOfUseModal isOpen={openTerms} onClose={() => setOpenTerms(false)} />
    </>
  );
};

export default AcceptTermsPolicies;
