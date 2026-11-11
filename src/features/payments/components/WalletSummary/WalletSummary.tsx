"use client";

import { ArrowRight, Plus, Loader } from "lucide-react";
import type { Wallet } from "../../types";
import { formatBudgetAmount } from "@/features/jobs/helpers/manageJobs";

const WalletSummary = ({ wallets, selectedId, onSelect, onAdd, onFund, onWithdraw, onSetDefault, isSettingDefault = false }: {
  wallets: Wallet[];
  selectedId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onFund: () => void;
  onWithdraw: () => void;
  onSetDefault: (walletId: string) => void;
  isSettingDefault?: boolean;
}) => {
  const wallet = wallets.find((item) => item.id === selectedId) ?? wallets.find((item) => item.isDefault) ?? wallets[0];
  return (
    <section className="space-y-3">
      {wallet && <select value={wallet.id} onChange={(event) => onSelect(event.target.value)} disabled={isSettingDefault} aria-label="Select wallet currency" className="h-10 w-full bg-white px-3 text-sm outline-none">
        {wallets.map((item) => <option key={item.id} value={item.id}>{item.currency} Wallet{item.isDefault ? " · Default" : ""}</option>)}
      </select>}
      <div className="divide-y divide-[#E9EDEB] bg-white">
        <div className="p-4">
          <div className="flex items-center justify-between gap-2 text-xs text-[#737774]">
            Wallet Balance
            <button type="button" onClick={onAdd} className="flex items-center gap-1 text-[#6667FF]"><Plus className="size-3" />Add wallet</button>
          </div>
          {wallet ? <>
            <strong className="mt-3 block font-exo text-xl text-[#101828]">{wallet.balance === undefined ? "Balance unavailable" : formatBudgetAmount(wallet.balance, wallet.currency)}</strong>
            <div className="mt-2 min-h-5 text-xs text-[#07883E]">
              {wallet.isDefault ? <p>Default wallet</p> : (
                <button type="button" onClick={() => onSetDefault(wallet.id)} disabled={isSettingDefault} aria-busy={isSettingDefault || undefined} className="inline-flex items-center gap-1.5 font-medium hover:underline disabled:cursor-wait disabled:opacity-60">
                  {isSettingDefault && <Loader className="size-3 animate-spin" aria-hidden="true" />}
                  {isSettingDefault ? "Setting default…" : "Set as default"}
                </button>
              )}
            </div>
          </> : <p className="mt-3 text-sm text-[#737774]">No wallets yet. Create a currency wallet to get started.</p>}
        </div>
        {wallet && <div className="flex items-center justify-between gap-2 p-4 text-xs">
          <button type="button" onClick={onWithdraw} className="text-[#737774]">Withdraw Funds</button>
          <button type="button" onClick={onFund} className="flex items-center gap-1 text-[#07883E]">Fund Wallet<ArrowRight className="size-3" /></button>
        </div>}
      </div>
    </section>
  );
};

export default WalletSummary;
