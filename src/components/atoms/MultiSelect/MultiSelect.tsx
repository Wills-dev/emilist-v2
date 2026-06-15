"use client";

import { useMemo, useState } from "react";

import { MultiSelectProps } from "@/lib/types";

const MultiSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select option(s)",
  showSearch = false,
  searchPlaceholder = "Search...",
  allowOthers = false,
  customPlaceholder = "Enter custom value",
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [showCustomInput, setShowCustomInput] = useState(false);

  const [customValue, setCustomValue] = useState("");

  const normalizedOptions = useMemo(
    () =>
      options.map((item) =>
        typeof item === "string" ? { label: item, value: item } : item,
      ),
    [options],
  );

  const filteredOptions = useMemo(
    () =>
      normalizedOptions.filter((option) =>
        option.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [normalizedOptions, search],
  );

  const handleAddCustomValue = () => {
    const trimmed = customValue.trim();

    if (!trimmed) return;

    onChange(trimmed);

    setCustomValue("");
    setShowCustomInput(false);
    setOpen(false);
  };

  return (
    <div className="relative space-y-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full h-11 px-3 flex items-center justify-between gap-4 text-left backdrop-blur-2xl bg-[#ECECEC] text-[#737774] rounded-[10px]"
      >
        <span className="block">{placeholder}</span>
        <span>
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
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute z-20 mt-0 w-full rounded-lg border bg-white shadow-lg">
          {showSearch && (
            <div className="p-3 border-b">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="w-full h-10 px-3 border rounded-md outline-none focus:border-[#25C269]"
              />
            </div>
          )}

          {showCustomInput ? (
            <div className="p-3 space-y-2">
              <input
                autoFocus
                type="text"
                value={customValue}
                placeholder={customPlaceholder}
                onChange={(e) => setCustomValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddCustomValue();
                  }
                }}
                className="w-full h-10 px-3 border rounded-md outline-none focus:border-[#25C269]"
              />

              <button
                type="button"
                onClick={handleAddCustomValue}
                className="w-full h-10 rounded-md bg-[#25C269] text-white"
              >
                Add
              </button>
            </div>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length ? (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      const isOthers = option.value.toLowerCase() === "others";

                      if (allowOthers && isOthers) {
                        setShowCustomInput(true);
                        return;
                      }

                      onChange(option.value);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-3 hover:bg-gray-100 ${
                      value?.includes(option.value) ? "bg-green-50" : ""
                    }`}
                  >
                    <span>{option.label}</span>

                    {value?.includes(option.value) && <span>✓</span>}
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No results found
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {value?.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {value.map((item) => (
            <div
              key={item}
              className="flex gap-2 items-center bg-[#F4F7F5] px-2 py-1 rounded-full text-sm"
            >
              <span>{item}</span>

              <button
                type="button"
                onClick={() => onChange(item)}
                className="hover:text-red-500 cursor-pointer transition-all duration-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
