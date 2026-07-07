export type DiagnosticEvent =
  | "diagnostic_started"
  | "diagnostic_step_completed"
  | "diagnostic_completed"
  | "diagnostic_submission_success"
  | "diagnostic_submission_failed"
  | "whatsapp_cta_clicked";

type EventProps = Record<string, string | number | boolean>;

type VercelAnalytics = (
  type: "event",
  props: { name: string } & EventProps,
) => void;

export function trackDiagnostic(event: DiagnosticEvent, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  try {
    window.dispatchEvent(
      new CustomEvent("sor-analytics", { detail: { event, ...props } }),
    );

    const va = (window as unknown as { va?: VercelAnalytics }).va;
    if (typeof va === "function") {
      va("event", { name: event, ...props });
    }
  } catch {
    /* analytics nunca deve quebrar o fluxo do usuário */
  }
}
