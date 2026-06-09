"use client";

import { useStore } from "@/store/authStore";

const UserInitial = () => {
  const currentUser = useStore((state) => state.currentUser);

  const initials = `${currentUser?.firstName?.charAt(0) ?? ""}${
    currentUser?.lastName?.charAt(0) ?? ""
  }`.toUpperCase();

  return (
    <div className="md:h-12 h-10 md:w-12 w-10 rounded-full bg-[#6B7280] text-white justify-center items-center flex md:text-lg">
      {initials || "E"}
    </div>
  );
};

export default UserInitial;
