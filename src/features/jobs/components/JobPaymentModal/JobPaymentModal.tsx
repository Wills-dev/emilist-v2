"use client";

import { CreditCard, Wallet, LockKeyhole } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { formatBudgetAmount } from "../../helpers/manageJobs";
import { useJobPaymentForm, type JobPaymentFormParams } from "../../hooks/useJobPaymentForm";

export default function JobPaymentModal(props: JobPaymentFormParams) {
  const form = useJobPaymentForm(props);
  const money = (amount: number) => formatBudgetAmount(amount, form.currency);
  return (
    <ModalWrapper open onClose={form.handleOpenChange} title="Make Payment" description="Choose how you would like to pay for this milestone." className="max-w-lg!" headerClassName="border-b border-[#ECECEC] pb-5" showCloseButton={!form.isSubmitting}>
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-5">
        <div className="space-y-2 rounded-xl border border-[#DDEBE1] bg-[#F0FDF5] p-4">
          <p className="text-xs font-medium text-[#707471]">{props.invoice.number !== "—" ? props.invoice.number : props.invoice.invoiceId || "Milestone invoice"}</p>
          <p className="text-sm text-[#303632]">{props.invoice.milestone}</p>
          <div className="space-y-2 border-t border-[#DDEBE1] pt-3 text-sm text-[#4F5D75]">
            <div className="flex justify-between gap-3"><span>Milestone amount (required)</span><span>{money(form.milestoneAmount)}</span></div>
            {form.isAdditionalAmount && <div className="flex justify-between gap-3"><span>Additional costs</span><span>{money(form.additionalAmount)}</span></div>}
          </div>
          <div aria-live="polite" className="flex items-center justify-between gap-3 pt-2">
            <span className="text-sm font-medium text-[#125C32]">Total to pay</span>
            <p className="font-exo text-2xl font-bold text-[#125C32]">{money(form.amount)}</p>
          </div>
        </div>
        <fieldset disabled={form.isSubmitting} className="space-y-5">
          {(props.invoice.additionalAmount ?? 0) > 0 && (
            <div className="space-y-2 rounded-xl border border-[#EDEEF0] p-4">
              <label className="flex cursor-pointer items-center gap-2 text-sm text-[#4F5D75]">
                <input type="checkbox" name="include-additional-costs" checked={form.isAdditionalAmount} onChange={(event) => form.setIsAdditionalAmount(event.target.checked)} className="accent-[#18A154]" />
                Include additional costs · {money(form.additionalAmount)}
              </label>
              <p className="text-xs leading-5 text-[#707471]">Optional. The milestone amount is always included.</p>
            </div>
          )}
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-[#303632]">Payment method</legend>
            <div className="grid grid-cols-2 gap-3">
              {(["Wallet", "Card"] as const).map((method) => {
                const Icon = method === "Wallet" ? Wallet : CreditCard;
                return (
                  <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-4 text-sm ${form.paymentMethod === method ? "border-[#18A154] bg-[#F0FDF5] text-[#125C32]" : "border-[#EDEEF0] text-[#707471]"}`}>
                    <input type="radio" name="payment-method" value={method} checked={form.paymentMethod === method} onChange={() => form.setPaymentMethod(method)} className="accent-[#18A154]" />
                    <Icon className="size-4" />{method === "Card" ? "Paystack" : method}
                  </label>
                );
              })}
            </div>
          </fieldset>
          {form.paymentMethod === "Wallet" ? (
            <div aria-live="polite" className="rounded-xl bg-[#F9F9F9] p-4 text-sm text-[#707471]">
              {form.wallets.isPending ? <p>Loading wallets…</p> : form.wallets.isError ? (
                <div className="space-y-2"><p>Unable to load wallets. You can retry or pay with Paystack.</p><button type="button" onClick={() => void form.wallets.refetch()} className="font-medium text-[#18A154] underline">Retry</button></div>
              ) : !form.wallet ? <p>No {form.currency} wallet found. Please choose Paystack to continue.</p> : (
                <div className="space-y-2">
                  <div className="flex justify-between gap-3"><span>{form.currency} wallet balance</span><strong className="text-[#303632]">{form.wallet.balance === undefined ? "Unavailable" : money(form.wallet.balance)}</strong></div>
                  {form.insufficientBalance && <p className="text-[#DC3545]">Insufficient balance. Fund your wallet or choose Paystack.</p>}
                </div>
              )}
            </div>
          ) : <p className="text-sm leading-6 text-[#707471]">Continue to Paystack to complete your payment securely.</p>}
        </fieldset>
        <div className="grid grid-cols-1 gap-3 border-t border-[#ECECEC] pt-5 sm:grid-cols-[auto_1fr]">
          <Button variant="default" disabled={form.isSubmitting} onClick={form.handleClose}>Cancel</Button>
          <Button type="submit" variant="primary" className="w-full" disabled={!form.canSubmit || form.isSubmitting} loading={form.isSubmitting}>
            <LockKeyhole className="size-4" />{form.paymentMethod === "Card" ? "Continue to Paystack" : `Pay ${money(form.amount)}`}
          </Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
