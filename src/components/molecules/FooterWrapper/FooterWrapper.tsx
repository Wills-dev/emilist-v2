import Logo from "@/components/atoms/Logo/Logo";
import MoveTop from "@/components/atoms/MoveTop/MoveTop";
import { footerLinks, socialLinks } from "@/lib/constants";
import Link from "next/link";

const FooterWrapper = ({
  variant = "primary",
}: {
  variant?: "primary" | "secondary";
}) => {
  const logoUrl =
    variant === "primary"
      ? "/assets/images/logo-white.svg"
      : "/assets/images/logo.svg";

  const iconColor = variant === "primary" ? "text-[#FBFFF8]" : "text-[#0F6B4B]";

  return (
    <footer className="sm:space-y-10 space-y-6">
      <div className="flex flex-wrap sm:gap-10 gap-8 justify-between sm:pb-10 pb-6 border-[#D9D9D9] border-b relative">
        <div className="max-w-95 w-full min-w-72.5 sm:space-y-8 space-y-4">
          <Logo src={logoUrl} />
          <p className="max-sm:text-sm font-exo font-medium leading-6">
            EmiList was established from a profound understanding of the need to
            connect with highly skilled artisans who exemplify exceptional work
            ethics and uphold unwavering values in delivering superior quality,
            ultimately aiming to bring satisfaction and joy to their customers.
          </p>
        </div>
        <div className="flex sm:gap-10 gap-8 justify-between flex-wrap flex-1 w-full">
          {footerLinks?.map((item) => (
            <div className="sm:space-y-10 space-y-6" key={item.caption}>
              <h6 className="font-exo font-bold sm:text-[24px] text-lg text-[#25C269]">
                {item?.caption}
              </h6>
              <ul className="sm:space-y-6 space-y-3">
                {item?.links?.map((link) => (
                  <li key={link?.title}>
                    <Link
                      href={link.url}
                      className="hover:text-[#25C269] transition-colors duration-300 font-exo font-semibold max-sm:text-sm"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <MoveTop />
      </div>
      <div className="flex items-center justify-between flex-wrap">
        <p className="max-sm:text-sm font-exo leading-6">
          © 2026 Emilist Inc. All rights reserved
        </p>
        <div className={`flex items-center sm:gap-6 gap-3 ${iconColor}`}>
          {socialLinks?.map((social, i) => (
            <a
              key={i}
              href={social?.href}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:text-[24px] text-lg hover:rotate-360 transition-transform duration-500"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default FooterWrapper;
