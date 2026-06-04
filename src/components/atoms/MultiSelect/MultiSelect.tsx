"use client";

import { useState } from "react";

import { MultiSelectProps } from "@/lib/types";

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select languages",
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="w-full h-11 px-3 flex items-center backdrop-blur-2xl bg-[#ECECEC] text-[#737774] active:border-[#25C269] active:border duration-300 transition-all rounded-[10px]"
      >
        {value.length ? value.join(", ") : placeholder}
      </button>

      {open && (
        <div className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
          {options.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100 ${
                value.includes(item.value) ? "bg-green-50" : ""
              }`}
            >
              {item.label}

              {value.includes(item.value) && <span>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
