import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sor-one-internal.vercel.app"),
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
    url: "https://sor-one-internal.vercel.app",
    siteName: "SOR ONE",
    locale: "pt_BR",
    type: "website",
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
      className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
