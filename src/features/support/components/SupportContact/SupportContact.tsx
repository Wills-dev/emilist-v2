import { Mail, Phone } from "lucide-react";

import InstagramIcon from "@/components/atoms/icons/Instagram";
import ArrowRight from "@/components/atoms/icons/ArrowRight";

const supportContacts = [
  {
    label: "Email",
    value: "help@emilist.com.ng",
    href: "mailto:help@emilist.com.ng",
    icon: <Mail className="size-5" strokeWidth={1.8} />,
  },
  {
    label: "Helpline",
    value: "+234 123456784",
    href: "tel:+234123456784",
    icon: <Phone className="size-5" strokeWidth={1.8} />,
  },
  {
    label: "Instagram",
    value: "@emilistnigeria",
    href: "https://www.instagram.com/emilistnigeria",
    icon: <InstagramIcon />,
  },
] as const;

const SupportContact = () => (
  <div className="space-y-3">
    <section className="flex flex-col gap-5 bg-white px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="rounded-md bg-[#F0FDF5] px-2 py-1 text-xs font-medium text-[#159447]">
          Contact us
        </span>
        <h1 className="mt-3 font-exo text-xl font-semibold text-[#303632]">
          <span className="text-[#8A8D8B]">Need </span>Help?
        </h1>
        <p className="mt-1 text-sm text-[#68748A] sm:text-base">
          Reach out. We’re always available to help
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-sm font-medium">
        <a
          href="mailto:help@emilist.com.ng"
          className="flex items-center gap-2 border-b border-[#303632] text-[#303632] transition-colors hover:text-[#159447]"
        >
          Send us an email
          <span className="text-xs" aria-hidden="true">
            <ArrowRight />
          </span>
        </a>
        <a
          href="tel:+234123456784"
          className="flex items-center gap-2 border-b border-[#18A154] text-[#159447] transition-colors hover:text-[#11763A]"
        >
          Call our dedicated helpline
          <span className="text-xs" aria-hidden="true">
            <ArrowRight />
          </span>
        </a>
      </div>
    </section>

    <section className="grid gap-4 bg-white px-5 py-5 sm:grid-cols-3 sm:px-6">
      {supportContacts.map(({ label, value, href, icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noreferrer" : undefined}
          className="group flex min-w-0 items-center gap-4 rounded-lg p-1 transition-colors hover:bg-[#F7FAF8]"
        >
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#F7F9F8] text-[#25C269]">
            {icon}
          </span>
          <span className="min-w-0">
            <span className="block text-sm text-[#626864]">{label}</span>
            <span className="block truncate font-exo text-sm font-semibold text-[#3C423E] sm:text-base">
              {value}
            </span>
          </span>
        </a>
      ))}
    </section>
  </div>
);

export default SupportContact;
