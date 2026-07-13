import Link from "next/link";
import { Container } from "@/components/public/container";
import { SOR_WHATSAPP_URL } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg)] py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[36rem] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
        style={{
          background:
            "radial-gradient(circle at center, rgba(201,168,106,0.13), transparent 62%)",
          filter: "blur(40px)",
        }}
      />
      <Container className="relative text-center">
        <h2 className="reveal mx-auto max-w-3xl text-3xl font-extrabold leading-[1.12] tracking-[-0.04em] text-[var(--text)] sm:text-4xl lg:text-[2.75rem]">
          Sua empresa não precisa acumular mais ferramentas. Precisa de uma
          operação organizada.
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--text-muted-2)]">
          O diagnóstico identifica o que precisa ser conectado, automatizado
          ou simplificado primeiro.
        </p>
        <div className="reveal mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/diagnostico"
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-[var(--champagne)] px-8 py-4 text-sm font-bold text-[#060709] transition hover:bg-[var(--sor-champagne-hover)] hover:shadow-[0_12px_34px_rgba(201,168,106,0.3)]"
          >
            Solicitar diagnóstico
          </Link>
          <a
            href={SOR_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[var(--border-soft)] px-8 py-4 text-sm font-semibold text-[var(--text)] transition hover:border-[rgba(201,168,106,0.4)]"
          >
            Falar no WhatsApp →
          </a>
        </div>
      </Container>
    </section>
  );
}
