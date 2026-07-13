const triageChips = ["Notebook", "Não liga", "Cliente novo"];

const trackSteps = [
  { label: "Recebido", state: "done" },
  { label: "Em avaliação", state: "current" },
  { label: "Concluído", state: "next" },
] as const;

export function OperationalFlow() {
  return (
    <figure className="relative m-0">
      <div className="overflow-hidden rounded-3xl border border-[rgba(201,168,106,0.16)] bg-[linear-gradient(160deg,var(--card-elevated),var(--card-deep))] shadow-[0_40px_100px_rgba(0,0,0,0.55),0_1px_0_rgba(201,168,106,0.12)_inset]">
        <div className="flex items-center justify-between gap-3 border-b border-[var(--border-soft)] bg-[rgba(6,7,9,0.55)] px-4 py-3 sm:px-5">
          <p className="m-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted-2)]">
            Fluxo de atendimento
          </p>
          <p className="m-0 inline-flex items-center gap-1.5 text-[10px] font-bold text-[var(--sor-petrol)]">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
              <path d="M12.05 21.5h-.01a9.42 9.42 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.44-9.45 9.44z" />
            </svg>
            Integrado ao WhatsApp
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-3 p-4 sm:p-5">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-[27px] top-6 w-px bg-[linear-gradient(to_bottom,rgba(201,168,106,0.45),rgba(201,168,106,0.08))] sm:left-[31px]"
          />

          <div className="relative flex gap-3">
            <span className="z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[rgba(201,168,106,0.3)] bg-[var(--bg)] text-[11px] text-[var(--sor-champagne)]">
              1
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.5)] p-3.5">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-soft-2)]">
                Cliente entra em contato
              </p>
              <p className="m-0 mt-2 rounded-xl rounded-tl-sm bg-[rgba(14,165,164,0.1)] px-3 py-2 text-[13px] leading-5 text-[var(--sor-text-muted)]">
                “Meu notebook não liga. Conseguem avaliar hoje?”
              </p>
            </div>
          </div>

          <div className="relative flex gap-3">
            <span className="z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[rgba(201,168,106,0.3)] bg-[var(--bg)] text-[11px] text-[var(--sor-champagne)]">
              2
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.5)] p-3.5">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-soft-2)]">
                Atendimento entende o contexto
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {triageChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-[var(--champagne-border)] bg-[var(--champagne-dim)] px-2.5 py-1 text-[11px] font-semibold text-[var(--sor-champagne)]"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex gap-3">
            <span className="z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[rgba(201,168,106,0.3)] bg-[var(--bg)] text-[11px] text-[var(--sor-champagne)]">
              3
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-[rgba(201,168,106,0.22)] bg-[rgba(6,7,9,0.5)] p-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="m-0 text-[13px] font-bold text-[var(--text)]">
                  Solicitação registrada
                </p>
                <span className="rounded-full border border-[rgba(14,165,164,0.3)] bg-[rgba(14,165,164,0.08)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--sor-petrol)]">
                  Em andamento
                </span>
              </div>
              <dl className="m-0 mt-3 grid gap-1.5 text-[12px] sm:grid-cols-2">
                <div className="flex gap-1.5">
                  <dt className="m-0 text-[var(--text-soft-2)]">Responsável:</dt>
                  <dd className="m-0 font-semibold text-[var(--sor-text-muted)]">Equipe técnica</dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="m-0 text-[var(--text-soft-2)]">Próxima ação:</dt>
                  <dd className="m-0 font-semibold text-[var(--sor-text-muted)]">Avaliação do aparelho</dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="relative flex gap-3">
            <span className="z-10 mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[rgba(201,168,106,0.3)] bg-[var(--bg)] text-[11px] text-[var(--sor-champagne)]">
              4
            </span>
            <div className="min-w-0 flex-1 rounded-2xl border border-[var(--border-soft)] bg-[rgba(6,7,9,0.5)] p-3.5">
              <p className="m-0 text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--text-soft-2)]">
                Operação acompanha o andamento
              </p>
              <ol className="m-0 mt-2.5 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0 text-[11px]">
                {trackSteps.map((step, index) => (
                  <li key={step.label} className="flex items-center gap-2">
                    {index > 0 ? (
                      <span aria-hidden="true" className="h-px w-4 bg-[var(--border-soft)]" />
                    ) : null}
                    <span
                      className={
                        step.state === "done"
                          ? "font-bold text-[var(--sor-petrol)]"
                          : step.state === "current"
                            ? "font-bold text-[var(--sor-champagne)]"
                            : "text-[var(--text-soft-2)]"
                      }
                    >
                      {step.state === "done" ? "✓ " : null}
                      {step.label}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[11px] text-[var(--text-soft-2)]">
        Representação de uma operação integrada
      </figcaption>
    </figure>
  );
}
