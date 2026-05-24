interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: { direction: "up" | "down" | "neutral"; label: string };
  accent?: boolean;
}

export default function MetricCard({ label, value, subtext, trend, accent }: MetricCardProps) {
  const trendColor =
    trend?.direction === "up" ? "#7BA84A"
    : trend?.direction === "down" ? "#E26B5E"
    : "#5C5C7A";

  const trendArrow = trend?.direction === "up" ? "↑" : trend?.direction === "down" ? "↓" : "→";

  return (
    <div
      className="rounded-xl p-6"
      style={{
        background: "white",
        border: accent ? "1.5px solid rgba(226,107,94,0.4)" : "1px solid #E8E8F4",
      }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#5C5C7A" }}>{label}</p>
      <p className="text-3xl font-light leading-none mb-1" style={{ color: "#1A1A2E" }}>{value}</p>
      {subtext && <p className="text-sm mt-1" style={{ color: "#5C5C7A" }}>{subtext}</p>}
      {trend && (
        <p className="text-xs font-semibold mt-2" style={{ color: trendColor }}>
          {trendArrow} {trend.label}
        </p>
      )}
    </div>
  );
}
