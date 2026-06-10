"use client";

import VerifyWrapper from "../VerifyWrapper/VerifyWrapper";
import CertificateForm from "@/components/molecules/forms/CertificateForm/CertificateForm";

import { useCertificationState } from "../../hooks/useCertificationState";

const CertificateWrap = () => {
  const { certifications, addCertification } = useCertificationState();

  return (
    <div className="space-y-12">
      <VerifyWrapper
        iconUrl="/assets/icons/signature.svg"
        title="Certificates"
        desc="Add a certificate that shows your certified skill"
        onClick={addCertification}
      />
      {certifications?.map((certification, index) => (
        <CertificateForm
          key={index}
          certification={certification}
          index={index}
        />
      ))}
    </div>
  );
};

export default CertificateWrap;
