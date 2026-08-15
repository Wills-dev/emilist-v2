import clsx from "clsx";

import FieldError from "@/components/atoms/FieldError/FieldError";
import Label from "@/components/atoms/Label/Label";

const FormField = ({
  children,
  error,
  helperText,
  htmlFor,
  label,
  className,
}: {
  children: React.ReactNode;
  error?: string;
  helperText?: string;
  htmlFor: string;
  label: string;
  className?: string;
}) => {
  const descriptionId = `${htmlFor}-description`;

  return (
    <div className={clsx("flex w-full flex-col gap-2", className)}>
      <Label htmlFor={htmlFor} title={label} />
      {children}
      {error ? (
        <FieldError id={descriptionId} message={error} />
      ) : helperText ? (
        <p id={descriptionId} className="text-xs leading-5 text-[#737774]">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default FormField;
