import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { siteUrl } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";

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
    default: "SOR ONE | Sistemas que organizam atendimento, vendas e operação",
    template: "%s | SOR ONE",
  },
  description:
    "A SOR ONE implanta sites, sistemas e automações configurados para o porte, os processos e os objetivos de cada empresa — de operações essenciais para pequenos negócios a soluções completas com inteligência artificial e integrações.",
  keywords: ["implantação de sistemas", "sistemas para negócios", "automação com IA", "agendamento e atendimento", "SOR ONE Vila Velha ES"],
  openGraph: {
    title: "SOR ONE | Sistemas que organizam atendimento, vendas e operação",
    description: "Implantação de sites, sistemas e automações configurados para a operação de cada negócio. Vila Velha, ES — atendimento em todo o Brasil.",
    url: siteUrl,
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOR ONE | Sistemas que organizam atendimento, vendas e operação",
    description:
      "Implantação de sites, sistemas e automações configurados para a operação de cada negócio. Vila Velha, ES — atendimento em todo o Brasil.",
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
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
