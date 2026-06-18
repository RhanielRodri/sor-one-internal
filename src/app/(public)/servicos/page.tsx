import type { Metadata } from "next";
import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getActiveServices,
  type PublicService,
} from "@/lib/services";

export const metadata: Metadata = {
  title: "Serviços",
  description: "Soluções digitais simples para pequenos negócios.",
};

export const dynamic = "force-dynamic";

function formatPrice(value: number | null) {
  if (value === null) {
    return "Sob consulta";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export default async function ServicesPage() {
  let services: PublicService[] = [];
  let error = "";

  try {
    services = await getActiveServices();
  } catch (caughtError) {
    console.error(
      "[Página de serviços] Falha ao carregar serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
    error = "Não foi possível carregar os serviços agora.";
  }

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
        <Container>
          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
              {error}
            </p>
          ) : services.length === 0 ? (
            <Card className="py-14 text-center">
              <h2 className="text-xl font-bold">
                Nenhum serviço disponível no momento
              </h2>
              <p className="mt-2 text-sm text-muted">
                Novas soluções serão publicadas em breve.
              </p>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service, index) => (
                <Card key={service.id} className="flex flex-col p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {service.destaque ? <Badge>Destaque</Badge> : null}
                  </div>
                  <h2 className="mt-6 text-2xl font-bold">{service.nome}</h2>
                  <p className="mt-3 flex-1 leading-7 text-muted">
                    {service.descricao}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        A partir de
                      </p>
                      <p className="mt-1 font-bold text-foreground">
                        {formatPrice(service.preco_inicio)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                        Prazo
                      </p>
                      <p className="mt-1 font-bold text-foreground">
                        {service.prazo_dias
                          ? `${service.prazo_dias} dias`
                          : "A definir"}
                      </p>
                    </div>
                  </div>
                  <Button
                    href="/diagnostico"
                    variant="secondary"
                    fullWidth
                    className="mt-7"
                  >
                    Conversar sobre esta solução
                  </Button>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
