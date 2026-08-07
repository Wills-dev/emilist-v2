"use client";

import { FormEvent, useState } from "react";
import { Lock } from "lucide-react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";

import { PaymentModalType, Wallet } from "../../types";

const titles = { "add-wallet": "+Add New Wallet", fund: "Fund Wallet", withdraw: "Withdraw Funds" } as const;

const WalletActionModal = ({
  mode,
  open,
  wallets,
  selectedWalletId,
  onClose,
  onSubmit,
}: {
  mode: Exclude<PaymentModalType, "statement">;
  open: boolean;
  wallets: Wallet[];
  selectedWalletId: string;
  onClose: (open: boolean) => void;
  onSubmit: () => void;
}) => {
  const selectedWallet = wallets.find((wallet) => wallet.id === selectedWalletId) ?? wallets[0];
  const [currency, setCurrency] = useState(selectedWallet.currency);
  const [isDefault, setIsDefault] = useState<"yes" | "no">("yes");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title={titles[mode]} className="max-w-125! rounded-xl p-6" titleClassName="text-base!" headerClassName="border-b border-[#E9EDEB] pb-4">
      <form onSubmit={handleSubmit} className="space-y-4 pt-5">
        {mode === "add-wallet" ? (
          <>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Select currency</span>
              <select value={currency} onChange={(event) => setCurrency(event.target.value as Wallet["currency"])} className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                {(["NGN", "USD", "EUR", "CAD"] as const).map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
            <fieldset>
              <legend className="mb-3 text-xs text-[#555B57]">Set as default wallet</legend>
              <OptionToggle name="default-wallet" ariaLabel="Set as default wallet" value={isDefault} onChange={setIsDefault} options={[{ value: "yes", label: "Yes" }, { value: "no", label: "No" }]} />
            </fieldset>
          </>
        ) : (
          <>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Select wallet to {mode === "fund" ? "fund" : "withdraw from"}</span>
              <select defaultValue={selectedWalletId} className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                {wallets.map((wallet) => <option key={wallet.id} value={wallet.id}>{wallet.name} · {wallet.currency}</option>)}
              </select>
            </label>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>Enter an amount</span>
              <div className="grid grid-cols-[90px_1fr] gap-2">
                <select defaultValue={selectedWallet.currency} className="rounded-lg bg-[#ECECEC] px-3"><option>{selectedWallet.currency}</option></select>
                <Input type="number" min="1" required placeholder="Enter Amount" />
              </div>
            </label>
            <label className="block space-y-2 text-xs text-[#555B57]">
              <span>{mode === "fund" ? "Select payment method" : "Select bank account"}</span>
              <select required defaultValue="" className="h-11 w-full rounded-lg bg-[#ECECEC] px-3 text-sm outline-none">
                <option value="" disabled>Please select</option>
                <option>{mode === "fund" ? "Paystack" : `${selectedWallet.bank} · ${selectedWallet.accountNumber}`}</option>
              </select>
            </label>
          </>
        )}

        <Button type="submit" variant="primary" className="w-full">
          {mode === "add-wallet" ? "Create Wallet" : <><Lock className="size-3" />{mode === "fund" ? "Pay with Paystack" : "Withdraw Funds"}</>}
        </Button>
        {mode !== "add-wallet" && <p className="text-center text-[10px] text-[#A0A3A1]">Emilist uses Paystack to provide secure payments for you</p>}
      </form>
    </ModalWrapper>
  );
};

export default WalletActionModal;
