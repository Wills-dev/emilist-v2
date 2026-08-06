"use client";

import { useState } from "react";

import Input from "@/components/atoms/Input/Input";

type PasswordInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "showPassword" | "onTogglePassword"
>;

const PasswordInput = (props: PasswordInputProps) => {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <Input
      {...props}
      type={type}
      showPassword={type}
      onTogglePassword={() =>
        setType((current) => (current === "password" ? "text" : "password"))
      }
    />
  );
};

export default PasswordInput;
