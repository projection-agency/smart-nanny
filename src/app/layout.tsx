import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Nanny - Надійні няні для вашої дитини",
  description:
    "Ми підбираємо надійних нянь, яким можна довірити вашу дитину. Професійний догляд та виховання дітей.",
  keywords: "няня, догляд за дітьми, виховання дітей, няня київ, няня львів",
  authors: [{ name: "Smart Nanny" }],
  openGraph: {
    title: "Smart Nanny - Надійні няні для вашої дитини",
    description:
      "Ми підбираємо надійних нянь, яким можна довірити вашу дитину. Професійний догляд та виховання дітей.",
    url: "https://smart-nanny.com",
    siteName: "Smart Nanny",
    images: [
      {
        url: "https://smart-nanny.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Nanny - Професійний догляд за дітьми",
      },
    ],
    locale: "uk_UA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Nanny - Надійні няні для вашої дитини",
    description:
      "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
    images: ["https://smart-nanny.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
