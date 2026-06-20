type ParsedDiagnostic = {
  service: string;
  objective: string;
  timeline: string;
  budget: string;
  answers: Array<{ label: string; value: string }>;
  additionalContext: string;
  structured: boolean;
};

export type LeadTemperature = "hot" | "evaluation" | "neutral";

function extractSection(message: string, label: string, nextLabel?: string) {
  const start = message.indexOf(`${label}:\n`);
  if (start === -1) {
    return "";
  }

  const valueStart = start + label.length + 2;
  const end = nextLabel ? message.indexOf(`\n\n${nextLabel}:\n`, valueStart) : -1;
  return message.slice(valueStart, end === -1 ? undefined : end).trim();
}

export function parseLeadDiagnostic(message: string): ParsedDiagnostic {
  const service = extractSection(message, "SOLUÇÃO", "OBJETIVO");
  const objective = extractSection(message, "OBJETIVO", "PRAZO");
  const timeline = extractSection(message, "PRAZO", "INVESTIMENTO");
  const budget = extractSection(message, "INVESTIMENTO", "RESPOSTAS DO DIAGNÓSTICO");
  const answersBlock = extractSection(
    message,
    "RESPOSTAS DO DIAGNÓSTICO",
    "CONTEXTO ADICIONAL",
  );
  const additionalContext = extractSection(message, "CONTEXTO ADICIONAL");

  const answers = answersBlock
    .split("\n")
    .map((line) => {
      const separator = line.indexOf(":");
      if (separator === -1) {
        return null;
      }
      return {
        label: line.slice(0, separator).trim(),
        value: line.slice(separator + 1).trim(),
      };
    })
    .filter((answer): answer is { label: string; value: string } => Boolean(answer));

  return {
    service,
    objective,
    timeline,
    budget,
    answers,
    additionalContext,
    structured: Boolean(service && objective && timeline && budget),
  };
}

export function classifyLeadDiagnostic(
  diagnostic: ParsedDiagnostic,
): LeadTemperature {
  if (!diagnostic.structured) {
    return "neutral";
  }

  if (
    diagnostic.timeline === "Só estou pesquisando" ||
    diagnostic.budget === "Ainda não sei"
  ) {
    return "evaluation";
  }

  const startsSoon =
    diagnostic.timeline === "Esta semana" ||
    diagnostic.timeline === "Ainda este mês";
  const investmentKnown = diagnostic.budget !== "Ainda não sei";

  return startsSoon && investmentKnown ? "hot" : "neutral";
}
