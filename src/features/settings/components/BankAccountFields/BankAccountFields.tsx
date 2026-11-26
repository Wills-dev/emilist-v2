"use client";

import { Trash2 } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import Label from "@/components/atoms/Label/Label";
import SearchableSelect from "@/components/atoms/SearchableSelect/SearchableSelect";
import { countriesAndStates } from "@/lib/constants/countries";
import { formatInputTextNumber } from "@/lib/helpers/formatNumbers";
import { BankDetailsFormValues } from "../../types/bank";
import PasswordInput from "@/components/molecules/PasswordInput/PasswordInput";

interface BankAccountFieldsProps {
  account: BankDetailsFormValues;
  index: number;
  removable: boolean;
  password: string;
  isSaved: boolean;
  isSaving: boolean;
  disabled: boolean;
  onChange: (
    id: string,
    field: keyof Omit<BankDetailsFormValues, "id">,
    value: string,
  ) => void;
  onRemove: (id: string) => void;
  onPasswordChange: (id: string, value: string) => void;
  onSave: (id: string) => void;
}

const Field = ({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-3">
    <Label htmlFor={id ?? label.toLowerCase().replaceAll(" ", "-")} title={label} />
    {children}
  </div>
);

const BankAccountFields = ({
  account,
  index,
  removable,
  password,
  isSaved,
  isSaving,
  disabled,
  onChange,
  onRemove,
  onPasswordChange,
  onSave,
}: BankAccountFieldsProps) => {
  return (
    <fieldset disabled={disabled} className="rounded-lg bg-white p-5 max-sm:p-4">
      <div className="mb-6 flex items-center justify-between border-b border-[#ECECEC] pb-4">
        <h3 className="font-exo font-medium text-[#474C48]">
          {isSaved ? "Connected Bank Account" : `Bank Account ${index + 1}`}
        </h3>
        {removable && (
          <Button
            variant="default"
            onClick={() => onRemove(account.id)}
            className="h-9 px-3 py-2 text-[#FF5D7A]"
          >
            <Trash2 className="size-4" />
            Remove
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-7 max-sm:grid-cols-1">
        <Field label="Bank name" id={`bank-${account.id}-bankName`}>
          <Input
            id={`bank-${account.id}-bankName`}
            value={account.bankName}
            onChange={(event) =>
              onChange(account.id, "bankName", event.target.value)
            }
            placeholder="Enter bank name"
          />
        </Field>
        <Field label="Account number" id={`bank-${account.id}-accountNumber`}>
          <Input
            id={`bank-${account.id}-accountNumber`}
            value={account.accountNumber}
            onChange={(event) =>
              onChange(
                account.id,
                "accountNumber",
                formatInputTextNumber(event.target.value),
              )
            }
            inputMode="numeric"
            placeholder="Enter account number"
          />
        </Field>
        <Field label="Account name" id={`bank-${account.id}-accountName`}>
          <Input
            id={`bank-${account.id}-accountName`}
            value={account.accountName}
            onChange={(event) =>
              onChange(account.id, "accountName", event.target.value)
            }
            placeholder="Enter account name"
          />
        </Field>
        <Field label="Bank country (optional)">
          <SearchableSelect
            value={account.country}
            onValueChange={(value) => onChange(account.id, "country", value)}
            options={countriesAndStates}
            placeholder="Select country"
            searchPlaceholder="Search countries..."
            size="default"
          />
        </Field>
        {!isSaved && (
          <div className="col-span-2 max-sm:col-span-1">
            <Field label="Enter password" id={`bank-${account.id}-password`}>
              <PasswordInput
                id={`bank-${account.id}-password`}
                value={password}
                onChange={(event) =>
                  onPasswordChange(account.id, event.target.value)
                }
                autoComplete="current-password"
                placeholder="Enter your Emilist password"
              />
            </Field>
          </div>
        )}
      </div>
      <div className="mt-7 flex justify-end">
        <Button
          variant="primary"
          onClick={() => onSave(account.id)}
          disabled={isSaved || disabled}
          loading={isSaving}
          className="h-10 min-w-40 py-2 max-sm:w-full"
        >
          {isSaved ? "Saved" : "Save Bank Details"}
        </Button>
      </div>
    </fieldset>
  );
};

export default BankAccountFields;
