"use client";

import { CreditCard, Wallet } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { formatBudgetAmount } from "@/features/jobs/helpers/manageJobs";
import { useSubscribePlanForm, type SubscribePlanFormParams } from "../../hooks/useSubscribePlanForm";

export default function SubscribePlanModal(props: SubscribePlanFormParams) {
  const form = useSubscribePlanForm(props);
  const money = (amount: number) => formatBudgetAmount(amount, form.currency);
  return (
    <ModalWrapper open title={`Activate ${props.plan.name}`} description={form.isFree ? "Confirm activation of this free plan. No payment is required." : "Choose how you would like to pay for your subscription."} onClose={form.handleOpenChange} showCloseButton={!form.isSubmitting} className="max-w-lg!">
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-5">
        <div className="rounded-xl bg-[#F0FDF5] p-4">
          <p className="text-sm text-[#4F5D75]">{props.plan.name} · {props.billingCycle}</p>
          <p className="mt-2 font-exo text-2xl font-bold text-[#125C32]">{form.isFree ? "Free" : form.price === undefined ? "Price unavailable" : money(form.price)}</p>
        </div>
        {form.yearlyUnavailable && <p role="status" className="text-sm text-[#737774]">Yearly activation is currently unavailable. Choose monthly to continue.</p>}
        {!form.isFree && <fieldset disabled={form.isSubmitting} className="space-y-4">
          <legend className="mb-3 text-sm font-medium text-[#303632]">Payment method</legend>
          <div className="grid grid-cols-2 gap-3">{(["Wallet", "Card"] as const).map((method) => {
            const Icon = method === "Wallet" ? Wallet : CreditCard;
            return <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-4 text-sm ${form.paymentMethod === method ? "border-[#18A154] bg-[#F0FDF5] text-[#125C32]" : "border-[#EDEEF0] text-[#707471]"}`}>
              <input type="radio" name="subscription-payment-method" checked={form.paymentMethod === method} onChange={() => form.setPaymentMethod(method)} className="accent-[#18A154]" /><Icon className="size-4" />{method === "Card" ? "Paystack" : method}
            </label>;
          })}</div>
          {form.paymentMethod === "Wallet" ? <div aria-live="polite" className="space-y-2 rounded-xl bg-[#F9F9F9] p-4 text-sm text-[#707471]">
            {form.wallets.isPending ? <p>Loading wallets…</p> : form.wallets.isError ? <><p>Unable to load wallets. Retry or choose Paystack.</p><button type="button" onClick={() => void form.wallets.refetch()} className="text-[#18A154] underline">Retry</button></> : !form.wallet ? <p>Create and fund a {form.currency} wallet, or choose Paystack.</p> : <>
              <p>{form.currency} wallet balance: <strong>{form.wallet.balance === undefined ? "Unavailable" : money(form.wallet.balance)}</strong></p>
              {form.insufficientBalance && <p className="text-[#DC3545]">Insufficient balance. Fund your wallet or choose Paystack.</p>}
            </>}
          </div> : <p className="text-sm text-[#707471]">You’ll be redirected to Paystack to complete your payment.</p>}
        </fieldset>}
        <div className="flex flex-col gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
          <Button type="submit" variant="primary" className="w-full sm:order-2 sm:flex-1" loading={form.isSubmitting} disabled={!form.canSubmit || form.isSubmitting}>{form.isFree ? "Activate Free Plan" : form.paymentMethod === "Card" ? "Continue to Paystack" : "Pay and Activate"}</Button>
          <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={form.isSubmitting} onClick={form.handleClose}>Cancel</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
