import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { DiagnosticForm } from "@/components/public/diagnostic-form";
import { SectionHeading } from "@/components/public/section-heading";

export const metadata: Metadata = {
  title: "Diagnóstico gratuito",
  description: "Conte o desafio do seu negócio e receba uma direção inicial.",
};

export default function DiagnosticPage() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Diagnóstico gratuito"
          title="Conte o que seu negócio precisa resolver"
          description="Preencha as informações abaixo. O objetivo é entender seu momento, sua prioridade e qual solução pode gerar resultado primeiro."
          centered
        />
        <div className="mx-auto mt-10 max-w-3xl">
          <DiagnosticForm />
        </div>
      </Container>
    </section>
  );
}
