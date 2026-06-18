import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o SOR.",
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Contato"
          title="Vamos conversar sobre o seu negócio"
          description="Para uma análise mais objetiva, comece pelo diagnóstico gratuito. Se preferir, use um dos canais de contato."
          centered
        />
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
          <Card>
            <p className="text-sm font-semibold text-accent">Diagnóstico</p>
            <h2 className="mt-3 text-xl font-bold">Não sabe por onde começar?</h2>
            <p className="mt-3 leading-7 text-muted">
              Conte seu problema em poucos minutos para receber uma direção inicial.
            </p>
            <Button href="/diagnostico" className="mt-6">
              Preencher diagnóstico
            </Button>
          </Card>
          <Card>
            <p className="text-sm font-semibold text-accent">Atendimento</p>
            <h2 className="mt-3 text-xl font-bold">Fale diretamente com o SOR</h2>
            <p className="mt-3 leading-7 text-muted">
              Os canais diretos serão adicionados na próxima etapa do projeto.
            </p>
            <Button type="button" variant="secondary" disabled className="mt-6">
              Canal em configuração
            </Button>
          </Card>
        </div>
      </Container>
    </section>
  );
}
