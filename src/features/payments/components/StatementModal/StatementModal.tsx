"use client";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";
import { useStatementForm } from "../../hooks/useStatementForm";
import type { PaymentWallet } from "../../types/wallets";

export default function StatementModal({ wallets, selectedWalletId, onClose }: { wallets: PaymentWallet[]; selectedWalletId: string; onClose: (open: boolean) => void }) {
  const form = useStatementForm(wallets, selectedWalletId, onClose);
  return <ModalWrapper open onClose={form.changeOpen} title="Download Account Statement" className="sm:max-w-lg" showCloseButton={!form.busy}>
    <form onSubmit={form.submit} className="space-y-5 pt-5">
      <fieldset disabled={form.busy} className="space-y-5">
        <label className="block space-y-2 text-sm text-[#555B57]">Select currency<select value={form.currency} onChange={form.changeCurrency} className="h-11 w-full rounded-lg border border-[#ECECEC] bg-white px-3 pr-9"><option value="">All currencies</option>{["NGN", "USD", "GBP", "EUR"].map((currency) => <option key={currency} value={currency}>{currency}</option>)}</select></label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-[#737774]">Start date<Input type="date" name="startDate" /></label>
          <label className="space-y-2 text-sm text-[#737774]">End date<Input type="date" name="endDate" /></label>
        </div>
        <label className="block space-y-2 text-sm text-[#555B57]">Status<select name="status" className="h-11 w-full rounded-lg border border-[#ECECEC] bg-white px-3 pr-9">{["all", "pending", "failed", "successful"].map((status) => <option key={status} value={status}>{status[0].toUpperCase() + status.slice(1)}</option>)}</select></label>
        <fieldset><legend className="mb-3 text-sm text-[#555B57]">Download format</legend><OptionToggle name="statement-format" ariaLabel="Statement format" value={form.format} onChange={form.setFormat} options={[{ value: "pdf", label: "PDF" }, { value: "csv", label: "CSV" }]} /></fieldset>
      </fieldset>
      <Button type="submit" variant="primary" className="h-11 w-full" loading={form.busy} disabled={form.busy}>Download Statement</Button>
    </form>
  </ModalWrapper>;
}
