"use client";

import { ArrowRight, Copy, Plus } from "lucide-react";

import { Wallet } from "../../types";

const symbols = { NGN: "₦", USD: "$", EUR: "€", CAD: "C$" };

const WalletSummary = ({
  wallets,
  selectedId,
  onSelect,
  onAdd,
  onFund,
  onWithdraw,
}: {
  wallets: Wallet[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onFund: () => void;
  onWithdraw: () => void;
}) => {
  const wallet = wallets.find((item) => item.id === selectedId) ?? wallets[0];

  return (
    <section className="space-y-3">
      <select
        value={selectedId}
        onChange={(event) => onSelect(event.target.value)}
        aria-label="Select wallet currency"
        className="h-10 bg-white px-3 text-sm outline-none"
      >
        {wallets.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name} · {item.currency}
          </option>
        ))}
      </select>

      <div className="divide-y divide-[#E9EDEB] bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between text-xs text-[#737774]">
            Wallet Balance
            <button type="button" onClick={onAdd} className="flex items-center gap-1 text-[#6667FF]">
              <Plus className="size-3" /> Add wallet
            </button>
          </div>
          <strong className="mt-3 block font-exo text-xl text-[#101828]">
            {symbols[wallet.currency]} {wallet.balance.toLocaleString()}
          </strong>
        </div>
        <div className="flex items-center justify-between p-4 text-xs">
          <button type="button" onClick={onWithdraw} className="text-[#737774]">Withdraw Funds</button>
          <button type="button" onClick={onFund} className="flex items-center gap-1 text-[#07883E]">
            Fund Wallet <ArrowRight className="size-3" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs text-[#737774]">
        <span>Bank: <strong>{wallet.bank}</strong></span>
        <span className="flex items-center gap-1">A/C No: <strong>{wallet.accountNumber}</strong><Copy className="size-3 text-[#6667FF]" /></span>
      </div>
    </section>
  );
};

export default WalletSummary;
