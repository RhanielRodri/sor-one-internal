import {
  LEAD_STATUSES,
  STATUS_LABELS,
  type LeadStatus,
} from "@/lib/leads";

export function StatusBadge({ status }: { status: string }) {
  const knownStatus = LEAD_STATUSES.includes(status as LeadStatus)
    ? (status as LeadStatus)
    : null;

  return (
    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
      {knownStatus ? STATUS_LABELS[knownStatus] : status}
    </span>
  );
}
