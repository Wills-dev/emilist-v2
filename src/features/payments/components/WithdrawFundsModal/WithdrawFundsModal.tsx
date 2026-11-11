"use client";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { formatBudgetAmount } from "@/features/jobs/helpers/manageJobs";
import { useWithdrawFundsForm, type WithdrawFundsFormParams } from "../../hooks/useWithdrawFundsForm";

export default function WithdrawFundsModal(props: WithdrawFundsFormParams) {
  const form = useWithdrawFundsForm(props);
  const money = (amount: number) => formatBudgetAmount(amount, props.wallet.currency);
  return (
    <ModalWrapper open onClose={form.handleOpenChange} title={form.reviewing ? "Confirm withdrawal" : "Withdraw Funds"} description="Withdraw from your wallet to your payout bank account." className="max-w-lg!" showCloseButton={!form.isSubmitting}>
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-5">
        <div className="space-y-2 rounded-xl bg-[#F0FDF5] p-4 text-sm text-[#4F5D75]">
          <div className="flex justify-between gap-3"><span>{props.wallet.currency} wallet</span><strong>{props.wallet.balance === undefined ? "Balance unavailable" : money(props.wallet.balance)}</strong></div>
          <div className="border-t border-[#DDEBE1] pt-3">
            <p className="text-xs text-[#737774]">Paying out to</p>
            <p className="mt-1 font-medium wrap-anywhere">{props.bankAccount.accountName}</p>
            <p>{props.bankAccount.bankName} · {props.bankAccount.accountNumber}</p>
          </div>
        </div>
        {form.reviewing ? (
          <div className="space-y-2 text-center"><p className="text-sm text-[#737774]">Amount to withdraw</p><p className="font-exo text-2xl font-bold text-[#125C32]">{money(form.amount)}</p></div>
        ) : (
          <label className="block space-y-2 text-sm text-[#555B57]">
            <span>Withdrawal amount ({props.wallet.currency})</span>
            <Input type="text" inputMode="decimal" required disabled={form.isSubmitting} value={form.amountInput} onChange={form.handleAmountChange} placeholder="Enter amount" />
            {form.insufficientBalance && <span role="alert" className="block text-xs text-[#DC3545]">This amount exceeds your wallet balance.</span>}
          </label>
        )}
        <p className="rounded-lg bg-[#FFF6E9] p-3 text-xs leading-5 text-[#7A541B]">The amount will be held from your wallet immediately. An admin must approve the withdrawal before it reaches your bank. If declined or the transfer fails, the amount is refunded.</p>
        <div className="flex flex-col gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
          <Button type="submit" variant="primary" className="w-full sm:order-2 sm:flex-1" loading={form.isSubmitting} disabled={!form.canSubmit || form.isSubmitting}>{form.reviewing ? "Confirm Withdrawal" : "Review Withdrawal"}</Button>
          <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={form.isSubmitting} onClick={form.reviewing ? () => form.setReviewing(false) : form.handleClose}>{form.reviewing ? "Back" : "Cancel"}</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
