import { ChangeEvent } from "react";

import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";

const InputWrapper = ({
  title,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  inputMode,
}: {
  type?: string;
  title: string;
  name: string;
  value: string;
  placeholder?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <Label htmlFor={name} title={title} />
      <Input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        inputMode={inputMode}
      />
    </div>
  );
};

export default InputWrapper;
