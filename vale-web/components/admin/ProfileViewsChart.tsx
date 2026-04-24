interface DayData {
  day: string;
  views: number;
}

interface ProfileViewsChartProps {
  data: DayData[];
  thisWeek: number;
  lastWeek: number;
}

export default function ProfileViewsChart({ data, thisWeek, lastWeek }: ProfileViewsChartProps) {
  const max = Math.max(...data.map((d) => d.views), 1);
  const trend = thisWeek - lastWeek;
  const trendLabel =
    trend > 0 ? `↑ ${trend} vs last week`
    : trend < 0 ? `↓ ${Math.abs(trend)} vs last week`
    : "Same as last week";
  const trendColor = trend > 0 ? "#7BA84A" : trend < 0 ? "#E26B5E" : "#8FA0B0";

  return (
    <section className="rounded-2xl p-5" style={{ background: "white", border: "0.5px solid rgba(143,160,176,0.3)" }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold" style={{ color: "#5D3A7A" }}>Profile views</h2>
          <p className="text-xs" style={{ color: "#8FA0B0" }}>Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold leading-none" style={{ color: "#5D3A7A" }}>{thisWeek}</p>
          <p className="text-xs font-semibold mt-0.5" style={{ color: trendColor }}>{trendLabel}</p>
        </div>
      </div>

      <div
        role="img"
        aria-label={`Profile views last 7 days: ${data.map((d) => `${d.day} ${d.views}`).join(", ")}`}
        className="flex items-end gap-1.5 h-28 mb-2"
      >
        {data.map(({ day, views }) => (
          <div key={day} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{ height: `${Math.max((views / max) * 96, 4)}px`, background: "#8A5FAA" }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5">
        {data.map(({ day, views }) => (
          <div key={day} className="flex-1 text-center">
            <span className="text-xs leading-none block" style={{ color: "#8FA0B0" }}>{day}</span>
            <span className="text-xs font-semibold leading-none block" style={{ color: "#3F5E2C" }}>{views}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
