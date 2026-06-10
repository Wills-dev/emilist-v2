"use client";

import { motion, AnimatePresence } from "framer-motion";

import AddMoreBtn from "@/components/atoms/AddMoreBtn/AddMoreBtn";
import InputWrapper from "../../InputWrapper/InputWrapper";
import Label from "@/components/atoms/Label/Label";
import ExpertiseFormAction from "@/features/experts/components/ExpertiseFormAction/ExpertiseFormAction";
import Textarea from "@/components/atoms/TextArea/Textarea";
import SelectWrapper from "../../SelectWrapper/SelectWrapper";

import { Insurance } from "@/features/experts/types";
import { insuranceCoverageTypes } from "@/features/experts/constants";
import { useInsuranceState } from "@/features/experts/hooks/useInsuranceState";

const InsuranceForm = ({
  index,
  insurance,
}: {
  index: number;
  insurance: Insurance;
}) => {
  const {
    insuranceView,
    addInsurance,
    updateInsurance,
    removeInsurance,
    toggleInsuranceView,
  } = useInsuranceState();

  return (
    <div className="space-y-8 border-b border-[#E5E5E5] pb-6">
      <ExpertiseFormAction
        title={`Insurance ${index + 1}`}
        isCollapse={insuranceView[index]}
        toggleView={() => toggleInsuranceView(index)}
        removeForm={() => removeInsurance(index)}
      />
      <AnimatePresence mode="wait">
        {insuranceView[index] && (
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
                  title="Issuing organization"
                  name="issuingOrganisation"
                  value={insurance.issuingOrganisation}
                  onChange={(e) =>
                    updateInsurance(
                      index,
                      "issuingOrganisation",
                      e.target.value,
                    )
                  }
                  placeholder="Golden Plumb PLC"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <SelectWrapper
                  title="Type of coverage"
                  name="coverage"
                  value={insurance.coverage}
                  onChange={(e) =>
                    updateInsurance(index, "coverage", e.target.value)
                  }
                  options={insuranceCoverageTypes}
                />
              </div>
              <div className="col-span-2 flex flex-col gap-2">
                <Label
                  htmlFor="description"
                  title="Short description of what is covered"
                />
                <Textarea
                  rows={5}
                  value={insurance.description}
                  onChange={(e) =>
                    updateInsurance(index, "description", e.target.value)
                  }
                />
              </div>
            </div>

            <AddMoreBtn onClick={addInsurance} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InsuranceForm;
