"use client";

import { useMemo, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import { useStore } from "@/store/authStore";
import { buildTransactionChart } from "../../helpers/buildTransactionChart";
import { getStoredWalletFundingSnapshot, parseStoredWalletFunding, subscribeWalletFundingStorage } from "../../helpers/walletFundingStorage";
import { useWalletTransactions } from "../../hooks/useWalletTransactions";
import TransactionStatusModal from "../TransactionStatusModal/TransactionStatusModal";
import { motion } from "framer-motion";
import { toast } from "sonner";

import Container from "@/components/atoms/Container/Container";

import { useWalletOverview } from "../../hooks/useWalletOverview";
import { useSetDefaultWallet } from "../../hooks/useSetDefaultWallet";
import { useCreateWallet } from "../../hooks/useCreateWallet";
import { PaymentModalType } from "../../types";
import AddBankAccountModal from "../AddBankAccountModal/AddBankAccountModal";
import WithdrawFundsModal from "../WithdrawFundsModal/WithdrawFundsModal";
import FundWalletModal from "../FundWalletModal/FundWalletModal";
import SetDefaultWalletModal from "../SetDefaultWalletModal/SetDefaultWalletModal";
import TransactionChart from "../TransactionChart/TransactionChart";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import WalletActionModal from "../WalletActionModal/WalletActionModal";
import WalletSummary from "../WalletSummary/WalletSummary";
import WalletSummarySkeleton from "../WalletSummary/WalletSummarySkeleton";

const cardAnimation = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

const PaymentsWrapper = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const searchParams = useSearchParams();
  const returnedWalletId = searchParams.get("walletId");
  const walletQuery = useWalletOverview(selectedCurrency ? { currency: selectedCurrency } : returnedWalletId ? { walletId: returnedWalletId } : {});
  const wallets = walletQuery.data?.wallets ?? [];
  const selectedWallet = walletQuery.data?.wallet;
  const bankAccount = walletQuery.data?.bankAccount;
  const walletId = selectedWallet?.id ?? "";
  const transactionsQuery = useWalletTransactions(walletId, selectedWallet?.currency ?? "NGN");
  const transactions = useMemo(() => [...new Map((transactionsQuery.data?.pages.flatMap((page) => page.transactions) ?? []).map((item) => [item.id, item])).values()], [transactionsQuery.data]);
  const chartData = useMemo(() => buildTransactionChart(transactions), [transactions]);
  const [transactionId, setTransactionId] = useState("");
  const userId = useStore((state) => state.currentUser?._id);
  const stored = useSyncExternalStore(subscribeWalletFundingStorage, getStoredWalletFundingSnapshot, () => null);
  const pendingFunding = parseStoredWalletFunding(stored, userId);
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


  return (
    <Container variant="small" className="py-4">
      {pendingFunding && <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-[#FFF6E9] p-4 text-sm text-[#7A541B]"><p>A wallet funding payment is awaiting confirmation.</p><Link href={`/dashboard/payments/complete?reference=${encodeURIComponent(pendingFunding.reference)}`} className="font-medium underline">Check Payment</Link></div>}
      <motion.main initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <motion.div variants={cardAnimation}>
            {walletQuery.isPending ? <WalletSummarySkeleton /> : walletQuery.isError ? (
              <div role="alert" className="space-y-3 rounded-lg bg-white p-5 text-sm text-[#737774]"><p>Unable to load your wallets.</p><button type="button" onClick={() => void walletQuery.refetch()} className="text-[#07883E] underline">Retry</button>{selectedCurrency && <button type="button" onClick={() => setSelectedCurrency("")} className="ml-3 text-[#07883E] underline">Show default wallet</button>}</div>
            ) : <WalletSummary wallets={wallets} selectedId={walletId} onSelect={selectWallet} onAdd={() => setModal("add-wallet")} onFund={openFunding} onWithdraw={openWithdrawal} bankAccount={bankAccount} onAddBank={() => setModal("add-bank-account")} onSetDefault={handleSetDefault} isSettingDefault={defaultWallet.isPending} />}
          </motion.div>
          <motion.div variants={cardAnimation}>{walletQuery.isPending || (walletId && transactionsQuery.isPending) ? <Skeleton className="h-72 w-full" /> : transactionsQuery.isError ? <p className="bg-white p-5 text-sm text-[#737774]">Transaction chart unavailable.</p> : <TransactionChart data={chartData} count={transactions.length} />}</motion.div>
        </div>
        <motion.div variants={cardAnimation}>{walletQuery.isPending || (walletId && transactionsQuery.isPending) ? <div role="status" aria-label="Loading transactions"><Skeleton className="h-64 w-full" /></div> : transactionsQuery.isError ? <div role="alert" className="space-y-2 bg-white p-5 text-sm text-[#737774]"><p>Unable to load transactions.</p><button type="button" onClick={() => void transactionsQuery.refetch()} className="text-[#18A154] underline">Retry</button></div> : <TransactionHistory data={transactions} onFund={openFunding} onStatement={() => toast.info("Account statements are not available yet.")} onViewStatus={setTransactionId} hasMore={transactionsQuery.hasNextPage} loadingMore={transactionsQuery.isFetchingNextPage} onLoadMore={() => void transactionsQuery.fetchNextPage()} />}</motion.div>
      </motion.main>

      {transactionId && <TransactionStatusModal transactionId={transactionId} onClose={() => setTransactionId("")} />}
      {modal === "add-bank-account" && <AddBankAccountModal onClose={() => setModal(null)} />}
      {modal === "withdraw" && selectedWallet && bankAccount && <WithdrawFundsModal key={`${selectedWallet.id}-${bankAccount.bankAccountId}`} wallet={selectedWallet} bankAccount={bankAccount} onClose={() => setModal(null)} />}
      {modal === "fund" && <FundWalletModal wallets={wallets} selectedWalletId={walletId} onClose={() => setModal(null)} />}
      {defaultTarget && <SetDefaultWalletModal currency={defaultTarget.currency} isSubmitting={defaultWallet.isPending} onConfirm={confirmDefaultWallet} onClose={closeDefaultModal} />}
      {modal === "add-wallet" && <WalletActionModal key={modal} mode={modal} open wallets={wallets} selectedWalletId={walletId} isSubmitting={creation.isPending} onClose={(open) => { if (!open && !creation.isPending) setModal(null); }} onSubmit={(payload) => { if (!creation.isPending) creation.mutate(payload); }} />}
    </Container>
  );
};

export default PaymentsWrapper;
