"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Lock } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";

import type { CreateWalletPayload } from "../../types/wallets";
import { PaymentModalType, Wallet } from "../../types";

const titles = { "add-wallet": "+Add New Wallet", fund: "Fund Wallet", withdraw: "Withdraw Funds" } as const;

const WalletActionModal = ({
  mode,
  open,
  wallets,
  selectedWalletId,
  onClose,
  onSubmit,
  isSubmitting = false,
}: {
  mode: Exclude<PaymentModalType, "statement">;
  open: boolean;
  wallets: Wallet[];
  selectedWalletId: string;
  onClose: (open: boolean) => void;
  onSubmit: (payload: CreateWalletPayload) => void;
  isSubmitting?: boolean;
}) => {
  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId) ?? wallets[0];
  const currencies = ["NGN", "USD", "EUR", "CAD"] as const;
  const availableCurrencies = currencies.filter((currency) => !wallets.some((wallet) => wallet.currency === currency));
  const [currency, setCurrency] = useState<string>(mode === "add-wallet" ? availableCurrencies[0] ?? "" : selectedWallet?.currency ?? "NGN");
  const submitting = useRef(false);
  useEffect(() => { if (!isSubmitting) submitting.current = false; }, [isSubmitting]);
  const duplicateCurrency = mode === "add-wallet" && wallets.some((wallet) => wallet.currency === currency);
  const [isDefault, setIsDefault] = useState<"yes" | "no">("yes");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || submitting.current || !currency || duplicateCurrency) return;
    submitting.current = true;
    onSubmit({ currency, isDefault: isDefault === "yes" });
  };

  return (
    <ModalWrapper open={open} onClose={(open) => { if (!isSubmitting && !submitting.current) onClose(open); }} showCloseButton={!isSubmitting} title={titles[mode]} className="max-w-125! rounded-xl p-6" titleClassName="text-base!" headerClassName="border-b border-[#E9EDEB] pb-4">
      <form onSubmit={handleSubmit} className="space-y-4 pt-5">
        <fieldset disabled={isSubmitting} className="space-y-4">
        {mode === "add-wallet" ? (
          <>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Select currency</span>
              <select value={currency} onChange={(event) => setCurrency(event.target.value as Wallet["currency"])} className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                {!availableCurrencies.length && <option value="">All currency wallets already exist</option>}
                {availableCurrencies.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <fieldset>
              <legend className="mb-3 text-xs text-[#555B57]">Set as default wallet</legend>
              <OptionToggle name="default-wallet" ariaLabel="Set as default wallet" value={isDefault} onChange={setIsDefault} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
            </fieldset>
            <p className="text-xs leading-5 text-[#737774]">One wallet per currency. Setting this as default replaces your previous default wallet.</p>
          </>
        ) : (
          <>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Select wallet to {mode === "fund" ? "fund" : "withdraw from"}</span>
              <select defaultValue={selectedWalletId} className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                {wallets.map((wallet) => <option key={wallet.id} value={wallet.id}>{wallet.name ?? "Wallet"} · {wallet.currency}</option>)}
              </select>
            </label>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Enter an amount</span>
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <select defaultValue={selectedWallet?.currency} className="rounded-lg bg-[#ECECEC] px-3"><option>{selectedWallet?.currency}</option></select>
                <Input type="number" min="1" required placeholder="Enter Amount" />
              </div>
            </label>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>{mode === "fund" ? "Select payment method" : "Select bank account"}</span>
              <select required defaultValue="" className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                <option value="" disabled>Please select</option>
                <option>{mode === "fund" ? "Paystack" : `${selectedWallet?.bank ?? ""} · ${selectedWallet?.accountNumber ?? ""}`}</option>
              </select>
            </label>
          </>
        )}

        </fieldset>
        <Button type="submit" variant="primary" className="w-full" loading={isSubmitting} disabled={isSubmitting || !currency || duplicateCurrency}>
          {mode === "add-wallet" ? "Create Wallet" : <><Lock className="size-3" />{mode === "fund" ? "Pay with Paystack" : "Withdraw Funds"}</>}
        </Button>
        {mode !== "add-wallet" && <p className="text-center text-[10px] text-[#A0A3A1]">Emilist uses Paystack to provide secure payments for you</p>}
      </form>
    </ModalWrapper>
  );
};

export default WalletActionModal;
