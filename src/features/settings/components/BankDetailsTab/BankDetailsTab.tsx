"use client";

import { Plus } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import BankAccountFields from "../BankAccountFields/BankAccountFields";
import type { BankDetailsFormController } from "../../hooks/useBankDetailsForm";

const BankDetailsTab = ({ form }: { form: BankDetailsFormController }) => {
  const {
    accounts,
    updateAccount,
    addAccount,
    removeAccount,
    passwords,
    updatePassword,
    saveAccount,
    savedAccountIds,
    hasExistingBankDetails,
    canAddAccount,
  } = form;

  return (
    <section className="w-full bg-white p-2 max-sm:p-0">
      <div className="space-y-4 rounded-lg bg-[#F4F7F5] p-2 max-sm:p-3">
        {accounts.map((account, index) => (
          <BankAccountFields
            key={account.id}
            account={account}
            index={index}
            removable={accounts.length > 1}
            password={passwords[account.id] ?? ""}
            isSaved={savedAccountIds.includes(account.id)}
            onChange={updateAccount}
            onRemove={removeAccount}
            onPasswordChange={updatePassword}
            onSave={saveAccount}
          />
        ))}

        {hasExistingBankDetails && (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              onClick={addAccount}
              disabled={!canAddAccount}
              className="h-10 py-2"
            >
              <Plus className="size-4" />
              Add another bank
            </Button>
          </div>
        )}
        {hasExistingBankDetails && !canAddAccount && (
          <p className="text-right text-xs text-[#737774]">
            Complete the current bank account before adding another.
          </p>
        )}
      </div>
    </section>
  );
};

export default BankDetailsTab;
