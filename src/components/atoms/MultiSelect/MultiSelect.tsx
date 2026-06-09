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
    <div className="relative space-y-4">
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
      {value?.length > 0 && (
        <div className="flex gap-2 w-full flex-wrap">
          {value?.map((item) => (
            <div
              key={item}
              className="flex gap-2 items-center bg-[#F4F7F5] px-2 py-px rounded-full text-[#5E625F] text-sm h-6.5 cur"
            >
              <span className="capitalize">{item}</span>
              <button
                type="button"
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="hover:text-red-500 transition-all duration-300 cursor-pointer"
              >
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
