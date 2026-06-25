import { Container } from "@/components/public/container";
import { SectionHeading } from "@/components/public/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SorLogo } from "@/components/ui/SorLogo";
import {
  getActiveServices,
  type PublicService,
} from "@/lib/services";
import { getLocale, getTranslations } from "next-intl/server";

export const dynamic = "force-dynamic";

function formatPrice(value: number | null, locale: string) {
  if (value === null) return locale === "en" ? "Quote on request" : "Sob consulta";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function getServiceIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes("catálogo") || n.includes("catalogo")) return "◇";
  if (n.includes("agenda")) return "◎";
  if (n.includes("manutenção") || n.includes("manutencao")) return "↻";
  if (n.includes("ajuste")) return "✕";
  if (n.includes("site") || n.includes("presença")) return "↗";
  return "▦";
}

export default async function HomePage() {
  const t = await getTranslations("home");
  const locale = await getLocale();

  let dbServices: PublicService[] = [];

  try {
    dbServices = (await getActiveServices()).slice(0, 3);
  } catch (caughtError) {
    console.error(
      "[Home] Falha ao carregar vitrine de serviços",
      caughtError instanceof Error ? caughtError.message : "Erro desconhecido",
    );
  }

  const operationalMetrics = [
    ["32", t("console_metric_leads"), "+18%"],
    ["11", t("console_metric_diag"), t("console_metric_diag_detail")],
    ["06", t("console_metric_services"), "Online"],
    ["R$ 18k", t("console_metric_revenue"), "+24%"],
  ];

  const problems = [
    { icon: "↗", title: t("problem_1_title"), text: t("problem_1_text") },
    { icon: "◎", title: t("problem_2_title"), text: t("problem_2_text") },
    { icon: "◇", title: t("problem_3_title"), text: t("problem_3_text") },
    { icon: "▦", title: t("problem_4_title"), text: t("problem_4_text") },
  ];

  const steps = [
    { number: "01", title: t("step_1_title"), text: t("step_1_text") },
    { number: "02", title: t("step_2_title"), text: t("step_2_text") },
    { number: "03", title: t("step_3_title"), text: t("step_3_text") },
  ];

  const services = [
    { icon: "↗", name: locale === "en" ? "Institutional websites" : "Sites institucionais", text: t("service_institutional") },
    { icon: "⚡", name: "Landing pages", text: t("service_landing") },
    { icon: "◇", name: locale === "en" ? "B2B/B2C digital catalogs" : "Catálogos digitais B2B/B2C", text: t("service_catalog") },
    { icon: "◎", name: locale === "en" ? "Online scheduling" : "Agendamento online", text: t("service_scheduling") },
    { icon: "▦", name: locale === "en" ? "Admin dashboards" : "Dashboards administrativos", text: t("service_dashboard") },
    { icon: "⟳", name: locale === "en" ? "AI automations" : "Automações com IA", text: t("service_ai") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="aurora-surface cinematic-hero relative overflow-hidden border-b border-[var(--sor-border-main)] lg:min-h-[85vh]">
        <div className="premium-grid absolute inset-0 opacity-80" />
        <div className="hero-particles absolute inset-0 hidden lg:block" />
        <div className="perspective-lines pointer-events-none absolute inset-x-[-12%] bottom-[-13rem] hidden h-[34rem] lg:block" />
        <div className="vertical-light-beam pointer-events-none absolute bottom-[-10rem] left-[58%] hidden h-[34rem] w-64 -translate-x-1/2 lg:block" />
        <div className="absolute left-[8%] top-28 h-1 w-1 rounded-full bg-[var(--sor-champagne)]/40 shadow-[0_0_16px_rgba(201,168,106,0.6)]" />
        <div className="absolute right-[12%] top-36 h-1.5 w-1.5 rounded-full bg-[var(--sor-petrol)]/40 shadow-[0_0_18px_rgba(14,165,164,0.5)]" />
        <div className="absolute bottom-24 left-[46%] h-1 w-1 rounded-full bg-[var(--sor-champagne)]/30" />
        <div className="absolute -right-[18rem] top-[-14rem] hidden h-[54rem] w-[54rem] rounded-full border border-[rgba(201,168,106,0.06)] lg:block" />
        <div className="absolute -right-[7rem] top-[-4rem] hidden h-[42rem] w-[42rem] rounded-full border border-[rgba(201,168,106,0.04)] lg:block" />

        <div className="relative mx-auto grid w-full max-w-[92rem] gap-14 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-8 lg:px-10 lg:pb-20 lg:pt-16">
          <div className="relative z-10">
            <Badge>
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--sor-status)] shadow-[0_0_10px_rgba(34,197,94,0.7)]" />
              {t("badge")}
            </Badge>
            <h1 className="mt-7 max-w-2xl tracking-[-0.04em]">
              <span className="block text-3xl font-normal leading-[1.1] text-[var(--sor-text)] sm:text-4xl lg:text-[2.6rem]">
                {t("hero_line1")}
              </span>
              <span
                className="block font-black leading-[1.05] text-[var(--sor-champagne)]"
                style={{ fontSize: "clamp(40px, 5.5vw, 68px)" }}
              >
                {t("hero_line2")}
              </span>
            </h1>
            <p className="mt-6 max-w-[480px] text-[17px] leading-7 text-muted">
              {t("hero_sub")}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/diagnostico">{t("cta_diagnosis")}</Button>
              <Button href="/solucoes" variant="secondary">{t("cta_solutions")}</Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 border-t border-white/6 pt-6 sm:grid-cols-3">
              {[
                [t("pillar_strategy"), t("pillar_strategy_sub")],
                [t("pillar_tech"), t("pillar_tech_sub")],
                [t("pillar_ops"), t("pillar_ops_sub")],
              ].map(([title, text]) => (
                <div key={title}>
                  <p className="text-sm font-extrabold text-[var(--sor-champagne)]">{title}</p>
                  <p className="mt-1 text-xs text-soft">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[54rem] lg:translate-x-4 xl:translate-x-8">
            <div aria-hidden="true" className="hero-orbit -inset-12 hidden lg:block" />
            <div aria-hidden="true" className="hero-orbit -inset-24 hidden border-[rgba(201,168,106,0.04)] lg:block" />
            <div aria-hidden="true" className="absolute -inset-[12%] rounded-full bg-[rgba(201,168,106,0.06)] blur-[110px]" />
            <div aria-hidden="true" className="perspective-floor absolute left-[4%] right-[4%] top-[94%] hidden h-56 lg:block" />
            <div aria-hidden="true" className="holographic-base absolute -bottom-20 left-[4%] right-[4%] hidden h-36 lg:block" />
            <div aria-hidden="true" className="absolute -bottom-8 left-[15%] right-[15%] hidden h-12 rounded-[50%] bg-[rgba(201,168,106,0.08)] blur-2xl lg:block" />
            <div className="console-shell glass-panel relative overflow-hidden rounded-[1.85rem]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-[10%] top-0 h-20 bg-[linear-gradient(to_bottom,rgba(201,168,106,0.04),transparent)]" />
              <div className="flex items-center justify-between border-b border-[var(--sor-border-main)] px-4 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl border border-[rgba(201,168,106,0.18)] bg-[rgba(201,168,106,0.06)]">
                    <SorLogo variant="mark" className="h-7 w-7" />
                  </span>
                  <div>
                    <p className="text-sm font-extrabold" translate="no">SOR ONE Console</p>
                    <p className="mt-0.5 text-[9px] uppercase tracking-[0.2em] text-soft">{t("console_ops")}</p>
                  </div>
                </div>
                <span className="flex items-center gap-2 rounded-full border border-green-400/15 bg-green-500/8 px-3 py-1.5 text-[10px] font-bold text-green-400">
                  <span className="animate-pulse-soft h-1.5 w-1.5 rounded-full bg-green-400" />
                  {t("console_online")}
                </span>
              </div>

              <div className="grid gap-4 p-4 sm:p-6 lg:p-7">
                <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                  {operationalMetrics.map(([value, label, detail], index) => (
                    <div
                      key={label}
                      className={`console-inner-card rounded-2xl border p-4 transition ${
                        index === 0
                          ? "border-[rgba(201,168,106,0.22)] bg-[rgba(201,168,106,0.05)]"
                          : "border-[var(--sor-border-main)] bg-[rgba(10,14,18,0.58)]"
                      }`}
                    >
                      <p className="text-xl font-black sm:text-2xl">{value}</p>
                      <p className="mt-1 text-[10px] font-semibold text-soft">{label}</p>
                      <p className={`mt-3 text-[9px] font-bold ${index === 2 ? "text-green-400" : "text-[var(--sor-champagne)]"}`}>{detail}</p>
                    </div>
                  ))}
                </div>

                <div className="console-inner-card rounded-2xl border border-[var(--sor-border-main)] bg-[rgba(10,14,18,0.68)] p-5 transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-extrabold">{t("console_opportunities")}</p>
                      <p className="mt-0.5 text-[9px] text-soft">{t("console_last30")}</p>
                    </div>
                  </div>
                  <div className="relative mt-5 flex h-24 items-end gap-1.5">
                    <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible opacity-60" viewBox="0 0 320 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartLine" x1="0" x2="1">
                          <stop offset="0%" stopColor="#C9A86A" />
                          <stop offset="100%" stopColor="#D4B87A" />
                        </linearGradient>
                      </defs>
                      <path d="M0 96 C42 82, 58 89, 88 66 S145 76, 174 48 S224 55, 252 28 S294 33, 320 10" fill="none" stroke="url(#chartLine)" strokeWidth="2.5" />
                    </svg>
                    {[34, 48, 42, 61, 55, 76, 70, 88, 82, 96].map((height, index) => (
                      <span
                        key={height}
                        className="animate-bar-rise flex-1 rounded-t bg-[linear-gradient(to_top,#8B6B2A,#C9A86A_70%,#D4B87A)]"
                        style={{ height: `${height}%`, opacity: 0.34 + index * 0.04, animationDelay: `${index * 70}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("problems_eyebrow")}
            title={t("problems_title")}
            description={t("problems_desc")}
            centered
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {problems.map((p) => (
              <div
                key={p.title}
                className="group relative rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-card)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]"
              >
                <div className="service-icon-shell mb-4 grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">
                  {p.icon}
                </div>
                <h3 className="font-extrabold">{p.title}</h3>
                <p className="mt-2 text-sm leading-6 text-soft">{p.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("how_eyebrow")}
            title={t("how_title")}
            description={t("how_desc")}
            centered
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="step-connector absolute left-full top-8 z-10 hidden h-px w-6 -translate-y-1/2 sm:block"
                  />
                )}
                <div className="rounded-2xl border border-[var(--sor-border-main)] bg-[var(--sor-card)] p-7 transition duration-300 hover:border-[var(--sor-border-champagne)]">
                  <span className="inline-block rounded-xl border border-[rgba(201,168,106,0.22)] bg-[rgba(201,168,106,0.06)] px-3 py-1.5 text-xs font-black text-[var(--sor-champagne)]">
                    {step.number}
                  </span>
                  <h3 className="mt-5 text-xl font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-soft">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* SOLUTIONS */}
      {dbServices.length > 0 ? (
        <section className="relative overflow-hidden border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-16 sm:py-20">
          <div className="premium-grid pointer-events-none absolute inset-0 opacity-30" />
          <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[rgba(201,168,106,0.04)] blur-3xl" />
          <Container>
            <SectionHeading
              eyebrow={t("solutions_eyebrow")}
              title={t("solutions_title")}
              description={t("solutions_desc_db")}
            />
            <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {dbServices.map((service) => (
                <Card key={service.id} className="home-service-card group relative flex min-h-[290px] flex-col overflow-hidden rounded-[1.5rem] border-[var(--sor-border-main)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]">
                  <div className="flex items-start justify-between gap-4">
                    <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">{getServiceIcon(service.nome)}</span>
                    {service.destaque ? <span className="rounded-full border border-[var(--sor-border-champagne)] bg-[rgba(201,168,106,0.06)] px-2.5 py-1 text-[9px] font-bold text-[var(--sor-champagne)]">{t("service_highlight")}</span> : null}
                  </div>
                  <h3 className="mt-5 text-xl font-black">{service.nome}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">{service.descricao}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-soft">{t("service_from")}</p>
                      <p className="mt-1 font-extrabold">{formatPrice(service.preco_inicio, locale)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-soft">{t("service_deadline")}</p>
                      <p className="mt-1 text-sm font-extrabold">
                        {service.prazo_dias ? t("service_days", { days: service.prazo_dias }) : t("service_tbd")}
                      </p>
                    </div>
                  </div>
                  <Button href="/diagnostico" variant="secondary" fullWidth className="mt-5 min-h-10 py-2">{t("btn_request_diag")}</Button>
                </Card>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button href="/solucoes" variant="secondary">{t("btn_see_solutions")}</Button>
            </div>
          </Container>
        </section>
      ) : (
        <section className="relative overflow-hidden border-b border-[var(--sor-border-main)] bg-[var(--sor-bg)] py-16 sm:py-20">
          <div className="premium-grid pointer-events-none absolute inset-0 opacity-30" />
          <Container>
            <SectionHeading
              eyebrow={t("solutions_eyebrow")}
              title={t("solutions_title")}
              description={t("solutions_desc_fallback")}
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.name} className="home-service-card group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--sor-border-main)] p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--sor-border-champagne)]">
                  <span className="service-icon-shell grid h-10 w-10 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-base text-[var(--sor-champagne)]">{s.icon}</span>
                  <h3 className="mt-5 font-extrabold">{s.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-soft">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Button href="/solucoes" variant="secondary">{t("btn_see_solutions")}</Button>
            </div>
          </Container>
        </section>
      )}

      {/* PORTFOLIO */}
      <section className="border-b border-[var(--sor-border-main)] bg-[var(--sor-bg-soft)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow={t("portfolio_eyebrow")}
            title={t("portfolio_title")}
            description={t("portfolio_desc")}
          />
          <div className="mt-8">
            <p className="max-w-[520px] text-[17px] leading-7 text-muted">
              {t("portfolio_sub")}
            </p>
            <div className="mt-6">
              <Button href="/projetos" variant="secondary">{t("btn_see_projects")}</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 sm:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(201,168,106,0.18)] bg-[linear-gradient(135deg,var(--sor-card-elevated),var(--sor-panel))] p-8 sm:p-12">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[rgba(201,168,106,0.06)] blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[rgba(37,99,235,0.04)] blur-3xl" />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sor-champagne)]">{t("cta_label")}</p>
                <h2 className="mt-4 text-3xl font-black sm:text-5xl">{t("cta_title")}</h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">
                  {t("cta_sub")}
                </p>
              </div>
              <Button href="/diagnostico" className="shrink-0">{t("cta_btn")}</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
