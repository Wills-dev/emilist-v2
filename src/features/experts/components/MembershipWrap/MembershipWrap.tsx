"use client";

import MembershipForm from "@/components/molecules/forms/MembershipForm/MembershipForm";
import VerifyWrapper from "../VerifyWrapper/VerifyWrapper";

import { useMembershipState } from "../../hooks/useMembershipState";

const MembershipWrap = () => {
  const { memberships, addMembership } = useMembershipState();

  return (
    <div className="space-y-12">
      <VerifyWrapper
        iconUrl="/assets/icons/users.svg"
        title="Memberships"
        desc="Add relevant trade unions and associations you belong to"
        onClick={addMembership}
      />
      {memberships?.map((membership, index) => (
        <MembershipForm key={index} membership={membership} index={index} />
      ))}
    </div>
  );
};

export default MembershipWrap;
