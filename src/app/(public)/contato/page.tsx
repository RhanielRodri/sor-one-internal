import type { Metadata } from "next";
import { ContactPage } from "@/components/public/contact-page";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o SOR. Resposta em até 24h úteis.",
};

export default function Page() {
  return <ContactPage />;
}
