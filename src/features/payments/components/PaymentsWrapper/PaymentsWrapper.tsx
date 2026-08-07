"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import Container from "@/components/atoms/Container/Container";

import { monthlyTransactions, transactions, wallets } from "../../constants/dummyPayments";
import { PaymentModalType } from "../../types";
import StatementModal from "../StatementModal/StatementModal";
import TransactionChart from "../TransactionChart/TransactionChart";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import WalletActionModal from "../WalletActionModal/WalletActionModal";
import WalletSummary from "../WalletSummary/WalletSummary";

const cardAnimation = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

const PaymentsWrapper = () => {
  const [walletId, setWalletId] = useState(wallets[0].id);
  const [modal, setModal] = useState<PaymentModalType | null>(null);

  const completeAction = (message: string) => {
    setModal(null);
    toast.success(message);
  };

  return (
    <Container variant="small" className="py-4">
      <motion.main initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="space-y-4">
        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)]">
          <motion.div variants={cardAnimation}><WalletSummary wallets={wallets} selectedId={walletId} onSelect={setWalletId} onAdd={() => setModal("add-wallet")} onFund={() => setModal("fund")} onWithdraw={() => setModal("withdraw")} /></motion.div>
          <motion.div variants={cardAnimation}><TransactionChart data={monthlyTransactions} /></motion.div>
        </div>
        <motion.div variants={cardAnimation}><TransactionHistory data={transactions} onFund={() => setModal("fund")} onStatement={() => setModal("statement")} /></motion.div>
      </motion.main>

      {modal === "statement" && <StatementModal open onClose={(open) => !open && setModal(null)} onDownload={() => completeAction("Account statement is ready.")} />}
      {modal && modal !== "statement" && <WalletActionModal key={modal} mode={modal} open wallets={wallets} selectedWalletId={walletId} onClose={(open) => !open && setModal(null)} onSubmit={() => completeAction(modal === "add-wallet" ? "Wallet created." : modal === "fund" ? "Wallet funding initiated." : "Withdrawal initiated.")} />}
    </Container>
  );
};

export default PaymentsWrapper;
