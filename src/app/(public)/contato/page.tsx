import type { Metadata } from "next";
import { ContactPage } from "@/components/public/contact-page";

export const metadata: Metadata = {
  title: "Contato — Fale com desenvolvedor freelance em Vila Velha, ES",
  description: "Entre em contato para solicitar um diagnóstico gratuito ou tirar dúvidas sobre projetos digitais. Atendimento em até 24h úteis. Vila Velha, ES — remoto em todo o Brasil.",
  keywords: ["contratar desenvolvedor freelance", "orçamento site", "diagnóstico digital gratuito", "desenvolvedor Vila Velha"],
  openGraph: {
    title: "Contato | SOR OS",
    description: "Diagnóstico gratuito em 3 minutos. Resposta em até 24h úteis.",
    url: "https://sor-one-internal.vercel.app/contato",
    siteName: "SOR OS",
    locale: "pt_BR",
    type: "website",
  },
};

export default function Page() {
  return <ContactPage />;
}
