import { createPageMetadata } from "@/lib/seo/metadata";
import { SITE_URL, SITE_TITLE } from "@/lib/seo/site";
import type { Metadata } from "next";
import { Inter, Exo } from "next/font/google";

import "./globals.css";

import QueryProvider from "@/components/QueryProvider/QueryProvider";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

import { ModalManager } from "@/components/molecules/modals/ModalManager/ModalManager";
import { Toaster } from "@/components/ui/sonner/sonner";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  ...createPageMetadata({}),
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | Emilist" },
  applicationName: "Emilist",
  authors: [{ name: "Emilist Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${exo.variable} h-full antialiased`}
    >
      <QueryProvider>
        <body className="min-h-full flex flex-col">
          <Toaster />
          <TooltipProvider delayDuration={0} skipDelayDuration={0}>
            <AuthProvider>{children}</AuthProvider>
          </TooltipProvider>
          <ModalManager />
        </body>
      </QueryProvider>
    </html>
  );
}
