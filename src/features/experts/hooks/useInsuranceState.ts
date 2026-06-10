import { useExpertStore } from "@/store/expert/expertStore";
import { useShallow } from "zustand/react/shallow";
import { isEmptyInsurance } from "../helpers/validateInsurances";

export const useInsuranceState = () => {
  const { insuranceView, insurances } = useExpertStore(
    useShallow((state) => ({
      insurances: state.insurances,
      insuranceView: state.insuranceView,
    })),
  );

  const resetInsurance = useExpertStore((state) => state.resetInsurance);
  const addInsurance = useExpertStore((state) => state.addInsurance);
  const updateInsurance = useExpertStore((state) => state.updateInsurance);
  const removeInsurance = useExpertStore((state) => state.removeInsurance);
  const toggleInsuranceView = useExpertStore(
    (state) => state.toggleInsuranceView,
  );

  const validInsurances = insurances.filter((memb) => !isEmptyInsurance(memb));

  return {
    insuranceView,
    insurances,
    addInsurance,
    updateInsurance,
    removeInsurance,
    toggleInsuranceView,
    resetInsurance,
    validInsurances,
  };
};
