"use client";

import { motion, AnimatePresence } from "framer-motion";

import InputWrapper from "../../InputWrapper/InputWrapper";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Label from "@/components/atoms/Label/Label";
import SingleImageInput from "../../SingleImageInput/SingleImageInput";
import AddMoreBtn from "@/components/atoms/AddMoreBtn/AddMoreBtn";
import ExpertiseFormAction from "@/features/experts/components/ExpertiseFormAction/ExpertiseFormAction";

import { Certification } from "@/features/experts/types";
import { useCertificationState } from "@/features/experts/hooks/useCertificationState";

const CertificateForm = ({
  index,
  certification,
}: {
  index: number;
  certification: Certification;
}) => {
  const {
    certificationPreview,
    certificationView,
    addCertification,
    updateCertification,
    removeCertification,
    removeCertificationImage,
    toggleCertificationView,
    handleCertificateFile,
  } = useCertificationState();

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCertificateFile(e, index);
  };

  const handleExpires = (e: boolean) => {
    if (e) {
      updateCertification(index, "expiringDate", "");
    }
    updateCertification(index, "doesntExpire", e);
  };

  return (
    <div className="space-y-8 border-b border-[#E5E5E5] pb-6">
      <ExpertiseFormAction
        title={`Certificate ${index + 1}`}
        isCollapse={certificationView[index]}
        toggleView={() => toggleCertificationView(index)}
        removeForm={() => removeCertification(index)}
      />
      <AnimatePresence mode="wait">
        {certificationView[index] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  title="Issuing organisation"
                  name="issuingOrganisation"
                  value={certification.issuingOrganisation}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      "issuingOrganisation",
                      e.target.value,
                    )
                  }
                  placeholder="Golden Plumb PLC"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  title="Verification Number"
                  name="verificationNumber"
                  value={certification.verificationNumber}
                  onChange={(e) =>
                    updateCertification(
                      index,
                      "verificationNumber",
                      e.target.value,
                    )
                  }
                  placeholder="Enter certificate number"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  type="date"
                  title="Issuing date"
                  name="issuingDate"
                  value={certification.issuingDate}
                  onChange={(e) =>
                    updateCertification(index, "issuingDate", e.target.value)
                  }
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  type="date"
                  title="Expiry date"
                  name="expiringDate"
                  value={certification.expiringDate}
                  onChange={(e) =>
                    updateCertification(index, "expiringDate", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Checkbox
                  value={certification.doesntExpire}
                  onChange={handleExpires}
                />
                <Label htmlFor="" title="This certificate doesn’t expire" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="" title="Upload certificate" />
              <div className="w-full">
                <SingleImageInput
                  imagePreview={certificationPreview[index]}
                  handleImageChange={onImageChange}
                  deleteImage={() => removeCertificationImage(index)}
                />
              </div>
            </div>
            <AddMoreBtn onClick={addCertification} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificateForm;
