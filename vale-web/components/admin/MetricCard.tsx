interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: { direction: "up" | "down" | "neutral"; label: string };
  accent?: boolean;
}

export default function MetricCard({ label, value, subtext, trend, accent }: MetricCardProps) {
  const trendColor =
    trend?.direction === "up"
      ? "text-[#059669]"
      : trend?.direction === "down"
      ? "text-[#dc2626]"
      : "text-[#6b7280]";

  const trendArrow = trend?.direction === "up" ? "↑" : trend?.direction === "down" ? "↓" : "→";

  return (
    <div
      className={`bg-white border rounded-lg p-6 shadow-sm ${
        accent ? "border-[#d4a574]" : "border-[#e5e7eb]"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-[#6b7280] mb-2">{label}</p>
      <p className="text-3xl font-bold text-[#1a3a52] leading-none mb-1">{value}</p>
      {subtext && <p className="text-sm text-[#6b7280] mt-1">{subtext}</p>}
      {trend && (
        <p className={`text-xs font-semibold mt-2 ${trendColor}`}>
          {trendArrow} {trend.label}
        </p>
      )}
    </div>
  );
}
