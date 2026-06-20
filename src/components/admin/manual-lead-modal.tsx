"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DIAGNOSTIC_SERVICES } from "@/lib/diagnostic-config";
import type { Lead, LeadHistory } from "@/lib/lead-types";

type ManualLeadModalProps = {
  open: boolean;
  onClose: () => void;
  onCreated: (lead: Lead, history: LeadHistory) => void;
};

const ORIGINS = [
  "Prospecção manual",
  "Diagnóstico",
  "Indicação",
  "Instagram",
  "Workana",
  "Outro",
];

const initialForm = {
  empresa: "",
  nome: "",
  whatsapp: "",
  email: "",
  social: "",
  segmento: "",
  solucao: DIAGNOSTIC_SERVICES[0].name,
  observacao: "",
  origem: "Prospecção manual",
};

export function ManualLeadModal({
  open,
  onClose,
  onCreated,
}: ManualLeadModalProps) {
  const [form, setForm] = useState(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!open) {
    return null;
  }

  function update(field: keyof typeof initialForm, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = (await response.json()) as {
        error?: string;
        lead?: Lead;
        history?: LeadHistory;
      };

      if (!response.ok || !result.lead || !result.history) {
        throw new Error(result.error || "Não foi possível cadastrar o lead.");
      }

      onCreated(result.lead, result.history);
      setForm(initialForm);
      onClose();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Não foi possível cadastrar o lead.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectClass =
    "min-h-12 min-w-0 rounded-xl border border-[rgba(148,163,184,0.16)] bg-[var(--sor-bg-soft)] px-4 text-base text-[var(--sor-text)] outline-none focus:border-[rgba(14,165,164,0.45)]";

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target && !isSubmitting) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-lead-title"
        className="max-h-[94dvh] w-full overflow-y-auto overflow-x-hidden rounded-t-[1.75rem] border border-border bg-card shadow-[0_32px_100px_rgba(0,0,0,0.65)] sm:max-w-3xl sm:rounded-[1.75rem]"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-border bg-[rgba(17,26,32,0.96)] p-5 backdrop-blur sm:p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">Prospecção</p>
            <h2 id="manual-lead-title" className="mt-2 text-2xl font-black">Adicionar lead</h2>
          </div>
          <button type="button" onClick={onClose} disabled={isSubmitting} aria-label="Fechar cadastro" className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-[#080d18] text-lg text-muted hover:text-foreground">
            ×
          </button>
        </header>

        <form className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6" onSubmit={handleSubmit}>
          <Input id="manual_empresa" label="Empresa" required value={form.empresa} onChange={(event) => update("empresa", event.target.value)} />
          <Input id="manual_nome" label="Nome do contato" required value={form.nome} onChange={(event) => update("nome", event.target.value)} />
          <Input id="manual_whatsapp" label="WhatsApp" required inputMode="tel" value={form.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} />
          <Input id="manual_email" label="E-mail opcional" type="email" value={form.email} onChange={(event) => update("email", event.target.value)} />
          <Input id="manual_social" label="Site ou Instagram opcional" value={form.social} onChange={(event) => update("social", event.target.value)} />
          <Input id="manual_segmento" label="Segmento" required value={form.segmento} onChange={(event) => update("segmento", event.target.value)} />

          <label className="grid gap-2 text-sm font-medium text-foreground">
            Solução de interesse
            <select className={selectClass} value={form.solucao} onChange={(event) => update("solucao", event.target.value)}>
              {DIAGNOSTIC_SERVICES.map((service) => (
                <option key={service.slug} value={service.name}>{service.name}</option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-foreground">
            Origem
            <select className={selectClass} value={form.origem} onChange={(event) => update("origem", event.target.value)}>
              {ORIGINS.map((origin) => <option key={origin} value={origin}>{origin}</option>)}
            </select>
          </label>

          <div className="sm:col-span-2">
            <Textarea id="manual_observacao" label="Observação" value={form.observacao} onChange={(event) => update("observacao", event.target.value)} />
          </div>

          {error ? (
            <p role="alert" className="rounded-xl border border-red-400/20 bg-red-500/8 p-3 text-sm text-red-300 sm:col-span-2">{error}</p>
          ) : null}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>Cancelar</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Salvando..." : "Salvar lead"}</Button>
          </div>
        </form>
      </section>
    </div>
  );
}
