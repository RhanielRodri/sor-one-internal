import Link from "next/link";
import { Container } from "@/components/public/container";
import { OperationalFlow } from "./operational-flow";

const trustSignals = [
  "Diagnóstico antes da implementação",
  "Escopo formalizado em proposta",
  "Integrações conforme a operação",
  "Treinamento e evolução",
  "Dados e acessos tratados com clareza",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--border-soft)] bg-[var(--bg)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 72% 30%, rgba(201,168,106,0.07), transparent 70%), radial-gradient(ellipse 40% 35% at 18% 80%, rgba(14,165,164,0.05), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,168,106,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,106,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 20%, black, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 20%, black, transparent 78%)",
        }}
      />

      <Container className="relative max-w-[80rem] pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div data-reveal-group>
            <p className="reveal m-0 inline-flex items-center gap-2 rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-3.5 py-1.5 text-xs font-semibold text-[var(--sor-text-muted)]">
              SOR ONE · Implantação de sistemas e operações digitais
            </p>
            <h1 className="reveal mt-6 text-[clamp(2.4rem,5.2vw,4rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-[var(--text)]">
              Sistemas que organizam
              <br />
              <span className="text-[var(--sor-champagne)]">
                atendimento, vendas e operação.
              </span>
            </h1>
            <p className="reveal mt-6 max-w-lg text-[17px] leading-relaxed text-[var(--text-muted-2)]">
              A SOR ONE diagnostica a operação do seu negócio e implanta sites,
              sistemas, automações e integrações adaptados à forma como você
              atende, vende e opera.
            </p>
            <div className="reveal mt-9 flex flex-wrap gap-3">
              <Link
                href="/diagnostico"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--champagne)] px-7 py-3.5 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)] hover:shadow-[0_12px_34px_rgba(201,168,106,0.3)]"
              >
                Solicitar diagnóstico
              </Link>
              <a
                href="#implantacoes"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[var(--border-soft)] px-7 py-3.5 text-sm font-semibold text-[var(--text)] transition hover:border-[rgba(201,168,106,0.4)]"
              >
                Ver implantações →
              </a>
            </div>
          </div>

          <div className="reveal reveal-scale mx-auto w-full max-w-md lg:max-w-none">
            <OperationalFlow />
          </div>
        </div>

        <ul
          data-reveal-group
          className="m-0 mt-14 grid list-none grid-cols-1 gap-x-8 gap-y-3 border-t border-[var(--border-soft)] p-0 pt-7 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center lg:justify-between"
        >
          {trustSignals.map((signal) => (
            <li
              key={signal}
              className="reveal flex items-center gap-2.5 text-[13px] font-medium text-[var(--text-muted-2)]"
            >
              <span
                aria-hidden="true"
                className="grid h-5 w-5 shrink-0 place-items-center rounded-full border border-[var(--champagne-border)] text-[10px] text-[var(--sor-champagne)]"
              >
                ✓
              </span>
              {signal}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
