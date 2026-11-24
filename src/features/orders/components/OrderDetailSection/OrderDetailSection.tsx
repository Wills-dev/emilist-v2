import type { ReactNode } from "react";

export default function OrderDetailSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="min-w-0 space-y-4 border-b border-[#F1F2F9] pb-5">
      <h3 className="font-exo text-sm font-semibold text-[#474C48]">{title}</h3>
      {children}
    </section>
  );
}
