import { useRouter } from "next/navigation";
import { useExpertStore } from "@/store/expert/expertStore";
import { getBusinessProfileError } from "@/features/experts/helpers/validateBusinessProfile";
import { getProfileFormError } from "@/features/auth/helpers/validateProfileForm";
import { reportFormError } from "@/lib/helpers/formValidation";

export const useExpertTabs = ({
  skipProfile = false,
}: { skipProfile?: boolean } = {}) => {
  const router = useRouter();

  const tab = useExpertStore((s) => s.tab);
  const setTab = useExpertStore((s) => s.setTab);

  const profile = useExpertStore((s) => s.profile);
  const business = useExpertStore((s) => s.business);
  const businessImages = useExpertStore((s) => s.businessImages);

  const switchTab = (next: "business-profile" | "profile" | "experiences") => {
    if (next !== "profile" && !skipProfile) {
      const error = getProfileFormError(profile);
      if (error) { setTab("profile"); reportFormError(error.field, error.message); return; }
    }
    if (next === "experiences") {
      const error = getBusinessProfileError(business, businessImages);
      if (error) { setTab("business-profile"); reportFormError(error.field, error.message); return; }
    }

    setTab(next);
    router.replace(`?tab=${next}`);
  };

  return { tab, switchTab };
};
