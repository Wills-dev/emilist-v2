import { toast } from "sonner";
import { Membership } from "../types";

export const validateMemberships = (memberships: Membership[]) => {
  for (let i = 0; i < memberships.length; i++) {
    const mem = memberships[i];

    const hasAnyValue =
      mem.organisation ||
      mem.positionHeld ||
      mem.startDate ||
      mem.endDate ||
      mem.isMembershipExpire;

    if (hasAnyValue) {
      if (!mem.organisation)
        return toast.error(`Membership ${i + 1}: Organization is required`);

      if (!mem.positionHeld)
        return toast.error(`Membership ${i + 1}: Position held is required`);

      if (!mem.startDate)
        return toast.error(`Membership ${i + 1}: Start date is required`);

      if (!mem.endDate && !mem.isMembershipExpire) {
        return toast.error(
          `Membership ${i + 1}: Provide expiry date or mark as doesn't end`,
        );
      }
    }
  }

  return true;
};

export const isEmptyMembership = (cert: Membership) => {
  return (
    !cert.organisation &&
    !cert.positionHeld &&
    !cert.startDate &&
    !cert.endDate &&
    !cert.isMembershipExpire
  );
};
