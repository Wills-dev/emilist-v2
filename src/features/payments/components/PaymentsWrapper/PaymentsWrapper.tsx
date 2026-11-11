"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import Container from "@/components/atoms/Container/Container";

import { useWalletOverview } from "../../hooks/useWalletOverview";
import { useSetDefaultWallet } from "../../hooks/useSetDefaultWallet";
import { useCreateWallet } from "../../hooks/useCreateWallet";
import { monthlyTransactions, transactions } from "../../constants/dummyPayments";
import { PaymentModalType } from "../../types";
import AddBankAccountModal from "../AddBankAccountModal/AddBankAccountModal";
import WithdrawFundsModal from "../WithdrawFundsModal/WithdrawFundsModal";
import FundWalletModal from "../FundWalletModal/FundWalletModal";
import SetDefaultWalletModal from "../SetDefaultWalletModal/SetDefaultWalletModal";
import StatementModal from "../StatementModal/StatementModal";
import TransactionChart from "../TransactionChart/TransactionChart";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import WalletActionModal from "../WalletActionModal/WalletActionModal";
import WalletSummary from "../WalletSummary/WalletSummary";
import WalletSummarySkeleton from "../WalletSummary/WalletSummarySkeleton";

const cardAnimation = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

const PaymentsWrapper = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const walletQuery = useWalletOverview(selectedCurrency ? { currency: selectedCurrency } : {});
  const wallets = walletQuery.data?.wallets ?? [];
  const selectedWallet = walletQuery.data?.wallet;
  const bankAccount = walletQuery.data?.bankAccount;
  const walletId = selectedWallet?.id ?? "";
  const selectWallet = (id: string) => setSelectedCurrency(wallets.find((wallet) => wallet.id === id)?.currency ?? "");
  const [modal, setModal] = useState<PaymentModalType | "add-bank-account" | null>(null);

  const creation = useCreateWallet((currency) => {
    setSelectedCurrency(currency);
    setModal(null);
  });
  const defaultWallet = useSetDefaultWallet();
  const [defaultTarget, setDefaultTarget] = useState<{ id: string; currency: string } | null>(null);
  const settingDefault = useRef(false);
  const handleSetDefault = (id: string) => {
    const wallet = wallets.find((item) => item.id === id);
    if (!wallet || wallet.isDefault || defaultWallet.isPending || creation.isPending) return;
    setDefaultTarget({ id: wallet.id, currency: wallet.currency });
  };
  const confirmDefaultWallet = () => {
    if (!defaultTarget || defaultWallet.isPending || settingDefault.current) return;
    settingDefault.current = true;
    defaultWallet.mutate(defaultTarget.id, {
      onSuccess: () => {
        setSelectedCurrency(defaultTarget.currency);
        setDefaultTarget(null);
      },
      onSettled: () => { settingDefault.current = false; },
    });
  };
  const closeDefaultModal = () => {
    if (!defaultWallet.isPending && !settingDefault.current) setDefaultTarget(null);
  };
  const openWithdrawal = () => {
    if (walletQuery.isPending || walletQuery.isError || !selectedWallet) return;
    if (selectedWallet.currency !== "NGN") { toast.info("Bank withdrawals are currently available for NGN wallets."); return; }
    setModal(bankAccount?.currency === selectedWallet.currency ? "withdraw" : "add-bank-account");
  };
  const openFunding = () => {
    if (walletQuery.isPending) return;
    if (walletQuery.isError) { toast.error("Load your wallets before funding. Please retry."); return; }
    setModal(wallets.length ? "fund" : "add-wallet");
  };

  const completeAction = (message: string) => {
    setModal(null);
    toast.success(message);
  };

  return (
    <Container variant="small" className="py-4">
      <motion.main initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <motion.div variants={cardAnimation}>
            {walletQuery.isPending ? <WalletSummarySkeleton /> : walletQuery.isError ? (
              <div role="alert" className="space-y-3 rounded-lg bg-white p-5 text-sm text-[#737774]"><p>Unable to load your wallets.</p><button type="button" onClick={() => void walletQuery.refetch()} className="text-[#07883E] underline">Retry</button>{selectedCurrency && <button type="button" onClick={() => setSelectedCurrency("")} className="ml-3 text-[#07883E] underline">Show default wallet</button>}</div>
            ) : <WalletSummary wallets={wallets} selectedId={walletId} onSelect={selectWallet} onAdd={() => setModal("add-wallet")} onFund={openFunding} onWithdraw={openWithdrawal} bankAccount={bankAccount} onAddBank={() => setModal("add-bank-account")} onSetDefault={handleSetDefault} isSettingDefault={defaultWallet.isPending} />}
          </motion.div>
          <motion.div variants={cardAnimation}><TransactionChart data={monthlyTransactions} /></motion.div>
        </div>
        <motion.div variants={cardAnimation}><TransactionHistory data={transactions} onFund={openFunding} onStatement={() => setModal("statement")} /></motion.div>
      </motion.main>

      {modal === "add-bank-account" && <AddBankAccountModal onClose={() => setModal(null)} />}
      {modal === "withdraw" && selectedWallet && bankAccount && <WithdrawFundsModal key={`${selectedWallet.id}-${bankAccount.bankAccountId}`} wallet={selectedWallet} bankAccount={bankAccount} onClose={() => setModal(null)} />}
      {modal === "fund" && <FundWalletModal wallets={wallets} selectedWalletId={walletId} onClose={() => setModal(null)} />}
      {defaultTarget && <SetDefaultWalletModal currency={defaultTarget.currency} isSubmitting={defaultWallet.isPending} onConfirm={confirmDefaultWallet} onClose={closeDefaultModal} />}
      {modal === "statement" && <StatementModal open onClose={(open) => !open && setModal(null)} onDownload={() => completeAction("Account statement is ready.")} />}
      {modal === "add-wallet" && <WalletActionModal key={modal} mode={modal} open wallets={wallets} selectedWalletId={walletId} isSubmitting={creation.isPending} onClose={(open) => { if (!open && !creation.isPending) setModal(null); }} onSubmit={(payload) => { if (!creation.isPending) creation.mutate(payload); }} />}
    </Container>
  );
};

export default PaymentsWrapper;
