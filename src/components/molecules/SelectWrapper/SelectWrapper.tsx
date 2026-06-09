import { ChangeEvent } from "react";

import { selectOption } from "@/lib/types";

import Label from "@/components/atoms/Label/Label";
import Select from "@/components/atoms/Select/Select";

const SelectWrapper = ({
  title,
  name,
  value,
  onChange,
  placeholder = "",
  options,
}: {
  title: string;
  name: string;
  value: string;
  placeholder?: string;
  options: selectOption[] | string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={name} title={title} />
      <Select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SelectWrapper;
