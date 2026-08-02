import { useRouter } from "next/navigation";
import { useExpertStore } from "@/store/expert/expertStore";
import { validateBusinessProfile } from "@/features/experts/helpers/validateBusinessProfile";
import { validateProfileForm } from "@/features/auth/helpers/validateProfileForm";

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
    if (
      next === "business-profile" &&
      !skipProfile &&
      !validateProfileForm(profile)
    )
      return;

    if (
      next === "experiences" &&
      ((!skipProfile && !validateProfileForm(profile)) ||
        !validateBusinessProfile(business, businessImages))
    )
      return;

    setTab(next);
    router.replace(`?tab=${next}`);
  };

  return { tab, switchTab };
};
