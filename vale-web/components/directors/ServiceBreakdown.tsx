import { BarChart2 } from "lucide-react";

interface ServiceEntry {
  type: string;
  label: string;
  count: number;
  pct: number;
}

const SERVICE_COLORS: Record<string, string> = {
  cremation: "#1A1A2E",
  burial: "#7BA84A",
  direct_cremation: "#E26B5E",
  repatriation: "#6B6DE8",
  other: "#5C5C7A",
};

export default function ServiceBreakdown({ breakdown, total }: { breakdown: ServiceEntry[]; total: number }) {
  if (breakdown.length === 0 || total === 0) {
    return (
      <section className="rounded-xl p-5 flex flex-col items-center justify-center gap-2 min-h-[120px]" style={{ background: "white", border: "1px solid #E8E8F4" }}>
        <BarChart2 className="w-7 h-7" aria-hidden="true" style={{ color: "rgba(234,242,238,0.6)" }} />
        <p className="text-sm font-semibold" style={{ color: "#5C5C7A" }}>No requests yet</p>
        <p className="text-xs" style={{ color: "#5C5C7A" }}>Data will appear once quotes come in</p>
      </section>
    );
  }

  return (
    <section className="rounded-xl p-5" style={{ background: "white", border: "1px solid #E8E8F4" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "#1A1A2E" }}>Requests by service</h2>
          <p className="text-xs" style={{ color: "#5C5C7A" }}>{total} total</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold" style={{ color: "#1A1A2E" }}>{breakdown[0]?.label}</p>
          <p className="text-xs" style={{ color: "#5C5C7A" }}>most popular</p>
        </div>
      </div>

      <div
        className="flex h-5 rounded-full overflow-hidden mb-4 gap-px"
        role="img"
        aria-label={breakdown.map((s) => `${s.label}: ${s.pct}%`).join(", ")}
      >
        {breakdown.map((s) => (
          <div
            key={s.type}
            className="transition-all"
            style={{ width: `${s.pct}%`, background: SERVICE_COLORS[s.type] ?? "#EAF2EE" }}
          />
        ))}
      </div>

      <dl className="space-y-2">
        {breakdown.map((s) => (
          <div key={s.type} className="flex items-center gap-2">
            <div
              className="w-2.5 h-2.5 rounded-sm shrink-0"
              aria-hidden="true"
              style={{ background: SERVICE_COLORS[s.type] ?? "#EAF2EE" }}
            />
            <dt className="text-xs flex-1 font-medium" style={{ color: "#5C5C7A" }}>{s.label}</dt>
            <dd className="text-xs font-bold" style={{ color: "#1A1A2E" }}>
              {s.count}{" "}
              <span className="font-normal" style={{ color: "#5C5C7A" }}>({s.pct}%)</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
