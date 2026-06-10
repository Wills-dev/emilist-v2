import { StateCreator } from "zustand";
import { MembershipSlice } from "../types/expert";

export const createMembershipSlice: StateCreator<MembershipSlice> = (set) => ({
  memberships: [],
  membershipView: [],

  addMembership: () =>
    set((state) => ({
      memberships: [
        ...state.memberships,
        {
          organisation: "",
          positionHeld: "",
          startDate: "",
          endDate: "",
          isMembershipExpire: false,
        },
      ],
      membershipView: [...state.membershipView, true],
    })),

  updateMembership: (i, key, value) =>
    set((state) => {
      const arr = [...state.memberships];
      const updated = { ...arr[i], [key]: value };

      if (key === "endDate" && value) {
        updated.isMembershipExpire = false;
      }

      if (key === "isMembershipExpire" && value === true) {
        updated.endDate = "";
      }

      arr[i] = updated;
      return { memberships: arr };
    }),

  removeMembership: (i) =>
    set((state) => ({
      memberships: state.memberships.filter((_, idx) => idx !== i),
    })),

  toggleMembershipView: (i) =>
    set((state) => {
      const view = [...state.membershipView];
      view[i] = !view[i];
      return { membershipView: view };
    }),

  resetMembership: () =>
    set({
      memberships: [],
      membershipView: [],
    }),
});
