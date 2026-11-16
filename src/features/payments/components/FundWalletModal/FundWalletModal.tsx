"use client";

import { CreditCard, LockKeyhole } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useFundWalletForm, type FundWalletFormParams } from "../../hooks/useFundWalletForm";

export default function FundWalletModal(props: FundWalletFormParams) {
  const form = useFundWalletForm(props);
  return (
    <ModalWrapper open onClose={form.handleOpenChange} title="Fund Wallet" description="Fund your wallet with Paystack or submit a bank-transfer receipt." className="max-w-lg!" headerClassName="border-b border-[#ECECEC] pb-5" showCloseButton={!form.isSubmitting}>
      <form onSubmit={form.handleSubmit} className="space-y-5 pt-5">
        <fieldset disabled={form.isSubmitting} className="space-y-4">
          <label className="block space-y-2 text-sm text-[#555B57]">
            <span>Select wallet</span>
            <select required value={form.walletId} onChange={(event) => form.setWalletId(event.target.value)} className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 outline-none">
              {!props.wallets.length && <option value="">Create a wallet first</option>}
              {props.wallets.map((wallet) => <option key={wallet.id} value={wallet.id}>{wallet.currency} Wallet{wallet.isDefault ? " · Default" : ""}</option>)}
            </select>
          </label>
          <label className="block space-y-2 text-sm text-[#555B57]">
            <span>Amount to add</span>
            <div className="flex min-w-0 gap-2">
              <span className="flex shrink-0 items-center rounded-lg bg-[#ECECEC] px-4">{form.wallet?.currency ?? "—"}</span>
              <div className="min-w-0 flex-1"><Input type="text" inputMode="decimal" required value={form.amountInput} onChange={form.handleAmountChange} placeholder="Enter amount" /></div>
            </div>
          </label>
          <fieldset>
            <legend className="mb-3 text-sm text-[#555B57]">Payment method</legend>
            <div className="flex flex-wrap gap-3">
              {([...(form.supportedCurrency ? ["Card" as const] : []), "BankTransfer" as const]).map((method) => (
                <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-3 text-sm ${form.paymentMethod === method ? "border-[#18A154] bg-[#F0FDF5] text-[#125C32]" : "border-[#EDEEF0] text-[#737774]"}`}>
                  <input type="radio" name="funding-method" checked={form.paymentMethod === method} onChange={() => form.setPaymentMethod(method)} className="accent-[#18A154]" />
                  {method === "Card" && <CreditCard className="size-4" />}{method === "Card" ? "Paystack" : "Bank transfer"}
                </label>
              ))}
            </div>
          </fieldset>
          {form.paymentMethod === "BankTransfer" ? <>
            <label className="block space-y-2 text-sm text-[#555B57]">
              <span>Transfer receipt</span>
              <input key={form.walletId} type="file" accept="image/*" required onChange={form.handleReceiptChange} className="block w-full rounded-lg border border-[#EDEEF0] p-3 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-[#F0FDF5] file:px-3 file:py-2 file:text-[#125C32]" />
              {form.receiptError && <span role="alert" className="block text-xs text-[#DC3545]">{form.receiptError}</span>}
            </label>
            <p className="text-xs leading-5 text-[#737774]">Upload the receipt for a transfer you’ve already made. Your wallet will be credited after an administrator confirms it.</p>
          </> : <p className="text-xs leading-5 text-[#737774]">You’ll be redirected to Paystack to complete your payment. Your balance will update once payment is confirmed.</p>}
        </fieldset>
        <div className="flex flex-col gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
          <Button type="submit" variant="primary" className="w-full sm:order-2 sm:flex-1" loading={form.isSubmitting} disabled={!form.canSubmit || form.isSubmitting}><LockKeyhole className="size-4" />{form.paymentMethod === "Card" ? "Continue to Paystack" : "Submit Transfer"}</Button>
          <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={form.isSubmitting} onClick={form.handleClose}>Cancel</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
