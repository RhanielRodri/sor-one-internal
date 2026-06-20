import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SOR OS | Sistema operacional digital",
    template: "%s | SOR OS",
  },
  description:
    "Páginas profissionais, catálogos digitais e sistemas simples para pequenos negócios.",
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
      className={`${geistSans.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
