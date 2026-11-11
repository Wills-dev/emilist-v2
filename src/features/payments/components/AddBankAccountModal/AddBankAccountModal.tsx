"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import SearchableSelect from "@/components/atoms/SearchableSelect/SearchableSelect";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useAddBankAccountForm } from "../../hooks/useAddBankAccountForm";

export default function AddBankAccountModal({ onClose }: { onClose: () => void }) {
  const form = useAddBankAccountForm(onClose);
  return (
    <ModalWrapper open onClose={form.handleOpenChange} title="Add payout bank account" description="Add an NGN bank account to receive wallet withdrawals." className="max-w-lg!" showCloseButton={!form.isSubmitting}>
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-5">
        <fieldset disabled={form.isSubmitting} className="space-y-4">
          {form.banks.isPending ? <div role="status" aria-label="Loading banks"><Skeleton className="h-11 w-full" /></div> : form.banks.isError ? (
            <div role="alert" className="space-y-2 text-sm text-[#707471]"><p>Unable to load banks.</p><button type="button" onClick={() => void form.banks.refetch()} className="text-[#18A154] underline">Retry</button></div>
          ) : (
            <div className="space-y-2 text-sm text-[#555B57]">
              <p>Bank</p>
              <SearchableSelect
                modal
                size="default"
                ariaLabel="Bank"
                options={(form.banks.data ?? []).map((bank) => ({
                  label: bank.bankName,
                  value: JSON.stringify([bank.bankCode, bank.bankName]),
                }))}
                value={form.selectedBank}
                onValueChange={form.setSelectedBank}
                placeholder={form.banks.data?.length ? "Select your bank" : "No banks available"}
                searchPlaceholder="Search banks…"
                emptyMessage="No banks found."
                disabled={form.isSubmitting || !form.banks.data?.length}
              />
            </div>
          )}
          <label className="block space-y-2 text-sm text-[#555B57]">
            <span>Account number</span>
            <Input type="text" inputMode="numeric" autoComplete="off" required maxLength={10} minLength={10} pattern="[0-9]{10}" value={form.accountNumber} onChange={form.handleAccountChange} placeholder="Enter 10-digit account number" />
          </label>
          <p className="text-xs leading-5 text-[#737774]">Your account name will be verified with the bank when you save.</p>
        </fieldset>
        <div className="flex flex-col gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
          <Button type="submit" variant="primary" className="w-full sm:order-2 sm:flex-1" loading={form.isSubmitting} disabled={!form.canSubmit || form.isSubmitting}>Save Bank Account</Button>
          <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={form.isSubmitting} onClick={form.handleClose}>Cancel</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
