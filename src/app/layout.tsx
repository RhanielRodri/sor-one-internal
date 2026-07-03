import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/constants";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SOR ONE | Desenvolvedor freelance — Sites e sistemas para pequenos negócios",
    template: "%s | SOR ONE",
  },
  description:
    "Desenvolvedor freelance em Vila Velha, ES. Crio sites, sistemas e automações para pequenos negócios venderem mais, organizarem processos e reduzirem trabalho manual.",
  keywords: ["desenvolvedor freelance Vila Velha", "sites para pequenos negócios", "sistemas digitais ES", "automação pequenos negócios", "freelancer Espírito Santo"],
  openGraph: {
    title: "SOR ONE | Desenvolvedor freelance em Vila Velha, ES",
    description: "Sites, sistemas e automações para pequenos negócios. Atendimento remoto em todo o Brasil.",
    url: siteUrl,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOR ONE | Desenvolvedor freelance em Vila Velha, ES",
    description:
      "Sites, sistemas e automações para pequenos negócios. Atendimento remoto em todo o Brasil.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${inter.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
