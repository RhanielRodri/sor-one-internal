import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { faq } from "@/data/faq";
import { services } from "@/data/services";

export default function HomePage() {
  return (
    <>
      <section className="overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top_right,_#dff1e9_0,_transparent_36%)]">
        <Container className="grid gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
          <div>
            <Badge>Tecnologia acessível para negócios reais</Badge>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
              Tecnologia simples para pequenos negócios venderem e se organizarem melhor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              O SOR cria páginas profissionais, catálogos digitais e sistemas simples
              para negócios que precisam melhorar presença digital, organizar atendimento
              e captar mais clientes.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/diagnostico">Solicitar diagnóstico gratuito</Button>
              <Button href="/servicos" variant="secondary">
                Ver serviços
              </Button>
            </div>
          </div>
          <Card className="relative p-7 sm:p-9">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100/70 blur-3xl" />
            <p className="text-sm font-semibold text-accent">Como funciona</p>
            <ol className="mt-6 grid gap-6">
              {[
                ["01", "Você conta o problema", "Um formulário rápido para entender seu cenário."],
                ["02", "O SOR avalia", "Identificamos a solução mais simples e viável."],
                ["03", "Você recebe um caminho", "Escopo direto, prioridades e próximos passos."],
              ].map(([number, title, text]) => (
                <li key={number} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-sm font-bold text-accent">
                    {number}
                  </span>
                  <div>
                    <h2 className="font-semibold">{title}</h2>
                    <p className="mt-1 text-sm leading-6 text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Serviços"
            title="Soluções diretas para problemas do dia a dia"
            description="Sem pacotes desnecessários. Cada projeto começa pelo que gera valor primeiro."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="flex flex-col">
                {service.badge ? <Badge>{service.badge}</Badge> : null}
                <h3 className="mt-5 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 leading-7 text-muted">{service.description}</p>
                <ul className="mt-5 grid gap-2 text-sm text-foreground">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span aria-hidden="true" className="font-bold text-accent">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-20">
        <Container>
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title="Antes de começar"
            centered
          />
          <div className="mx-auto mt-10 grid max-w-3xl gap-4">
            {faq.map((item) => (
              <Card key={item.question} className="p-5 sm:p-6">
                <h3 className="font-semibold">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="rounded-3xl bg-foreground px-6 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Vamos entender o que seu negócio precisa?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
              Responda algumas perguntas e receba uma direção clara para o próximo passo.
            </p>
            <Button href="/diagnostico" className="mt-7 bg-white text-foreground hover:bg-slate-100">
              Solicitar diagnóstico gratuito
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
