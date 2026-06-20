"use client";

import { useEffect, useState } from "react";
import { ManualLeadModal } from "@/components/admin/manual-lead-modal";
import { StatusBadge } from "@/components/admin/status-badge";
import {
  LEAD_STATUSES,
  LOSS_REASONS,
  NEXT_ACTION_LABELS,
  STATUS_LABELS,
  type Lead,
  type LeadHistory,
  type LeadStatus,
} from "@/lib/lead-types";
import {
  classifyLeadDiagnostic,
  parseLeadDiagnostic,
  type LeadTemperature,
} from "@/lib/lead-diagnostic";

type LeadsExplorerProps = {
  leads: Lead[];
  histories: LeadHistory[];
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Sao_Paulo",
  }).format(new Date(value));
}

function getKnownStatus(status: string) {
  return LEAD_STATUSES.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : "diagnostico_solicitado";
}

function getWhatsAppUrl(phone: string, message: string) {
  const digits = phone.replace(/\D/g, "");
  const number = digits.startsWith("55") ? digits : `55${digits}`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | null | undefined;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-border bg-[#080d18] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">{label}</p>
      <p className="mt-2 break-words text-sm leading-6 text-foreground">{value || "Não informado"}</p>
    </div>
  );
}

function TemperatureBadge({ temperature }: { temperature: LeadTemperature }) {
  if (temperature === "neutral") {
    return null;
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] ${
        temperature === "hot"
          ? "border border-orange-400/20 bg-orange-500/10 text-orange-300"
          : "border border-blue-400/20 bg-blue-500/10 text-blue-300"
      }`}
    >
      {temperature === "hot" ? "Lead quente" : "Em avaliação"}
    </span>
  );
}

export function LeadsExplorer({
  leads,
  histories: initialHistories,
}: LeadsExplorerProps) {
  const [crmLeads, setCrmLeads] = useState(leads);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [histories, setHistories] = useState(initialHistories);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, LeadStatus>>({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [actionError, setActionError] = useState("");
  const [showLossReasons, setShowLossReasons] = useState(false);
  const [showManualLead, setShowManualLead] = useState(false);

  const selectedStatus = selectedLead
    ? statusOverrides[String(selectedLead.id)] ?? getKnownStatus(selectedLead.status)
    : null;
  const selectedDiagnostic = selectedLead
    ? parseLeadDiagnostic(selectedLead.problema)
    : null;
  const selectedTemperature = selectedDiagnostic
    ? classifyLeadDiagnostic(selectedDiagnostic)
    : "neutral";
  const selectedHistory = selectedLead
    ? histories.filter((item) => String(item.lead_id) === String(selectedLead.id))
    : [];

  useEffect(() => {
    if (!selectedLead) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedLead(null);
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLead]);

  function openLead(lead: Lead) {
    setSelectedLead(lead);
    setActionError("");
    setShowLossReasons(false);
  }

  function getInitialMessage(lead: Lead) {
    const diagnostic = parseLeadDiagnostic(lead.problema);
    const solution = diagnostic.service || lead.segmento || "uma solução digital";
    const business = lead.empresa ? ` para a ${lead.empresa}` : "";

    return `Olá, ${lead.nome}. Sou da SOR. Identificamos que ${solution}${business} pode ser um bom próximo passo. Podemos conversar rapidamente sobre o seu cenário?`;
  }

  async function transitionLead(
    nextStatus: LeadStatus,
    action: string,
    options?: { lossReason?: string; externalUrl?: string },
  ) {
    if (!selectedLead) {
      return;
    }

    setIsUpdating(true);
    setActionError("");

    try {
      const response = await fetch(`/api/admin/leads/${selectedLead.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          action,
          lossReason: options?.lossReason,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        status?: LeadStatus;
        history?: LeadHistory;
      };

      if (!response.ok || !result.status || !result.history) {
        throw new Error(result.error || "Não foi possível atualizar o lead.");
      }

      setStatusOverrides((current) => ({
        ...current,
        [String(selectedLead.id)]: result.status as LeadStatus,
      }));
      setHistories((current) => [result.history as LeadHistory, ...current]);
      setShowLossReasons(false);

      if (options?.externalUrl) {
        window.open(options.externalUrl, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      setActionError(
        error instanceof Error ? error.message : "Não foi possível atualizar o lead.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  function renderActions() {
    if (!selectedLead || !selectedStatus) {
      return null;
    }

    const actionClass =
      "min-h-11 rounded-xl border border-accent/30 bg-accent-light px-4 py-2.5 text-sm font-bold text-accent hover:border-accent/55 disabled:cursor-not-allowed disabled:opacity-50";
    const secondaryClass =
      "min-h-11 rounded-xl border border-border bg-[#080d18] px-4 py-2.5 text-sm font-bold text-muted hover:border-accent/30 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50";

    if (selectedStatus === "diagnostico_solicitado") {
      return (
        <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("em_analise", "Iniciar análise")}>
          Iniciar análise
        </button>
      );
    }

    if (selectedStatus === "prospectado") {
      return (
        <>
          <button
            disabled={isUpdating}
            className={actionClass}
            onClick={() => transitionLead("contato_iniciado", "Abrir WhatsApp", {
              externalUrl: getWhatsAppUrl(
                selectedLead.whatsapp,
                getInitialMessage(selectedLead),
              ),
            })}
          >
            Abrir WhatsApp
          </button>
          <button
            disabled={isUpdating || !selectedLead.email}
            className={secondaryClass}
            onClick={() => transitionLead("contato_iniciado", "Enviar e-mail", {
              externalUrl: `mailto:${selectedLead.email}?subject=${encodeURIComponent("Contato SOR — solução digital")}`,
            })}
          >
            Enviar e-mail
          </button>
        </>
      );
    }

    if (selectedStatus === "em_analise") {
      return (
        <>
          <button
            disabled={isUpdating}
            className={actionClass}
            onClick={() => transitionLead("contato_iniciado", "Abrir WhatsApp", {
              externalUrl: getWhatsAppUrl(
                selectedLead.whatsapp,
                getInitialMessage(selectedLead),
              ),
            })}
          >
            Abrir WhatsApp
          </button>
          <button
            disabled={isUpdating || !selectedLead.email}
            className={secondaryClass}
            onClick={() => transitionLead("contato_iniciado", "Enviar e-mail", { externalUrl: `mailto:${selectedLead.email}` })}
          >
            Enviar e-mail
          </button>
        </>
      );
    }

    if (selectedStatus === "contato_iniciado") {
      return (
        <>
          <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("proposta_enviada", "Marcar proposta enviada")}>
            Marcar proposta enviada
          </button>
          <button disabled={isUpdating} className={secondaryClass} onClick={() => transitionLead("sem_retorno", "Marcar sem retorno")}>
            Marcar sem retorno
          </button>
        </>
      );
    }

    if (selectedStatus === "sem_retorno") {
      return (
        <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("contato_iniciado", "Retomar contato")}>
          Retomar contato
        </button>
      );
    }

    if (selectedStatus === "proposta_enviada") {
      return (
        <>
          <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("negocio_ganho", "Marcar como ganho")}>
            Marcar como ganho
          </button>
          <button disabled={isUpdating} className={secondaryClass} onClick={() => setShowLossReasons(true)}>
            Marcar como perdido
          </button>
        </>
      );
    }

    if (selectedStatus === "negocio_ganho") {
      return (
        <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("em_execucao", "Iniciar execução")}>
          Iniciar execução
        </button>
      );
    }

    if (selectedStatus === "em_execucao") {
      return (
        <button disabled={isUpdating} className={actionClass} onClick={() => transitionLead("entregue", "Marcar como entregue")}>
          Marcar como entregue
        </button>
      );
    }

    return <p className="text-sm font-semibold text-soft">Nenhuma ação pendente para este status.</p>;
  }

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            <p className="font-extrabold">Base de leads</p>
            <p className="mt-1 text-xs text-soft">{crmLeads.length} registro{crmLeads.length === 1 ? "" : "s"}</p>
          </div>
          <button type="button" onClick={() => setShowManualLead(true)} className="shrink-0 rounded-xl border border-accent/30 bg-accent-light px-4 py-2.5 text-xs font-bold text-accent hover:border-accent/55">
            + Adicionar lead
          </button>
        </div>

        <div className="grid gap-3 p-3 lg:hidden">
          {crmLeads.map((lead) => {
            const status = statusOverrides[String(lead.id)] ?? getKnownStatus(lead.status);
            const diagnostic = parseLeadDiagnostic(lead.problema);
            const temperature = classifyLeadDiagnostic(diagnostic);

            return (
              <button key={lead.id} type="button" onClick={() => openLead(lead)} className="min-w-0 rounded-2xl border border-border bg-[#0b111d] p-4 text-left transition hover:border-accent/40">
                <div className="flex min-w-0 items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words font-bold">{lead.nome}</p>
                    <p className="mt-1 break-words text-xs text-muted">{diagnostic.service || lead.segmento || "Não informado"}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <TemperatureBadge temperature={temperature} />
                  <span className="rounded-full border border-border px-3 py-1.5 text-[10px] font-bold text-soft">{formatDate(lead.criado_em)}</span>
                </div>
                <p className="mt-4 border-t border-border pt-4 text-xs text-soft">
                  Próxima ação: <span className="font-bold text-foreground">{NEXT_ACTION_LABELS[status]}</span>
                </p>
              </button>
            );
          })}
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-border bg-[#080d18] text-[10px] uppercase tracking-[0.14em] text-soft">
              <tr>
                <th className="px-5 py-4">Nome</th>
                <th className="px-5 py-4">Serviço de interesse</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Classificação</th>
                <th className="px-5 py-4">Data</th>
                <th className="px-5 py-4">Próxima ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {crmLeads.map((lead) => {
                const status = statusOverrides[String(lead.id)] ?? getKnownStatus(lead.status);
                const diagnostic = parseLeadDiagnostic(lead.problema);
                const temperature = classifyLeadDiagnostic(diagnostic);

                return (
                  <tr key={lead.id} tabIndex={0} role="button" onClick={() => openLead(lead)} onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openLead(lead);
                    }
                  }} className="cursor-pointer outline-none transition hover:bg-[#172033] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent">
                    <td className="px-5 py-4"><p className="font-bold">{lead.nome}</p><p className="mt-1 text-xs text-muted">{lead.empresa || "Sem empresa"}</p></td>
                    <td className="px-5 py-4 text-muted">{diagnostic.service || lead.segmento || "Não informado"}</td>
                    <td className="px-5 py-4"><StatusBadge status={status} /></td>
                    <td className="px-5 py-4"><TemperatureBadge temperature={temperature} /></td>
                    <td className="whitespace-nowrap px-5 py-4 text-muted">{formatDate(lead.criado_em)}</td>
                    <td className="px-5 py-4 font-semibold text-foreground">{NEXT_ACTION_LABELS[status]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedLead && selectedStatus ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6" role="presentation" onMouseDown={(event) => {
          if (event.currentTarget === event.target) setSelectedLead(null);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="lead-detail-title" className="max-h-[94dvh] w-full overflow-y-auto overflow-x-hidden rounded-t-[1.75rem] border border-border bg-card shadow-[0_32px_100px_rgba(0,0,0,0.65)] sm:max-w-4xl sm:rounded-[1.75rem]">
            <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-[rgba(17,26,32,0.96)] p-5 backdrop-blur sm:p-6">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Detalhes do lead</p>
                <h2 id="lead-detail-title" className="mt-2 break-words text-2xl font-black">{selectedLead.nome}</h2>
                <div className="mt-3 flex flex-wrap gap-2"><StatusBadge status={selectedStatus} /><TemperatureBadge temperature={selectedTemperature} /></div>
              </div>
              <button type="button" onClick={() => setSelectedLead(null)} aria-label="Fechar detalhes" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border bg-[#080d18] text-lg text-muted hover:text-foreground">×</button>
            </header>

            <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="grid min-w-0 gap-4 sm:grid-cols-2">
                <DetailItem label="Serviço escolhido" value={selectedDiagnostic?.service || selectedLead.segmento} />
                <DetailItem label="Objetivo" value={selectedDiagnostic?.objective} />
                <DetailItem label="Urgência" value={selectedDiagnostic?.timeline || selectedLead.urgencia} />
                <DetailItem label="Faixa de investimento" value={selectedDiagnostic?.budget || selectedLead.orcamento} />

                <div className="min-w-0 rounded-xl border border-border bg-[#080d18] p-4 sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Contato</p>
                  <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                    {[["Empresa", selectedLead.empresa], ["WhatsApp", selectedLead.whatsapp], ["E-mail", selectedLead.email], ["Origem", selectedLead.origem || "site"]].map(([label, value]) => (
                      <div key={label}><dt className="text-xs font-bold text-muted">{label}</dt><dd className="mt-1 break-words text-sm">{value || "Não informado"}</dd></div>
                    ))}
                  </dl>
                </div>

                <div className="min-w-0 rounded-xl border border-border bg-[#080d18] p-4 sm:col-span-2">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Respostas específicas</p>
                  {selectedDiagnostic?.answers.length ? (
                    <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                      {selectedDiagnostic.answers.map((answer) => <div key={answer.label}><dt className="text-xs font-bold text-muted">{answer.label}</dt><dd className="mt-1 break-words text-sm leading-6">{answer.value}</dd></div>)}
                    </dl>
                  ) : <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{selectedLead.problema}</p>}
                </div>
              </div>

              <aside className="grid min-w-0 content-start gap-4">
                <div className="rounded-2xl border border-accent/20 bg-accent-light p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-accent">Próxima ação sugerida</p>
                  <p className="mt-2 text-lg font-black">{NEXT_ACTION_LABELS[selectedStatus]}</p>
                  <div className="mt-5 flex flex-col gap-3">{renderActions()}</div>
                  {showLossReasons ? (
                    <div className="mt-5 border-t border-border pt-5">
                      <p className="text-sm font-bold">Motivo da perda</p>
                      <div className="mt-3 grid gap-2">
                        {LOSS_REASONS.map((reason) => (
                          <button key={reason} disabled={isUpdating} onClick={() => transitionLead("negocio_perdido", "Marcar como perdido", { lossReason: reason })} className="rounded-xl border border-border bg-[#080d18] px-3 py-2.5 text-left text-xs font-semibold text-muted hover:border-red-400/30 hover:text-red-300">
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {actionError ? <p role="alert" className="mt-4 rounded-xl border border-red-400/20 bg-red-500/8 p-3 text-xs text-red-300">{actionError}</p> : null}
                </div>

                <div className="rounded-2xl border border-border bg-[#080d18] p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-soft">Histórico</p>
                  {selectedHistory.length ? (
                    <ol className="mt-5 grid gap-4">
                      {selectedHistory.map((item) => (
                        <li key={item.id} className="relative border-l border-accent/25 pl-4">
                          <span className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-accent" />
                          <p className="text-xs leading-5 text-muted">
                            {formatDate(item.criado_em)} — {item.acao}. Status alterado de {STATUS_LABELS[item.status_anterior as LeadStatus] || item.status_anterior} para {STATUS_LABELS[item.novo_status as LeadStatus] || item.novo_status}.
                          </p>
                          {item.motivo_perda ? <p className="mt-1 text-xs font-semibold text-red-300">Motivo: {item.motivo_perda}</p> : null}
                        </li>
                      ))}
                    </ol>
                  ) : <p className="mt-3 text-sm text-soft">Nenhuma alteração registrada ainda.</p>}
                </div>
              </aside>
            </div>
          </section>
        </div>
      ) : null}

      <ManualLeadModal
        open={showManualLead}
        onClose={() => setShowManualLead(false)}
        onCreated={(lead, history) => {
          setCrmLeads((current) => [lead, ...current]);
          setHistories((current) => [history, ...current]);
          setSelectedLead(lead);
        }}
      />
    </>
  );
}
