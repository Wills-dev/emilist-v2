import type { Metadata } from "next";
import { Inter, Exo } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/QueryProvider";

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
  title: {
    default: "Emilist – Jobs, Experts, Materials & Project Management Platform",
    template: "%s | Emilist",
  },

  description:
    "Emilist is a unified platform to post jobs, hire skilled professionals, manage projects, offer services, and source materials. From freelancers and service providers to suppliers and teams, Emilist helps users plan, execute, and manage projects efficiently from start to finish.",

  keywords: [
    "Emilist",
    "job marketplace",
    "project management platform",
    "hire professionals online",
    "hire experts online",
    "post jobs and tasks",
    "freelance services marketplace",
    "skills and services platform",
    "manage projects online",
    "team collaboration platform",
    "hire freelancers",
    "service providers marketplace",
    "materials sourcing platform",
    "project execution tool",
    "task management marketplace",
    "digital workforce platform",
    "connect clients and professionals",
  ],

  authors: [{ name: "Emilist Team" }],

  metadataBase: new URL("https://emilist.com"),

  openGraph: {
    title: "Emilist – Jobs, Services, Materials & Project Management",
    description:
      "Post jobs, hire professionals, manage projects, and source materials all in one platform. Emilist connects people, skills, and resources to plan and execute work seamlessly.",
    url: "https://emilist.com",
    siteName: "Emilist",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Emilist Project & Job Marketplace",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Emilist – Jobs & Project Management Platform",
    description:
      "A platform to post jobs, hire professionals, manage projects, and source materials in one place.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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
        <body className="min-h-full flex flex-col">{children}</body>
      </QueryProvider>
    </html>
  );
}
