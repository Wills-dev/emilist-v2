"use client";

import { motion, AnimatePresence } from "framer-motion";

import AddMoreBtn from "@/components/atoms/AddMoreBtn/AddMoreBtn";
import InputWrapper from "../../InputWrapper/InputWrapper";
import Checkbox from "@/components/atoms/Checkbox/Checkbox";
import Label from "@/components/atoms/Label/Label";
import ExpertiseFormAction from "@/features/experts/components/ExpertiseFormAction/ExpertiseFormAction";
import { useMembershipState } from "@/features/experts/hooks/useMembershipState";

import { Membership } from "@/features/experts/types";

const MembershipForm = ({
  index,
  membership,
}: {
  index: number;
  membership: Membership;
}) => {
  const {
    membershipView,
    addMembership,
    updateMembership,
    removeMembership,
    toggleMembershipView,
  } = useMembershipState();

  const handleExpires = (e: boolean) => {
    if (e) {
      updateMembership(index, "endDate", "");
    }
    updateMembership(index, "doesntEnd", e);
  };

  return (
    <div className="space-y-8 border-b border-[#E5E5E5] pb-6">
      <ExpertiseFormAction
        title={`Membership ${index + 1}`}
        isCollapse={membershipView[index]}
        toggleView={() => toggleMembershipView(index)}
        removeForm={() => removeMembership(index)}
      />
      <AnimatePresence mode="wait">
        {membershipView[index] && (
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
                  title="Organisation name"
                  name="organisation"
                  value={membership.organisation}
                  onChange={(e) =>
                    updateMembership(index, "organisation", e.target.value)
                  }
                  placeholder="Golden Plumb PLC"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  title="Position held"
                  name="positionHeld"
                  value={membership.positionHeld}
                  onChange={(e) =>
                    updateMembership(index, "positionHeld", e.target.value)
                  }
                  placeholder="President"
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  type="date"
                  title="Start date"
                  name="startDate"
                  value={membership.startDate}
                  onChange={(e) =>
                    updateMembership(index, "startDate", e.target.value)
                  }
                />
              </div>
              <div className="sm:col-span-1 col-span-2">
                <InputWrapper
                  type="date"
                  title="End date"
                  name="endDate"
                  value={membership.endDate}
                  onChange={(e) =>
                    updateMembership(index, "endDate", e.target.value)
                  }
                />
              </div>
              <div className="flex items-center gap-2 col-span-2">
                <Checkbox
                  value={membership.doesntEnd}
                  onChange={handleExpires}
                />
                <Label htmlFor="" title="No end date" />
              </div>
            </div>

            <AddMoreBtn onClick={addMembership} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MembershipForm;
