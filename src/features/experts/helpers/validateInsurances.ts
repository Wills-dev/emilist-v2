import { toast } from "sonner";
import { Insurance } from "../types";

export const validateInsurances = (insurances: Insurance[]) => {
  for (let i = 0; i < insurances.length; i++) {
    const ins = insurances[i];
    const hasAnyValue =
      ins.issuingOrganisation || ins.coverage || ins.description;

    if (hasAnyValue) {
      if (!ins.issuingOrganisation)
        return toast.error(
          `Insurance ${i + 1}: Issuing Organisation is required`,
        );

      if (!ins.coverage)
        return toast.error(`Insurance ${i + 1}: Type of coverage is required`);

      if (!ins.description)
        return toast.error(`Insurance ${i + 1}: Description is required`);
    }
  }

  return true;
};

export const isEmptyInsurance = (cert: Insurance) => {
  return !cert.issuingOrganisation && !cert.coverage && !cert.description;
};
