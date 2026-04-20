import { BarChart2 } from "lucide-react";

interface ServiceEntry {
  type: string;
  label: string;
  count: number;
  pct: number;
}

const SERVICE_COLORS: Record<string, string> = {
  cremation: "bg-[#1a3a52]",
  burial: "bg-[#2a7a5c]",
  direct_cremation: "bg-[#d4a574]",
  repatriation: "bg-[#6b7280]",
  other: "bg-[#94a3b8]",
};

const SERVICE_TEXT: Record<string, string> = {
  cremation: "text-white",
  burial: "text-white",
  direct_cremation: "text-[#1a3a52]",
  repatriation: "text-white",
  other: "text-[#374151]",
};

export default function ServiceBreakdown({
  breakdown,
  total,
}: {
  breakdown: ServiceEntry[];
  total: number;
}) {
  if (breakdown.length === 0 || total === 0) {
    return (
      <section className="bg-white border border-[#e5e7eb] rounded-lg p-5 shadow-sm flex flex-col items-center justify-center gap-2 min-h-[120px]">
        <BarChart2 className="w-7 h-7 text-[#d1d5db]" aria-hidden="true" />
        <p className="text-sm font-semibold text-[#6b7280]">No requests yet</p>
        <p className="text-xs text-[#9ca3af]">Data will appear once quotes come in</p>
      </section>
    );
  }

  return (
    <section className="bg-white border border-[#e5e7eb] rounded-lg p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-[#1a3a52]">Requests by service</h2>
          <p className="text-xs text-[#6b7280]">{total} total</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-[#1a3a52]">{breakdown[0]?.label}</p>
          <p className="text-xs text-[#6b7280]">most popular</p>
        </div>
      </div>

      {/* Stacked bar */}
      <div
        className="flex h-5 rounded-full overflow-hidden mb-4 gap-px"
        role="img"
        aria-label={breakdown
          .map((s) => `${s.label}: ${s.pct}%`)
          .join(", ")}
      >
        {breakdown.map((s) => (
          <div
            key={s.type}
            className={`${SERVICE_COLORS[s.type] ?? "bg-[#e5e7eb]"} transition-all`}
            style={{ width: `${s.pct}%` }}
          />
        ))}
      </div>

      {/* Legend */}
      <dl className="space-y-2">
        {breakdown.map((s) => (
          <div key={s.type} className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-sm shrink-0 ${SERVICE_COLORS[s.type] ?? "bg-[#e5e7eb]"}`}
              aria-hidden="true"
            />
            <dt className="text-xs text-[#374151] flex-1 font-medium">{s.label}</dt>
            <dd className="text-xs font-bold text-[#1a3a52]">
              {s.count}{" "}
              <span className="text-[#6b7280] font-normal">({s.pct}%)</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
