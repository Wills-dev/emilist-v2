"use client";

import InsuranceForm from "@/components/molecules/forms/InsuranceForm/InsuranceForm";
import { useInsuranceState } from "../../hooks/useInsuranceState";

import VerifyWrapper from "../VerifyWrapper/VerifyWrapper";

const InsuranceWrap = () => {
  const { addInsurance, insurances } = useInsuranceState();
  return (
    <div className="space-y-12">
      <VerifyWrapper
        iconUrl="/assets/icons/shield-check.svg"
        title="Insurance"
        desc="Add relevant insurance policies covering your trade"
        onClick={addInsurance}
      />
      {insurances?.map((insurance, index) => (
        <InsuranceForm key={index} insurance={insurance} index={index} />
      ))}
    </div>
  );
};

export default InsuranceWrap;
