import { useExpertStore } from "@/store/expert/expertStore";
import { useShallow } from "zustand/react/shallow";
import { isEmptyMembership } from "../helpers/validateMemberships";

export const useMembershipState = () => {
  const { membershipView, memberships } = useExpertStore(
    useShallow((state) => ({
      memberships: state.memberships,
      membershipView: state.membershipView,
    })),
  );

  const resetMembership = useExpertStore((state) => state.resetMembership);
  const addMembership = useExpertStore((state) => state.addMembership);
  const updateMembership = useExpertStore((state) => state.updateMembership);
  const removeMembership = useExpertStore((state) => state.removeMembership);
  const toggleMembershipView = useExpertStore(
    (state) => state.toggleMembershipView,
  );

  const validMemberships = memberships.filter(
    (memb) => !isEmptyMembership(memb),
  );

  return {
    membershipView,
    memberships,
    addMembership,
    updateMembership,
    removeMembership,
    toggleMembershipView,
    resetMembership,
    validMemberships,
  };
};
