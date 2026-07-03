import Link from "next/link";
import type { ServiceShowcaseItem } from "@/data/service-catalog";

export function ServicesShowcase({
  items,
  headingLevel = "h3",
}: {
  items: ServiceShowcaseItem[];
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.name}
          className="home-service-card group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-[var(--sor-border-main)] p-6 transition duration-300 hover:border-[var(--sor-border-champagne)]"
        >
            <div className="flex items-center gap-3">
              <span className="service-icon-shell grid h-11 w-11 place-items-center rounded-xl border border-[rgba(201,168,106,0.14)] text-lg text-[var(--sor-champagne)]">
                {item.icon}
              </span>
              <span className="rounded-full border border-[var(--sor-border-main)] bg-[rgba(201,168,106,0.04)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-soft">
                {item.category}
              </span>
            </div>

            <Heading className="mt-5 text-xl font-black tracking-[-0.02em]">
              {item.name}
            </Heading>
            <p className="mt-2 text-sm leading-6 text-soft">{item.description}</p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">
                A partir de
              </span>
              <span className="text-base font-black text-[var(--sor-champagne)]">
                {item.price}
              </span>
            </div>

            <div className="mt-5 flex flex-1 flex-col border-t border-[var(--sor-border-main)] pt-5">
              <ul className="grid gap-2 text-sm text-muted">
                {item.includes.map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-[var(--sor-champagne)]">✓</span>
                    {line}
                  </li>
                ))}
              </ul>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-[var(--sor-border-main)] bg-black/10 p-3 text-center">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-soft">
                      Prazo
                    </p>
                    <p className="mt-1 text-xs font-extrabold">{item.prazo}</p>
                  </div>
                  <div className="border-x border-[var(--sor-border-main)]">
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-soft">
                      Revisões
                    </p>
                    <p className="mt-1 text-xs font-extrabold">{item.revisoes}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-soft">
                      Suporte
                    </p>
                    <p className="mt-1 text-xs font-extrabold">{item.suporte}</p>
                  </div>
                </div>

              <div className="mt-auto pt-5">
                <Link
                  href="/diagnostico"
                  className="inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-bold transition hover:opacity-90"
                  style={{ background: "var(--champagne)", color: "#060709" }}
                >
                  Solicitar diagnóstico gratuito
                </Link>
              </div>
            </div>
        </article>
      ))}
    </div>
  );
}
