"use client";

import { useState } from "react";

const OtherMaterialInfo = () => {
  const [tab, setTab] = useState("description");
  const tabOptions = ["description", "specifications"];

  return (
    <div className="py-4 sm:px-4 px-2 space-y-4 rounded-[8px] bg-white">
      <div className="flex items-center gap-2.5">
        {tabOptions?.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`capitalize py-1 px-2.5 rounded-[24px] cursor-pointer ${tab === item ? "bg-[#F0FDF5] text-[#18A154]" : "bg-[#F9F9F9]"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="space-y-4 text-[#5E625F] text-sm">
        <p>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
          sint. Velit officia consequat duis enimtest sit aliqua dolor do amet
          sint. Velit off. Amet minim mollit non deserunt ullamco est sit aliqua
          dolor do amet sint. Velit officia consequat duis enimtest sit aliqua
          dolor do amet sint. Velit off.Amet minim mollit non deserunt ullamco
          est sit aliqua dolor do amet sint. Velit officia consequat duis
          enimtest sit aliqua dolor do amet sint.{" "}
        </p>
        <p>
          Remake old chairs, cabinets, beds & doors for a residential family
          building in Gbagada Phase 1 on the Lagos Mainland axis.
        </p>
      </div>
    </div>
  );
};

export default OtherMaterialInfo;
