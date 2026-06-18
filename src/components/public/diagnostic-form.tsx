"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetOptions,
  segmentOptions,
  sourceOptions,
  urgencyOptions,
} from "@/data/segments";

export function DiagnosticForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Não foi possível enviar o diagnóstico.");
      }

      formRef.current?.reset();
      setFeedback({
        type: "success",
        message:
          result.message ||
          "Diagnóstico enviado com sucesso. Entraremos em contato em breve.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar o diagnóstico.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="p-5 sm:p-8">
      <form ref={formRef} className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <Input id="nome" name="nome" label="Nome" placeholder="Seu nome" required />
          <Input
            id="whatsapp"
            name="whatsapp"
            label="WhatsApp"
            placeholder="(27) 99999-9999"
            inputMode="tel"
            required
          />
          <Input id="empresa" name="empresa" label="Empresa" placeholder="Nome do negócio" />
          <Input
            id="email"
            name="email"
            type="email"
            label="E-mail"
            placeholder="voce@empresa.com"
          />
          <Select
            id="segmento"
            name="segmento"
            label="Segmento"
            options={segmentOptions}
          />
          <Select
            id="urgencia"
            name="urgencia"
            label="Urgência"
            options={urgencyOptions}
          />
          <Select
            id="orcamento"
            name="orcamento"
            label="Orçamento estimado"
            options={budgetOptions}
          />
          <Select
            id="origem"
            name="origem"
            label="Como conheceu o SOR?"
            options={sourceOptions}
          />
        </div>
        <Textarea
          id="problema"
          name="problema"
          label="Qual problema você precisa resolver?"
          placeholder="Conte brevemente o que hoje atrapalha seu negócio e o resultado que você busca."
          required
        />
        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar diagnóstico"}
        </Button>
        {feedback ? (
          <p
            role="status"
            aria-live="polite"
            className={`rounded-lg border px-4 py-3 text-center text-sm ${
              feedback.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {feedback.message}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
