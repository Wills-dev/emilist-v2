"use client";

import { useMemo, useState } from "react";
import { Check, ChevronDown, Search } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { selectOption } from "@/lib/types";

const SearchableSelect = ({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  searchPlaceholder = "Search options...",
  size = "compact",
}: {
  options: selectOption[] | string[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  size?: "compact" | "default";
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const normalizedOptions = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string"
          ? { label: option, value: option }
          : option,
      ),
    [options],
  );

  const selectedOption = normalizedOptions.find(
    (option) => option.value === value,
  );
  const filteredOptions = normalizedOptions.filter((option) =>
    option.label.toLowerCase().includes(search.trim().toLowerCase()),
  );

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) setSearch("");
  };

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue);
    handleOpenChange(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`flex w-full items-center justify-between gap-2 rounded-[10px] text-left text-[#737774] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#25C269] ${
            size === "default"
              ? "h-11 bg-[#ECECEC] px-3 text-base"
              : "h-7.5 bg-[#F6F7F9] px-2 text-xs"
          }`}
        >
          <span className="truncate">
            {selectedOption?.label ?? placeholder}
          </span>
          <ChevronDown className="size-3.5 shrink-0" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={8}
        collisionPadding={16}
        className="w-72 max-w-[calc(100vw-2rem)] gap-0 overflow-hidden p-0"
      >
        <div className="flex items-center gap-2 border-b border-[#ECECEC] px-3 py-2">
          <Search className="size-4 text-[#737774]" aria-hidden="true" />
          <input
            autoFocus
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm outline-none placeholder:text-[#8A8D8B]"
          />
        </div>
        <div className="max-h-60 overflow-y-auto p-1">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = option.value === value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#F9F9F9] ${isSelected ? "bg-[#F0FDF5] text-[#18A154]" : "text-[#474C48]"}`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="size-4 shrink-0" />}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-6 text-center text-sm text-[#737774]">
              No locations found.
            </p>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchableSelect;
