"use client";
import { Trash2 } from "lucide-react";
import { useServiceCredentials } from "../../hooks/useServiceCredentials";
import type { UserExpertService } from "../../types/expertService";
import SettingsConfirmationModal from "../SettingsConfirmationModal/SettingsConfirmationModal";

export default function ServiceCredentials({ expert, onUpdate }: { expert: UserExpertService; onUpdate: (expert: UserExpertService) => void }) {
  const credentials = useServiceCredentials(expert, onUpdate);
  return <>
    {credentials.sections.filter((section) => section.items.length).map((section) => <section key={section.type} className="rounded-lg bg-white p-4 sm:p-6">
      <h2 className="mb-4 font-exo font-semibold text-[#303632]">{section.title}</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {section.items.map((item, index) => <article key={item.id || `${section.type}-${index}`} className="min-w-0 space-y-4 rounded-lg border border-[#ECECEC] bg-[#F9F9F9] p-4">
          <div className="flex items-start justify-between gap-3"><h3 className="break-words text-sm font-semibold text-[#303632]">{item.title}</h3><button type="button" data-type={section.type} data-id={item.id} onClick={credentials.requestDelete} disabled={credentials.busy || !item.id} aria-label={`Delete ${item.title}`} className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#FFF0F3] text-[#FF5D7A] hover:bg-[#FFE1E8] disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-[#FF5D7A]"><Trash2 className="size-4" /></button></div>
          <dl className="space-y-3">{item.fields.map((field) => <div key={field.label}><dt className="text-xs text-[#737774]">{field.label}</dt><dd className="mt-1 break-words text-sm text-[#474C48]">{field.value}</dd></div>)}</dl>
          {item.document && <a href={item.document} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-[#18A154] underline">View certificate</a>}
        </article>)}
      </div>
    </section>)}
    {credentials.target && <SettingsConfirmationModal open onClose={credentials.changeOpen} title={`Delete ${credentials.target.type}`} message={`Delete “${credentials.target.title}” from this business? This cannot be undone.`} onConfirm={credentials.confirmDelete} loading={credentials.busy} confirmLabel="Delete" confirmVariant="danger" />}
  </>;
}
