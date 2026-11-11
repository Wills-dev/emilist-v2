"use client";

import { CreditCard, LockKeyhole } from "lucide-react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import { useFundWalletForm, type FundWalletFormParams } from "../../hooks/useFundWalletForm";

export default function FundWalletModal(props: FundWalletFormParams) {
  const form = useFundWalletForm(props);
  return (
    <ModalWrapper open onClose={form.handleOpenChange} title="Fund Wallet" description="Add money to your wallet securely with Paystack." className="max-w-lg!" headerClassName="border-b border-[#ECECEC] pb-5" showCloseButton={!form.isSubmitting}>
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
          {form.wallet && !form.supportedCurrency && <p role="status" className="text-sm text-[#737774]">Paystack wallet funding is currently available for NGN wallets. Select an NGN wallet to continue.</p>}
          <div className="flex items-center gap-3 rounded-xl border border-[#DDEBE1] bg-[#F0FDF5] p-4 text-sm font-medium text-[#125C32]"><CreditCard className="size-5" />Paystack</div>
          <p className="text-xs leading-5 text-[#737774]">You’ll be redirected to Paystack to complete your payment. Your balance will update once payment is confirmed.</p>
        </fieldset>
        <div className="flex flex-col gap-3 border-t border-[#ECECEC] pt-5 sm:flex-row">
          <Button type="submit" variant="primary" className="w-full sm:order-2 sm:flex-1" loading={form.isSubmitting} disabled={!form.canSubmit || form.isSubmitting}><LockKeyhole className="size-4" />Continue to Paystack</Button>
          <Button variant="default" className="w-full sm:order-1 sm:w-auto" disabled={form.isSubmitting} onClick={form.handleClose}>Cancel</Button>
        </div>
      </form>
    </ModalWrapper>
  );
}
