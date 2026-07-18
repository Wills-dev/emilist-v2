"use client";

import UserInitial from "@/components/atoms/UserInitial/UserInitial";
import { useStore } from "@/store/authStore";

const UserIdentity = () => {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <div className="flex items-center gap-3">
      <UserInitial />
      <div className="space-y-0.5">
        <h6 className="capitalize font-exo text-sm font-medium truncate">
          {currentUser?.firstName} {currentUser?.lastName}
        </h6>
        <p className="text-xs text-[#5E625F] truncate"> {currentUser?.email}</p>
      </div>
    </div>
  );
};

export default UserIdentity;
