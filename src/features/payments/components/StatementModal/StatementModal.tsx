"use client";

import { FormEvent, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import ModalWrapper from "@/components/atoms/ModalWrapper/ModalWrapper";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";

const today = new Date();
const latestStatementDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
const earliestStatementDate = "2024-01-01";

const StatementModal = ({ open, onClose, onDownload }: { open: boolean; onClose: (open: boolean) => void; onDownload: () => void }) => {
  const [format, setFormat] = useState<"pdf" | "jpeg">("pdf");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onDownload();
  };

  return (
    <ModalWrapper open={open} onClose={onClose} title="Download Account Statement" className="max-w-125! rounded-xl p-6" titleClassName="text-base!" headerClassName="border-b border-[#E9EDEB] pb-4">
      <form onSubmit={handleSubmit} className="space-y-5 pt-5">
        <fieldset>
          <legend className="mb-2 text-xs text-[#555B57]">Select currency</legend>
          <div className="grid grid-cols-2 gap-3">
            <label className="space-y-1 text-[10px] text-[#737774]">Start date<Input type="date" name="startDate" min={earliestStatementDate} max={latestStatementDate} required /></label>
            <label className="space-y-1 text-[10px] text-[#737774]">End date<Input type="date" name="endDate" min={earliestStatementDate} max={latestStatementDate} required /></label>
          </div>
        </fieldset>
        <fieldset>
          <legend className="mb-3 text-xs text-[#555B57]">Select download format</legend>
          <OptionToggle name="statement-format" ariaLabel="Statement format" value={format} onChange={setFormat} options={[{ value: "pdf", label: "PDF" }, { value: "jpeg", label: "JPEG" }]} />
        </fieldset>
        <Button type="submit" variant="primary" className="w-full">Download Statement</Button>
      </form>
    </ModalWrapper>
  );
};

export default StatementModal;
