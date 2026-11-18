"use client";
import { useRef, useState, type SubmitEvent, type ChangeEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { promiseErrorFunction } from "@/lib/helpers/promiseError";
import { downloadStatement } from "../api/downloadStatement";
import type { StatementQuery } from "../types/statement";
import type { PaymentWallet } from "../types/wallets";

export const useStatementForm = (wallets: PaymentWallet[], selectedWalletId: string, onClose: (open: boolean) => void) => {
  const [currency, setCurrency] = useState(wallets.find((wallet) => wallet.id === selectedWalletId)?.currency ?? "");
  const [format, setFormat] = useState<StatementQuery["format"]>("pdf");
  const pending = useRef(false);
  const mutation = useMutation({ mutationFn: downloadStatement, onSuccess: () => { toast.success("Statement downloaded."); onClose(false); }, onError: promiseErrorFunction, onSettled: () => { pending.current = false; } });
  const changeCurrency = (event: ChangeEvent<HTMLSelectElement>) => setCurrency(event.target.value);
  const changeOpen = (open: boolean) => { if (!pending.current) onClose(open); };
  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const form = new FormData(event.currentTarget);
    const startDate = String(form.get("startDate") || "");
    const endDate = String(form.get("endDate") || "");
    if (startDate && endDate && startDate > endDate) { toast.error("End date must be on or after the start date."); return; }
    const status = String(form.get("status") || "all") as StatementQuery["status"];
    const wallet = wallets.find((wallet) => wallet.currency === currency);
    pending.current = true;
    mutation.mutate({ format, status, ...(currency ? { currency } : {}), ...(wallet ? { walletId: wallet.id } : {}), ...(startDate ? { startDate } : {}), ...(endDate ? { endDate } : {}) });
  };
  return { currency, format, setFormat, changeCurrency, changeOpen, submit, busy: mutation.isPending };
};
