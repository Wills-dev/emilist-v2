import { useExpertStore } from "@/store/expert/expertStore";
import { useShallow } from "zustand/react/shallow";

export const useInsuranceState = () => {
  const { insuranceView, insurances } = useExpertStore(
    useShallow((state) => ({
      insurances: state.insurances,
      insuranceView: state.insuranceView,
    })),
  );

  const addInsurance = useExpertStore((state) => state.addInsurance);
  const updateInsurance = useExpertStore((state) => state.updateInsurance);
  const removeInsurance = useExpertStore((state) => state.removeInsurance);
  const toggleInsuranceView = useExpertStore(
    (state) => state.toggleInsuranceView,
  );

  return {
    insuranceView,
    insurances,
    addInsurance,
    updateInsurance,
    removeInsurance,
    toggleInsuranceView,
  };
};
