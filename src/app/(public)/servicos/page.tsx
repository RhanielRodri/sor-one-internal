import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Soluções digitais simples para pequenos negócios.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-white py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Serviços"
            title="Tecnologia no tamanho certo para o seu negócio"
            description="Soluções focadas em presença digital, vendas e organização. O projeto começa simples e evolui conforme a necessidade."
            centered
          />
        </Container>
      </section>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={service.title} className="flex flex-col p-7">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-accent">0{index + 1}</span>
                {service.badge ? <Badge>{service.badge}</Badge> : null}
              </div>
              <h2 className="mt-6 text-2xl font-bold">{service.title}</h2>
              <p className="mt-3 leading-7 text-muted">{service.description}</p>
              <ul className="mt-6 grid flex-1 gap-3 border-t border-border pt-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm">
                    <span aria-hidden="true" className="font-bold text-accent">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button href="/diagnostico" variant="secondary" fullWidth className="mt-7">
                Conversar sobre esta solução
              </Button>
            </Card>
          ))}
        </Container>
      </section>
    </>
  );
}
