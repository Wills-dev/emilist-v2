import { useExpertStore } from "@/store/expert/expertStore";
import { useShallow } from "zustand/react/shallow";

export const useMembershipState = () => {
  const { membershipView, memberships } = useExpertStore(
    useShallow((state) => ({
      memberships: state.memberships,
      membershipView: state.membershipView,
    })),
  );

  const addMembership = useExpertStore((state) => state.addMembership);
  const updateMembership = useExpertStore((state) => state.updateMembership);
  const removeMembership = useExpertStore((state) => state.removeMembership);
  const toggleMembershipView = useExpertStore(
    (state) => state.toggleMembershipView,
  );

  return {
    membershipView,
    memberships,
    addMembership,
    updateMembership,
    removeMembership,
    toggleMembershipView,
  };
};
