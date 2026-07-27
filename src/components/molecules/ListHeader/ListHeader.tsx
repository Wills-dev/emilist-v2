import { ChangeEvent } from "react";

import Select from "@/components/atoms/Select/Select";
import { selectOption } from "@/lib/types";

const ListHeader = ({
  title,
  options,
  value,
  onSortChange,
  ariaLabel = "Sort items",
}: {
  title: string;
  options: selectOption[] | string[];
  value?: string;
  onSortChange?: (value: string) => void;
  ariaLabel?: string;
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange?.(event.target.value);
  };

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#F1F2F9] pb-4">
      <p className="font-exo text-sm font-semibold">{title}</p>
      <div className="w-full max-w-37.5">
        <Select
          options={options}
          variant="secondary"
          fontSize="14px"
          placeholder="Sort by"
          aria-label={ariaLabel}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ListHeader;
